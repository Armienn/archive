import { Component, l, update } from "../arf/arf.js"
import { SearchEngine } from "./search-engine.js"
import { SearchBar } from "./search-bar.js"
import iconButton, { barsIcon, gridIcon, gearIcon, arrowRightIcon, arrowLeftIcon } from "./icons.js"

export class CollectionView extends Component {
	constructor() {
		super()
		this.engine = new SearchEngine()
		this.searchBar = new SearchBar(this.engine)
		this.dataEntries = {}
		this.tableDataSetup = []
		this.mode = "table"
		this.showSettings = false
	}

	set collection(value) {
		this.engine.collection = value
	}
	get collection() {
		return this.engine.collection
	}

	renderThis() {
		return l("div.root",
			l("div.search-section", this.searchBar),
			l("div.table-section", this.viewSettings(), this.mode == "table" ? this.getTable() : this.getGrid())
		)
	}

	static styleThis() {
		return {
			"div.root": {
				fontSize: "1rem",
				width: "100%",
				height: "100%",
			},
			"div.table-section": {
				height: "calc(100% - 3em)",
				overflow: "auto"
			},
			table: {
				width: "100%",
				fontSize: "0.8rem"
			},
			tr: {
				height: "2rem",
				backgroundColor: "rgba(130,130,130,0.2)",
				borderBottom: "1px solid rgba(130,130,130,0.5)"
			},
			"tbody tr": {
				cursor: "pointer",
				transition: "0.3s ease"
			},
			"tbody tr:hover": {
				backgroundColor: "rgba(130,130,130,0.5)",
				transition: "0.3s ease"
			},
			th: {
				verticalAlign: "middle",
				cursor: "pointer",
				transition: "0.3s ease"
			},
			"thead th": {
				backgroundColor: "rgba(130,130,130,0.3)",
				fontWeight: "bold",
				transition: "0.3s ease"
			},
			"thead th:hover": {
				backgroundColor: "rgba(130,130,130,0.5)",
				transition: "0.3s ease"
			},
			button: {
				fontSize: "1rem",
				color: "white"
			},
			"div.table-settings": {
				display: "flex",
				justifyContent: "flex-end",
				width: "100%",
				height: "2em"
			},
			"div.entry-editor": {
				display: "flex",
				height: "2em",
				lineHeight: "2em",
				maxWidth: "calc(100% - 2em)",
				flexGrow: "0",
				overflowX: "auto",
				overflowY: "hidden",
				transition: "0.5s ease"
			},
			"div.entry-editor.hidden": {
				maxWidth: "0",
				transition: "0.5s ease"
			},
			".data-entry": {
				display: "contents"
			},
			"button.table-settings": {
				fontSize: "1em",
				fontWeight: "bold",
				width: "2em",
				height: "2em"
			},
			"button.label": {
				height: "2em"
			},
			".clickable": {
				transition: "0.5s ease",
				backgroundColor: "transparent",
				opacity: "0.4"
			},
			".clickable:hover": {
				transition: "0.5s ease",
				opacity: "0.7"
			},
			"button.clickable.toggled": {
				transition: "0.5s ease",
				backgroundColor: "#888",
				opacity: "1"
			},
			"button.clickable.active": {
				transition: "0.5s ease",
				opacity: "1"
			},
			"div.grid": {
				display: "flex",
				flexWrap: "wrap",
				width: "100%"
			},
			"div.card": {
				fontSize: "0.8rem",
				maxWidth: "11rem",
				height: "fit-content",
				margin: ".25rem",
				overflow: "hidden",
				cursor: "pointer",
				backgroundColor: "rgba(130,130,130,0.2)",
				border: "1px solid rgba(130,130,130,0.5)",
				transition: "0.3s ease"
			},
			"div.card:hover": {
				backgroundColor: "rgba(130,130,130,0.5)",
				transition: "0.3s ease"
			},
			"span.card": {
				whiteSpace: "nowrap",
				maxWidth: "100%",
				height: "2rem",
				float: "left",
				position: "relative"
			},
			"label.card": {
				position: "absolute",
				cursor: "pointer",
				top: "0",
				left: "0.4rem",
				fontSize: "0.6rem",
				lineHeight: "0.6rem",
				color: "rgb(130,130,130)"
			},
			"span.card-entry": {
				zIndex: "2",
				display: "block",
				maxWidth: "100%",
				lineHeight: "2rem",
				overflow: "hidden",
				height: "2rem",
				textOverflow: "ellipsis",
				padding: "0 0.5rem"
			},
		}
	}

