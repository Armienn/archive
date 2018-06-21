export class SearchEngine {
	constructor() {
		this._collection = []
		this.filteredCollection = []
		this.filters = []
		this.query = ""
		this.sorting = undefined
		this.reverseSort = false
		this.fitsQuery = (e, q) => {
			for (var i in e)
				if (typeof e[i] == "string" && e[i].toLowerCase().includes(q))
					return true
			return false
		}
	}

	set collection(value) {
		this._collection = value
		this.updateFilteredCollection()
	}

	get collection() {
		return this._collection
	}

	updateFilteredCollection() {
		this.filteredCollection = this.search()
	}

	search() {
		var list = []
		for (var i in this.collection)
			list[i] = this.collection[i]
		/* tab stuff
		if (stuff.state.currentTab == "mine") {
			pokes = []
			for (var i in stuff.collection.pokemons)
				pokes = pokes.concat(stuff.collection.pokemons[i].pokemons)
		} else if (stuff.state.currentTab == "breedables") {
			pokes = []
			for (var i in stuff.collection.pokemons)
				pokes = pokes.concat(stuff.collection.pokemons[i].pokemons)
			pokes = this.getBreedables(pokes)
		} else if (stuff.state.currentTab == "all") {
			pokes = pokes
		} else if (stuff.state.currentTab)
			pokes = stuff.state.currentTab.pokemons*/

		/* mode stuff
		pokes = this.getCompletionModePokemon(pokes)*/

		for (var i in this.filters)
			list = list.filter(this.filters[i])
		if (this.query)
			list = list.filter((entry) => this.fitsQuery(entry, this.query))
		if (this.sorting) {
			list.sort(this.sorting)
			if (this.reverseSort)
				list.reverse()
		}
		return list
	}
}