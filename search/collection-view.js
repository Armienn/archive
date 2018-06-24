import { Component, l, update } from "../arf/arf.js"
import { SearchEngine } from "./search-engine.js"
import { SearchBar } from "./search-bar.js"
import iconButton, { barsIcon, gridIcon, gearIcon } from "./icons.js"

export class CollectionView extends Component {
	constructor() {
		super()
		this.engine = new SearchEngine()
		this.searchBar = new SearchBar(this.engine)
		this.dataEntries = {}
		this.shownData = []
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
			l("div.table-section", this.tableSettings(), this.getTable())
		)
	}

	static styleThis() {
		return {
			"div.root": {
				width: "100%",
				height: "100%",
			},
			"div.table-section": {
				height: "calc(100% - 3em)",
				overflow: "auto"
			},
			table: {
				width: "100%"
			},
			tr: {
				height: "2rem",
				backgroundColor: "rgba(130,130,130,0.2)",
				borderBottom: "1px solid rgba(130,130,130,0.5)"
			},
			"tbody tr": {
				cursor: "pointer",
				transition: "0.2s ease background"
			},
			"tbody tr:hover": {
				backgroundColor: "rgba(130,130,130,0.5)",
				transition: "0.2s ease background"
			},
			th: {
				"vertical-align": "middle"
			},
			"div.table-settings": {
				display: "flex",
				width: "100%",
				height: "2em"
			},
			"button.table-settings": {
				fontSize: "1em",
				fontWeight: "bold",
				width: "2em",
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
			}
		}
	}

	tableSettings() {
		return l("div.table-settings",
			iconButton(barsIcon({filter:"invert(1)"}), () => {
				this.showSettings = !this.showSettings
				update()
			}, ".table-settings.clickable" + (this.showSettings ? ".active" : "")),
			iconButton(gridIcon({filter:"invert(1)"}), () => {
				this.showSettings = !this.showSettings
				update()
			}, ".table-settings.clickable" + (this.showSettings ? ".active" : "")),
			iconButton(gearIcon({filter:"invert(1)"}), () => {
				this.showSettings = !this.showSettings
				update()
			}, ".table-settings.clickable" + (this.showSettings ? ".toggled" : ""))
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
		return this.shownData.map(e => l("th", this.dataEntries[e].title))
	}

	getRows() {
		return this.engine.filteredCollection
			.map((e, i) => l("tr" + (i % 2 ? ".odd" : ".even"), ...this.getRow(this.engine.filteredCollection[i])))
	}

	getRow(model) {
		return this.shownData.map(e => l("th", this.dataEntries[e].valueFrom(model)))
	}

	setDataEntriesFromExample(source) {
		this.dataEntries = {}
		this.shownData = []
		for (var key in source) {
			this.dataEntries[key] = new DataEntry(key, key)
			this.shownData.push(key)
		}
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
		this.shownData = defaultShownData || Object.keys(dataEntries)
	}
}

export class DataEntry {
	constructor(title, key, valueFrom = null) {
		this.title = title
		this.key = key
		this.valueFrom = valueFrom || ((m) => "" + m[key])
	}
}
