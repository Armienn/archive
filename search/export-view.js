import { Component, l, update } from "../arf/arf.js"
import { stringFrom } from "./util.js"

export class ExportView extends Component {
	constructor(site) {
		super()
		this.site = site
		this.type = "JSON"
		this.dataToExport = "table"
	}

	renderThis() {
		return l("div",
			l("div",
				l("button" + (this.dataToExport == "raw" ? "" : ".inactive"), {
					onclick: () => {
						this.dataToExport = "raw"
						update()
					}
				}, "Raw data"),
				l("button" + (this.dataToExport == "table" ? "" : ".inactive"), {
					onclick: () => {
						this.dataToExport = "table"
						update()
					}
				}, "Table data")
			),
			l("div", ...Object.keys(this.site.exportMethods).map((key) =>
				l("button" + (this.type == key ? "" : ".inactive"), {
					onclick: () => {
						this.type = key
						update()
					}
				}, key))
			),
			l("textarea",
				this.site.exportMethods[this.type](
					this.site.engine.filteredCollection,
					this.fieldsToExport()
				)
			)
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

	fieldsToExport() {
		if (this.dataToExport == "raw")
			return this.allKeys(this.site.engine.filteredCollection)
		return this.allFields(this.site.sections.collection.collectionSetup.tableSetup.entries.filter(e => e.shown))
	}

	allKeys(collection) {
		var keys = {}
		for (var entry of collection)
			for (var key in entry)
				keys[key] = key
		for (let key in keys)
			keys[key] = {
				title: key,
				dataFor: (entry) => this.dataFor(entry, key),
				stringifiedDataFor: (entry) => this.stringifiedDataFor(entry, key)
			}
		return keys
	}

	allFields(entries) {
		var keys = {}
		for (let entry of entries)
			keys[entry.key] = {
				title: this.site.sections.collection.collectionSetup.titles[entry.key] || entry.key,
				dataFor: (e) => this.dataFor(e, entry.key),
				stringifiedDataFor: (e) => this.stringifiedDataFor(e, entry.key)
			}
		return keys
	}

	dataFor(entry, key) {
		if (entry[key] !== undefined)
			return entry[key]
		else if (typeof this.site.sections.collection.collectionSetup.entry(key, entry) === "string")
			return this.site.sections.collection.collectionSetup.entry(key, entry)
		return undefined
	}

	stringifiedDataFor(entry, key) {
		if (entry[key] !== undefined)
			return stringFrom(entry[key])
		else if (typeof this.site.sections.collection.collectionSetup.entry(key, entry) === "string")
			return this.site.sections.collection.collectionSetup.entry(key, entry)
		return ""
	}
}
