import { SearchSite } from "./search-site.js"
import { Component, l } from "../arf/arf.js"

export class CollectionView extends Component {
	constructor(engine) {
		super()
		this.engine = engine
		this.dataEntries = {}
		this.shownData = []
	}

	renderThis() {
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

	static styleThis() {
		return {
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
				backgroundColor: SearchSite.styling.hoverBackground,
				transition: "0.2s ease background"
			},
			th: {
				"vertical-align": "middle"
			}
		}
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

	setDataEntriesFromCollection() {
		if (this.engine.collection.length == 0)
			return
		this.setDataEntriesFromExample(this.engine.collection[0])
	}
}

class DataEntry {
	constructor(title, key, valueFrom = null) {
		this.title = title
		this.key = key
		this.valueFrom = valueFrom || ((m) => "" + m[key])
	}
}
