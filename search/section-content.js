import { SearchSite } from "./search-site.js"
import { Component, l } from "../arf/arf.js"

export class SectionContent extends Component {
	constructor(main) {
		super()
		this.main = main
		this.headerFunction = this.defaultHeaderFunction
		this.cellFunction = this.defaultCellFunction
		this.columns = ["1", "2", "3"]
	}

	renderThis() {
		return l("section",
			l("table",
				l("thead",
					l("tr",
						...this.getHeader()
					)
				),
				l("tbody",
					...this.getRows()
				)
			)
		)
	}

	static styleThis() {
		return {
			table: {
				width: "calc(100% - 2rem)",
				margin: "1rem"
			},
			tr: {
				height: "2rem",
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
			},
			".odd": {
				backgroundColor: SearchSite.styling.oddBackground,
			},
			".even": {
				backgroundColor: SearchSite.styling.evenBackground,
			},
		}
	}

	getHeader() {
		var entries = []
		var headers = this.headerFunction(this.main)
		for (var i in headers)
			entries.push(l("th", headers[i]))
		return entries
	}

	getRows() {
		var rows = []
		var odd = true
		for (var i in this.main.engine.filteredCollection) {
			rows.push(l("tr" + (odd ? ".odd" : ".even"), ...this.getRow(this.main.engine.filteredCollection[i])))
			odd = !odd
		}
		return rows
	}

	getRow(data) {
		var entries = []
		var dataEntries = this.cellFunction(data, this.main)
		for (var i in dataEntries)
			entries.push(l("th", dataEntries[i]))

		return entries
	}

	defaultHeaderFunction(main) {
		if (!main.engine.collection[0])
			return []
		return Object.keys(main.engine.collection[0])
	}

	defaultCellFunction(model, main) {
		if (!main.engine.collection[0])
			return []
		var headers = Object.keys(main.engine.collection[0])
		var cells = []
		for (var i in headers)
			cells.push(model[headers[i]])
		return cells
	}
}
