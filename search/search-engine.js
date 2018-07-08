import { fitsNested, parseQuery } from "./util.js"

export class SearchEngine {
	constructor() {
		this._collection = []
		this.filteredCollection = []
		this.filters = []
		this.resetFilter()
		this.resetFilterModel()
		this.resetSorting()
		this.resetSortingModel()
		this.reverseSort = false
	}

	set collection(value) {
		this._collection = value
		this.updateFilteredCollection()
	}

	get collection() {
		return this._collection
	}

	resetFilter() {
		this.filter = { type: "_anything_", query: "" }
	}

	resetFilterModel() {
		this.filterModel = { "_anything_": { filter: fitsNested } }
	}

	setFilterModel(filterModel) {
		this.resetFilterModel()
		for (let key in filterModel)
			this.filterModel[key] = filterModel[key]
		if (!Object.keys(filterModel).includes(this.filter.type))
			this.resetFilter()
	}

	resetSorting() {
		this.sorting = "_original_"
	}

	resetSortingModel() {
		this.sortingModel = { "_original_": () => 0 }
	}

	setSortingModel(sortingModel) {
		this.resetSortingModel()
		for (let key in sortingModel)
			if (!(typeof sortingModel[key] === "string"))
				this.sortingModel[key] = sortingModel[key]
		if (!Object.keys(sortingModel).includes(this.sorting))
			this.resetSorting()
	}

	addCurrentFilter() {
		this.filters.push(this.filter)
		this.filter = { type: "_anything_", query: "" }
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
		if (this.sorting && this.sorting != "_original_")
			list.sort(this.sortingModel[this.sorting] || this.defaultCompare(this.sorting))
		if (this.reverseSort)
			list.reverse()
		return list
	}

	applyFilter(list, filter) {
		let filterFunction = this.defaultFilter(filter.type)
		if (this.filterModel[filter.type])
			filterFunction = this.filterModel[filter.type].filter || this.defaultFilter(filter.type)
		return list.filter(e => filterFunction(e, filter.query))
	}

	defaultCompare(key) {
		return (a, b) => {
			return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
		}
	}

	defaultFilter(key) {
		return (m, q) => {
			return fitsNested(m[key], q)
		}
	}

	currentFilterType() {
		return this.filterModel[this.filter.type] || this.filterModel[""]
	}

	currentParsedQuery() {
		return parseQuery(this.filter.query)
	}

	setCurrentQueryFrom(parsedQuery) {
		this.filter.query = parsedQuery.map(e => e.type + e.query).join("|")
	}
}
