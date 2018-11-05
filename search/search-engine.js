import { fitsNested, parseQuery } from "./util.js"
import { CollectionSetup } from "./collection-setup.js"
import { update } from "../arf/arf.js"

export class SearchEngine {
	constructor() {
		this.collectionSetup = new CollectionSetup()
		this._collection = []
		this.filteredCollection = []
		this.filters = []
		this.filter = { type: "", query: "" }
		this._sorting = ""
		this._reverseSort = false
		this._onChange = []
		this.scheduledUpdate
	}

	set onChange(value) {
		this._onChange.push(value)
	}

	set collection(value) {
		if (this._collection === value)
			return
		this._collection = value
		this.filteredCollection = value
		this.changed(true)
	}

	get collection() {
		return this._collection
	}

	set query(value) {
		if (this.filter.query === value)
			return
		this.filter.query = value
		this.changed()
	}

	get query() {
		return this.filter.query
	}

	set type(value) {
		if (this.filter.type === value)
			return
		this.filter.type = value
		if (this.filter.query)
			this.changed()
	}

	get type() {
		return this.filter.type
	}

	set sorting(value) {
		if (this._sorting === value)
			return
		this._sorting = value
		this.changed(true)
	}

	get sorting() {
		return this._sorting
	}

	set reverseSort(value) {
		if (this._reverse === value)
			return
		this._reverse = value
		this.changed(true)
	}

	get reverseSort() {
		return this._reverse
	}

	selectFilter(filter) {
		const current = this.filter
		this.filter = filter
		this.filters.splice(this.filters.indexOf(filter), 1)
		if (!(current.type == "" && current.query == ""))
			this.changed()
	}

	resetFilter() {
		const current = this.filter
		this.filter = { type: this.collectionSetup.defaultFilter || "", query: "" }
		if (!(current.type == "" && current.query == ""))
			this.changed()
	}

	resetSorting() {
		const current = this.sorting
		this.sorting = ""
		if (current != "")
			this.changed()
	}

	setCollectionSetup(setup) {
		this.collectionSetup = setup
		if (!Object.keys(setup.sortingModel).includes(this.sorting))
			this.resetSorting()
		const setupFilters = Object.keys(setup.filterModel)
		if (!setupFilters.includes(this.filter.type))
			this.resetFilter()
		this.filters = this.filters.filter(f => setupFilters.includes(f.type) || (f.type === "" && setup.allowAnythingFilter))
	}

	addCurrentFilter() {
		this.filters.push(this.filter)
		this.resetFilter()
	}

	changed(updateImmediately) {
		if (this.scheduledUpdate)
			return
		this.scheduledUpdate = setTimeout(() => {
			for (var callback of this._onChange)
				callback(this.serializeFilters())
			this.scheduledUpdate = false
			this.updateFilteredCollection()
			update()
		}, updateImmediately ? 50 : 1000)
	}

	serializeFilters() {
		if (this.type == "" && this.query == "" && !this.filters.length)
			return ""
		return [this.filter, ...this.filters]
			.filter(f => f.query)
			.map(f => f.type.replace(/[:;]/g, "") + ":" + f.query.replace(/[:;]/g, ""))
			.join(";")
	}

	updateFilteredCollection() {
		this.filteredCollection = this.search()
	}

	search() {
		var list = []
		for (let i in this.collection)
			list[i] = this.collection[i]
		for (let filter of this.filters)
			list = this.applyFilter(list, filter)
		list = this.applyFilter(list, this.filter)
		if (this.sorting)
			list.sort(this.collectionSetup.sortingMethod(this.sorting) || this.defaultCompare(this.sorting))
		if (this.reverseSort)
			list.reverse()
		return list
	}

	applyFilter(list, filter) {
		let filterFunction = this.defaultFilter(filter.type)
		if (!filter.type)
			filterFunction = fitsNested
		const filterModelEntry = this.collectionSetup.filterModel[filter.type]
		if (filterModelEntry)
			filterFunction = filterModelEntry.filter || this.defaultFilter(filter.type, filterModelEntry.specialQueries)
		return list.filter(e => filterFunction(e, filter.query))
	}

	defaultCompare(key) {
		return (a, b) => {
			const A = this.collectionSetup.entryData(key, a)
			const B = this.collectionSetup.entryData(key, b)
			return A > B ? 1 : A < B ? -1 : 0
		}
	}

	defaultFilter(key, specialQueries) {
		return (m, q) => {
			return fitsNested(this.collectionSetup.entryData(key, m), q, specialQueries)
		}
	}

	currentFilterType() {
		return this.collectionSetup.filterModel[this.filter.type] || { filter: fitsNested }
	}

	currentParsedQuery() {
		return parseQuery(this.filter.query)
	}

	setCurrentQueryFrom(parsedQuery) {
		this.query = parsedQuery.map(e => e.type + e.query).join("|")
	}

	setFiltersFrom(serializeFilters) {
		var parts = serializeFilters.split(";")
		this.filters = parts.map(p => {
			var blob = p.split(":")
			return { type: blob.length > 1 ? blob[0] : "", query: blob.length > 1 ? blob[1] || "" : blob[0] || "" }
		}).filter(e => e.type !== "_script_")
		this.resetFilter()
		this.changed()
	}
}
