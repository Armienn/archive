import { fitsNested, compareFit, parseQuery } from "./util.js"

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
	}

	resetSorting() {
		this.sorting = "_bestfit_"
	}

	resetSortingModel() {
		this.sortingModel = { "_bestfit_": { compare: compareFit } }
	}

	setSortingModel(sortingModel) {
		this.resetSortingModel()
		for (let key in sortingModel)
			this.sortingModel[key] = sortingModel[key]
	}

	addCurrentFilter() {
		this.filters.push(this.filter)
		this.filter = { type: "", query: "" }
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
			list.sort(this.compareMethod())
		if (this.reverseSort)
			list.reverse()
		return list
	}

	compareMethod() {
		if (this.sortingModel[this.sorting])
			return this.sortingModel[this.sorting].compare || this.defaultCompare(this.sorting)
		return this.defaultCompare(this.sorting)
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
