import { Component, l } from "../arf/arf.js"

export class ExportView extends Component {
	constructor(manager) {
		super()
		this.manager = manager

	}

	renderThis() {
		return l("div",
			l("div", "Exported collection"),
			l("textarea", this.toJSON(this.manager.site.engine.filteredCollection.map(e => this.tableDataFor(e))))
		)
	}

	static styleThis() {
		return {
			textarea: {
				width: "100%",
				height: "10rem"
			}
		}
	}

	tableDataFor(entry) {
		var tableEntry = {}
		for (var e of this.manager.currentSetup.setup.tableSetup.entries) {
			if (e.shown) {
				if (entry[e.key])
					tableEntry[e.key] = entry[e.key]
				else if(typeof this.manager.currentSetup.setup.entry(e.key, entry) === "string")
					tableEntry[e.key] = this.manager.currentSetup.setup.entry(e.key, entry)
			}
		}
		return tableEntry
	}

	toJSON(collection) {
		return JSON.stringify(collection)
	}
}
