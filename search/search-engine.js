import { fitsNested } from "./util.js"

export class SearchEngine {
	constructor() {
		this._collection = []
		this.filteredCollection = []
		this.filters = []
		this.filter = { type: "", query: "" }
		this.searchModel = {}
		this.sorting = undefined
		this.reverseSort = false
	}

	set collection(value) {
		this._collection = value
		this.updateFilteredCollection()
	}

	get collection() {
		return this._collection
	}

	setSearchModelFromExample(source) {
		this.searchModel = {}
		for (var key in source) {
			if (source[key] === true || source[key] === false)
				this.searchModel[key] = new SearchType(key, key, ["true", "false"], true)
			else
				this.searchModel[key] = new SearchType(key, key)
		}
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
			list.sort(this.sorting)
			if (this.reverseSort)
				list.reverse()
		}
		return list
	}

	applyFilter(list, filter) {
		var searchType = this.searchModel[filter.type] || new SearchType("", "", [], false, fitsNested)
		return list.filter(e => searchType.fits(e, filter.query))
	}
}

class SearchType {
	constructor(title, key, options = [], restrictToOptions = false, fits = null) {
		this.title = title
		this.key = key
		this.options = options
		this.restrictToOptions = restrictToOptions
		this.fits = fits || ((m, q) => fitsNested(m[this.key], q))
	}
}
