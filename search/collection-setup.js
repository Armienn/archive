import { capitalise, stringFrom } from "./util.js"
import { SelectionView } from "./selection-view.js"

export class CollectionSetup {
	constructor(source) {
		// { [key]: string | VNode }
		this.titles = {}
		// { [key]: {value: (model) => string | VNode, data?: (model) => string}}
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
		if (this.entryModel[key] && this.entryModel[key].value)
			return this.entryModel[key].value(model)
		return stringFrom(model[key])
	}

	entryData(key, model, allowFalsy) {
		if (this.entryModel[key] && this.entryModel[key].data)
			return this.entryModel[key].data(model)
		if (allowFalsy ? key in model : model[key])
			return model[key]
		if (this.entryModel[key] && this.entryModel[key].value)
			var data = this.entryModel[key].value(model)
		if (typeof data === "string")
			return data
		return undefined
	}

	sortingMethod(key) {
		if (typeof this.sortingModel[key] === "string")
			return this.sortingMethod(this.sortingModel[key])
		return this.sortingModel[key]
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
			for (var key in this.entryModel || model) {
				entries.push(this.titles[key] || key)
				entries.push(this.entry(key, model))
			}
			const options = { gridContent: () => [...SelectionView.entries(6, ...entries)] }
			return new SelectionView(model, options)
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

	add(key, title, entryModel = {}, filterModel = {}, sortingModel = null) {
		this.titles[key] = title
		this.entryModel[key] = entryModel
		if (filterModel)
			this.filterModel[key] = filterModel
		if (sortingModel !== false)
			this.sortingModel[key] = sortingModel
	}

	static fromExample(source, autoCapitalise = true) {
		const setup = new CollectionSetup()
		for (let key in source) {
			setup.titles[key] = autoCapitalise ? capitalise(key) : key
			setup.entryModel[key] = {}
			setup.filterModel[key] = {}
			setup.sortingModel[key] = null
			setup.tableSetup.entries.push({ key: key, shown: true })
			setup.gridSetup.entries.push({ key: key, shown: true })
		}
		return setup
	}
}
