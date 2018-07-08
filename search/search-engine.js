import { fitsNested, parseQuery } from "./util.js"
import { CollectionSetup } from "./collection-setup.js"

export class SearchEngine {
	constructor() {
		this.collectionSetup = new CollectionSetup()
		this._collection = []
		this.filteredCollection = []
		this.filters = []
		this.resetFilter()
		this.resetSorting()
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
		this.filter = { type: "", query: "" }
	}

	resetSorting() {
		this.sorting = ""
	}

	setCollectionSetup(setup) {
		this.collectionSetup = setup
		if (!Object.keys(setup.sortingModel).includes(this.sorting))
			this.resetSorting()
		if (!Object.keys(setup.filterModel).includes(this.filter.type))
			this.resetFilter()
	}

	addCurrentFilter() {
		this.filters.push(this.filter)
		this.resetFilter()
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
		if (this.collectionSetup.filterModel[filter.type])
			filterFunction = this.collectionSetup.filterModel[filter.type].filter || this.defaultFilter(filter.type)
		return list.filter(e => filterFunction(e, filter.query))
	}

	defaultCompare(key) {
		return (a, b) => {
			const A = this.collectionSetup.entryData(key, a)
			const B = this.collectionSetup.entryData(key, b)
			return A > B ? 1 : A < B ? -1 : 0
		}
	}

	defaultFilter(key) {
		return (m, q) => {
			return fitsNested(this.collectionSetup.entryData(key, m), q)
		}
	}

	currentFilterType() {
		return this.collectionSetup.filterModel[this.filter.type] || { filter: fitsNested }
	}

	currentParsedQuery() {
		return parseQuery(this.filter.query)
	}

	setCurrentQueryFrom(parsedQuery) {
		this.filter.query = parsedQuery.map(e => e.type + e.query).join("|")
	}
}