	viewSettings() {
		return l("div.table-settings",
			iconButton(barsIcon({ filter: "invert(1)" }), () => {
				this.mode = "table"
				update()
			}, ".table-settings.clickable" + (this.mode == "table" ? ".active" : "")),
			iconButton(gridIcon({ filter: "invert(1)" }), () => {
				this.mode = "grid"
				update()
			}, ".table-settings.clickable" + (this.mode == "grid" ? ".active" : "")),
			this.entryEditor(),
			iconButton(gearIcon({ filter: "invert(1)" }), () => {
				this.showSettings = !this.showSettings
				update()
			}, ".table-settings.clickable" + (this.showSettings ? ".toggled" : ""))
		)
	}

	entryEditor() {
		const currentSetup = this.mode == "table" ? this.tableDataSetup : this.tableDataSetup
		return l("div.entry-editor" + (this.showSettings ? "" : ".hidden"),
			...currentSetup.map(e => {
				return l("div.data-entry",
					iconButton(arrowLeftIcon({ filter: "invert(1)" }),
						() => {
							const index = this.tableDataSetup.indexOf(e)
							if (index == 0)
								return
							this.tableDataSetup.splice(index, 1)
							this.tableDataSetup.splice(index - 1, 0, e)
							update()
						}, ".clickable"),
					l("button.label.clickable" + (e.shown ? ".active" : ""), {
						onclick: () => {
							e.shown = !e.shown
							update()
						}
					}, e.title),
					iconButton(arrowRightIcon({ filter: "invert(1)" }),
						() => {
							const index = this.tableDataSetup.indexOf(e)
							if (index == this.tableDataSetup - 1)
								return
							this.tableDataSetup.splice(index, 1)
							this.tableDataSetup.splice(index + 1, 0, e)
							update()
						}, ".clickable"))
			})
		)
	}

	getTable() {
		return l("table",
			l("thead",
				l("tr",
					...this.getHeader()
				)
			),
			l("tbody",
				...this.getRows()
			)
		)
	}

	getHeader() {
		return this.tableDataSetup
			.filter(e => e.shown)
			.map(e => l("th", {
				onclick: () => {
					if (!this.engine.sortingModel[e.key])
						return
					if (this.engine.sorting == e.key)
						this.engine.reverseSort = !this.engine.reverseSort
					this.engine.sorting = e.key
					this.engine.updateFilteredCollection()
					update()
				},
				style: { cursor: this.engine.sortingModel[e.key] ? "" : "default" }
			}, this.dataEntries[e.key].title))
	}

	getRows() {
		return this.engine.filteredCollection
			.map((e, i) => l("tr" + (i % 2 ? ".odd" : ".even"), ...this.getRow(this.engine.filteredCollection[i])))
	}

	getRow(model) {
		return this.tableDataSetup
			.filter(e => e.shown)
			.map(e => l("th", this.dataEntries[e.key].valueFrom(model)))
	}

	getGrid() {
		return l("div.grid", ...this.engine.filteredCollection.map(e => this.cardFrom(e)))
	}

	cardFrom(model) {
		return l("div.card", ...this.tableDataSetup
			.filter(e => e.shown)
			.map(e => l("span.card",
				l("label.card", this.dataEntries[e.key].title),
				l("span.card-entry", this.dataEntries[e.key].valueFrom(model)))
			))
	}

	setDataEntriesFromExample(source) {
		this.dataEntries = {}
		for (var key in source)
			this.dataEntries[key] = new DataEntry(key, key)
		this.tableDataSetupFrom(Object.keys(this.dataEntries))
	}

	setupFromCollection() {
		if (this.engine.collection.length == 0)
			return
		this.setDataEntriesFromExample(this.engine.collection[0])
		this.engine.setModelFromCollection()
	}

	setup(filters, sorting, dataEntries, defaultShownData = null) {
		this.engine.resetFilter()
		this.engine.resetFilterModel()
		for (let key in filters)
			this.engine.filterModel[key] = filters[key]
		this.engine.resetSorting()
		this.engine.resetSortingModel()
		for (let key in sorting)
			this.engine.sortingModel[key] = sorting[key]
		this.dataEntries = dataEntries
		this.tableDataSetupFrom(defaultShownData || Object.keys(dataEntries))
	}

	tableDataSetupFrom(shownData) {
		this.tableDataSetup = shownData
			.map(e => { return { shown: true, key: e, title: this.dataEntries[e].title } })
		for (var key in this.dataEntries)
			if (!this.tableDataSetup.find(e => e.key == key))
				this.tableDataSetup.push({ shown: false, key: key, title: this.dataEntries[key].title })
	}
}

export class DataEntry {
	constructor(title, key, valueFrom = null) {
		this.title = title
		this.key = key
		this.valueFrom = valueFrom || ((m) => "" + m[key])
	}
}
