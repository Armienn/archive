import { Component, l, update } from "../arf/arf.js"
import { CollectionSetup } from "../search/collection-setup.js"

export class ImportView extends Component {
	constructor(manager) {
		super()
		this.manager = manager
		this.importBlob = ""
		this.type = "nothing"
	}

	renderThis() {
		return l("div",
			l("textarea", {
				placeholder: "Data to import",
				oninput: (event) => {
					this.importBlob = event.target.value
					this.detectType()
					update()
				}
			}, this.importBlob),
			l("div", "Detected " + this.type),
			l("button", {
				onclick: () => {
					if (this.type == "nothing")
						return
					var collection = this.importedCollection()
					if (!collection.length)
						return
					var setup = {
						collection: collection,
						setup: CollectionSetup.fromExample(collection[0]),
						title: "Imported"
					}
					var index = this.manager.collections.findIndex(e => e.title == "Imported")
					if (index >= 0)
						this.manager.collections.splice(index, 1)
					this.manager.collections.push(setup)
					this.manager.site.setCollection(setup.collection, setup.setup)
					this.manager.currentSetup = setup
					this.manager.save()
					update()
				}
			}, "Import")
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

	importedCollection() {
		switch (this.type) {
			case "JSON": return this.fromJSON(this.importBlob)
			case "CSV": return this.fromXSV(this.importBlob, ",")
			case "TSV": return this.fromXSV(this.importBlob, "\t")
			case "Markdown": return this.fromMarkdown(this.importBlob)
		}
	}

	detectType() {
		var data = this.importBlob.trim()
		if (data[0] == "[" && data[data.length - 1] == "]")
			return this.type = "JSON"
		var lines = data.split("\n")
		if (lines.length < 2)
			return this.type = "nothing"
		var onEveryLine = { "|": true, "\t": true, ",": true }
		for (var line of lines.splice(0, 10)) {
			onEveryLine["|"] &= line.includes("|")
			onEveryLine["\t"] &= line.includes("\t")
			onEveryLine[","] &= line.includes(",")
		}
		if (onEveryLine["\t"])
			return this.type = "TSV"
		if (onEveryLine["|"])
			return this.type = "Markdown"
		return this.type = "CSV"
	}

	fromJSON(data) {
		return JSON.parse(data)
	}

	fromXSV(data, separator) {
		var rows = data.trim().split("\n")
		var table = []
		for (let i in rows)
			table.push(rows[i].split(separator).map(e => e.trim()))
		var collection = []
		for (var i = 1; i < table.length; i++) {
			var entry = {}
			collection.push(entry)
			for (var j in table[0])
				entry[table[0][j]] = table[i][j]
		}
		return collection
	}

	fromMarkdown(data) {
		// regex to remove the ---|---|--- line if it exists
		return this.fromXSV(data.replace(/\n\s*[-|]+\s*\n/, "\n"), "|")
	}
}
