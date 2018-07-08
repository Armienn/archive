import { capitalise, stringFrom } from "./util.js"
import { l } from "../arf/arf.js"

export class CollectionSetup {
	constructor(source) {
		// { [key]: string | VNode }
		this.titles = {}
		// { [key]: (model) => string | VNode }
		this.entryModel = {}
		// { [key]: { options?: string[], restricted?: boolean, filter?: (model, query) => boolean } }
		this.filterModel = {}
		// { [key]: string | (a,b) => number
		this.sortingModel = {}
		// (model) => string | VNode
		this.view = this.defaultView()
		// { compact: boolean, entries: { key: string, shown: boolean }[] }
		this.tableSetup = { compact: false, entries: [] }
		this.gridSetup = { compact: false, entries: [] }
		for (var i in source) {
			this[i] = source[i]
		}
	}

	title(key) {
		return this.titles[key] || key
	}

	entry(key, model) {
		if (this.entryModel[key])
			return this.entryModel[key](model)
		return stringFrom(model[key])
	}

	entries(mode) {
		if (mode == "table")
			return this.tableSetup.entries
		return this.gridSetup.entries
	}

	compact(mode) {
		if (mode == "table")
			return this.tableSetup.compact
		return this.gridSetup.compact
	}

	defaultView() {
		return (model) => {
			var entries = []
			for (var key in this.entryModel)
				entries.push(l("div", this.titles[key] || key, ": ", this.entry(key, model)))
			return l("div", ...entries)
		}
	}

	showTableEntries(entries) {
		this.tableSetup.entries = entries.map(e => {
			return { key: e, shown: true }
		})
		for (var key in this.entryModel)
			if (!entries.includes(key))
				this.tableSetup.entries.push({ key: key, shown: false })
	}

	showGridEntries(entries) {
		this.gridSetup.entries = entries.map(e => {
			return { key: e, shown: true }
		})
		for (var key in this.entryModel)
			if (!entries.includes(key))
				this.gridSetup.entries.push({ key: key, shown: false })
	}

	static fromExample(source, autoCapitalise = true) {
		const setup = new CollectionSetup()
		for (let key in source) {
			setup.titles[key] = autoCapitalise ? capitalise(key) : key
			setup.entryModel[key] = null
			setup.filterModel[key] = {}
			setup.sortingModel[key] = null
			setup.tableSetup.entries.push({ key: key, shown: true })
			setup.gridSetup.entries.push({ key: key, shown: true })
		}
		return setup
	}
}
