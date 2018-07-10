import { Component, l, update } from "../arf/arf.js"
import { Styling } from "./styling.js"

export class CollectionComponent extends Component {
	constructor(collectionView) {
		super()
		this.collectionView = collectionView
		this.hasChanged = true
		this.engine.onChange = () => {
			this.hasChanged = true
		}
		this.cachedSetup = ""
		this.cachedEntries = new Map()
	}

	get mode() {
		return this.collectionView.mode
	}
	get engine() {
		return this.collectionView.engine
	}
	get collectionSetup() {
		return this.collectionView.collectionSetup
	}
	get select() {
		return this.collectionView.select
	}
	get selected() {
		return this.collectionView.selected
	}

	renderHasChanged() {
		const current = this.hasChanged
		this.hasChanged = false
		return current
	}

	renderThis() {
		return this.mode == "table" ? this.getTable() : this.getGrid()
	}

	static styleThis() {
		return {
			table: {
				width: "100%",
				fontSize: "0.8rem",
				marginBottom: "3em"
			},
			"tr": {
				height: "2rem",
				backgroundColor: "rgba(" + Styling.styling.tableColor + ",0.2)",
				borderBottom: "1px solid rgba(" + Styling.styling.tableColor + ",0.5)"
			},
			".compact tr": {
				height: "unset"
			},
			"tbody tr": {
				cursor: "pointer",
				transition: "0.3s ease"
			},
			"tbody tr:hover": {
				backgroundColor: "rgba(" + Styling.styling.tableColor + ",0.5)",
				transition: "0.3s ease"
			},
			th: {
				verticalAlign: "middle",
				cursor: "pointer",
				transition: "0.3s ease"
			},
			"thead th": {
				backgroundColor: "rgba(" + Styling.styling.tableColor + ",0.3)",
				fontWeight: "bold",
				transition: "0.3s ease"
			},
			"thead th:hover": {
				backgroundColor: "rgba(" + Styling.styling.tableColor + ",0.5)",
				transition: "0.3s ease"
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
			"div.grid": {
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
				width: "100%",
				marginBottom: "3em"
			},
			"div.card": {
				fontSize: "0.8rem",
				maxWidth: "11rem",
				height: "fit-content",
				margin: ".25rem",
				overflow: "hidden",
				cursor: "pointer",
				backgroundColor: "rgba(" + Styling.styling.tableColor + ",0.2)",
				border: "1px solid rgba(" + Styling.styling.tableColor + ",0.5)",
				transition: "0.3s ease"
			},
			".compact div.card": {
				margin: "unset",
			},
			"div.card:hover": {
				backgroundColor: "rgba(" + Styling.styling.tableColor + ",0.5)",
				transition: "0.3s ease"
			},
			"span.card": {
				whiteSpace: "nowrap",
				maxWidth: "100%",
				height: "2rem",
				float: "left",
				position: "relative"
			},
			".compact span.card": {
				height: "unset",
			},
			"label.card": {
				position: "absolute",
				cursor: "pointer",
				top: "0",
				left: "0.4rem",
				fontSize: "0.6rem",
				lineHeight: "0.6rem",
				color: "rgb(" + Styling.styling.tableColor + ")"
			},
			".compact label.card": {
				display: "none"
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
			".compact span.card-entry": {
				height: "unset",
				lineHeight: "unset",
				padding: "0"
			},
			".selected, div.card.selected": {
				backgroundColor: "rgba(" + Styling.styling.tableColor + ",0.7)",
				transition: "0.3s ease"
			},
		}
	}

	currentSetup() {
		if (this.mode == "table")
			return "table" + JSON.stringify(this.collectionSetup.tableSetup.entries)
		return "grid" + JSON.stringify(this.collectionSetup.gridSetup.entries)
	}

	getTable() {
		return l("table" + (this.collectionSetup.tableSetup.compact ? ".compact" : ""),
			l("thead",
				l("tr",
					...this.getHeader()
				)
			),
			l("tbody",
				...this.getEntries(e=>this.getRow(e))
			)
		)
	}

	getHeader() {
		return this.collectionSetup.entries(this.mode)
			.filter(e => e.shown)
			.map(e => l("th", {
				onclick: () => {
					if (!(e.key in this.collectionSetup.sortingModel))
						return
					let key = e.key
					if (typeof this.collectionSetup.sortingModel[key] === "string")
						key = this.collectionSetup.sortingModel[key]
					if (this.engine.sorting == key)
						this.engine.reverseSort = !this.engine.reverseSort
					this.engine.sorting = key
					this.engine.updateFilteredCollection()
					update()
				},
				style: { cursor: this.collectionSetup.sortingModel[e.key] ? "" : "default" }
			}, this.collectionSetup.title(e.key)))
	}

	getEntries(getEntry) {
		const currentSetup = this.currentSetup()
		if (this.cachedSetup !== currentSetup)
			this.cachedEntries = new Map()
		this.cachedSetup = currentSetup
		return this.engine.filteredCollection.map(e => {
			let cachedEntry = this.cachedEntries.get(e)
			if (!cachedEntry) {
				cachedEntry = getEntry(e)
				this.cachedEntries.set(e, cachedEntry)
			}
			return cachedEntry
		})
	}

	getRow(model) {
		return l("tr" + (this.selected() == model ? ".selected" : ""),
			{ onclick: () => this.select(model, this.collectionSetup) }, ...this.collectionSetup.entries(this.mode)
				.filter(e => e.shown)
				.map(e => l("th", this.collectionSetup.entry(e.key, model)))
		)
	}

	getGrid() {
		return l("div.grid" + (this.collectionSetup.gridSetup.compact ? ".compact" : ""),
			...this.getEntries(e => this.cardFrom(e)))
	}

	cardFrom(model) {
		return l("div.card" + (this.selected() == model ? ".selected" : ""),
			{ onclick: () => this.select(model, this.collectionSetup) }, ...this.collectionSetup.entries(this.mode)
				.filter(e => e.shown)
				.map(e => l("span.card",
					l("label.card", this.collectionSetup.title(e.key)),
					l("span.card-entry", this.collectionSetup.entry(e.key, model)))
				))
	}
}
