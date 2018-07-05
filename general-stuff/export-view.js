import { Component, l, update } from "../arf/arf.js"

export class ExportView extends Component {
	constructor(manager) {
		super()
		this.manager = manager
		this.type = "JSON"
	}

	renderThis() {
		return l("div",
			l("div",
				l("button", {
					onclick: () => {
						this.type = "JSON"
						update()
					}
				}, "JSON"),
				l("button", {
					onclick: () => {
						this.type = "CSV"
						update()
					}
				}, "CSV"),
				l("button", {
					onclick: () => {
						this.type = "TSV"
						update()
					}
				}, "TSV"),
				l("button", {
					onclick: () => {
						this.type = "Markdown"
						update()
					}
				}, "Markdown")
			),
			l("textarea", this.exportedCollection())
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

	exportedCollection() {
		var collection = this.manager.site.engine.filteredCollection
		switch (this.type) {
			case "JSON": return this.toJSON(collection.map(e => this.tableDataFor(e)))
			case "CSV": return this.toXSV(collection.map(e => this.tableDataFor(e, true)), ",")
			case "TSV": return this.toXSV(collection.map(e => this.tableDataFor(e, true)), "\t")
			case "Markdown": return this.toMarkdown(collection.map(e => this.tableDataFor(e, true)))
		}
	}

	tableDataFor(entry, fillMissing = false) {
		var tableEntry = {}
		for (var e of this.manager.currentSetup.setup.tableSetup.entries) {
			if (e.shown) {
				if (entry[e.key] !== undefined)
					tableEntry[e.key] = entry[e.key]
				else if (typeof this.manager.currentSetup.setup.entry(e.key, entry) === "string")
					tableEntry[e.key] = this.manager.currentSetup.setup.entry(e.key, entry)
				else if (fillMissing)
					tableEntry[e.key] = ""
			}
		}
		return tableEntry
	}

	tableFrom(collection) {
		var table = [[]]
		if (!collection.length)
			return table
		for (let key in collection[0])
			table[0].push(this.manager.currentSetup.setup.titles[key] || key)
		for (let entry of collection) {
			let tableEntry = []
			table.push(tableEntry)
			for (let key in entry)
				tableEntry.push(entry[key])
		}
		return table
	}

	toJSON(collection) {
		return JSON.stringify(collection)
	}

	toXSV(collection, separator) {
		var table = this.tableFrom(collection)
		for (var i in table) {
			for (var j in table[i]) {
				var val = table[i][j]
				if (val === undefined || val === null)
					val = ""
				table[i][j] = ("" + val).replace(new RegExp(separator, "g"), "")
			}
			table[i] = table[i].join(separator)
		}
		table = table.join("\n")
		return table
	}

	toMarkdown(collection){
		if (!collection.length)
			return ""
		var sub = {}
		for (let key in collection[0])
			sub[key] = "-".repeat((this.manager.currentSetup.setup.titles[key] || key).length)
		collection.splice(0, 0, sub)
		return this.toXSV(collection, "|")
	}
}
