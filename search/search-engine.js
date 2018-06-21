import { fitsNested, compareFit } from "./util.js"

export class SearchEngine {
	constructor() {
		this._collection = []
		this.filteredCollection = []
		this.filters = []
		this.filter = { type: "", query: "" }
		this.resetFilterModel()
		this.resetSortingModel()
		this.sorting = "_bestfit"
		this.reverseSort = false
	}

	set collection(value) {
		this._collection = value
		this.updateFilteredCollection()
	}

	get collection() {
		return this._collection
	}

	resetFilterModel() {
		this.filterModel = { "": new FilterType("Anything", "", [], false, fitsNested) }
	}

	setFilterModelFromExample(source) {
		this.resetFilterModel()
		for (var key in source) {
			if (source[key] === true || source[key] === false)
				this.filterModel[key] = new FilterType(key, key, ["true", "false"], true)
			else
				this.filterModel[key] = new FilterType(key, key)
		}
	}

	resetSortingModel() {
		this.sortingModel = { "_bestfit": new SortingType("Best Fit", "", compareFit) }
	}

	setSortingModelFromExample(source) {
		this.resetSortingModel()
		for (var key in source)
			this.sortingModel[key] = new SortingType(key, key)
	}

	addCurrentFilter(){
		this.filters.push(this.filter)
		this.filter =  { type: "", query: "" }
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
		if (this.sorting) {
			list.sort(this.sortingModel[this.sorting].compare)
			if (this.reverseSort)
				list.reverse()
		}
		return list
	}

	filterTitle(filter){
		return (this.filterModel[filter.type] || this.filterModel[""]).title
	}

	applyFilter(list, filter) {
		var filterType = this.filterModel[filter.type] || this.filterModel[""]
		return list.filter(e => filterType.fits(e, filter.query))
	}
}

class FilterType {
	constructor(title, key, options = [], restrictToOptions = false, fits = null) {
		this.title = title
		this.key = key
		this.options = options
		this.restrictToOptions = restrictToOptions
		this.fits = fits || ((m, q) => fitsNested(m[this.key], q))
	}
}

class SortingType {
	constructor(title, key, compare = null) {
		this.title = title
		this.key = key
		this.compare = compare || ((a, b) => a[key] > b[key])
	}
}
