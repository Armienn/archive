"use strict"

var l = arf.l
var Component = arf.Component

class SearchSite extends Component {
	constructor() {
		super()
		this.constructor.styling = {
			headerBackground: "red",
			headerText: "white",
			mainBackground: "grey",
			mainText: "white",
			unselectedText: "rgba(0,0,0,0.4)"
		}
		this.sections = {
			header: new SectionHeader(this),
			navigation: new SectionNavigation(this),
			search: new SectionSearch(this),
			selection: new SectionSelection(this),
			content: new SectionContent(this),
			footer: new SectionFooter(this)
		}
		this.engine = new SearchEngine()
	}

	renderThis() {
		return l("div", {},
			this.sections.header,
			this.sections.navigation,
			this.sections.search,
			this.sections.selection,
			this.sections.content,
			this.sections.footer
		)
	}

	static styleThis() {
		return {
			div: {
				backgroundColor: SearchSite.styling.mainBackground,
				color: SearchSite.styling.mainText,
				"text-align": "center",
				width: "100vw",
				height: "100vh",
				overflow: "auto",
				"overflow-x": "hidden"
			}
		}
	}
}

class SectionHeader extends Component {
	constructor(main) {
		super()
		this.main = main
		this.header = "header"
		this.subheader = l("a", { href: "google.com" }, "hej du") // "subheader"
	}

	renderThis() {
		return l("header",
			l("h1", this.header),
			l("h2", this.subheader)
		)
	}

	static styleThis() {
		return {
			header: {
				backgroundColor: SearchSite.styling.headerBackground,
				color: SearchSite.styling.headerText,
				fontWeight: "bold",
				padding: "1rem 1rem 0rem 1rem"
			},
			h1: {
				fontSize: "2rem",
			},
			h2: {
				fontSize: "1rem",
			}
		}
	}
}

class SectionNavigation extends Component {
	constructor(main) {
		super()
		this.main = main
		this.navigationEntries = [new NavigationEntry("nav 1"), new NavigationEntry("nav 2", true)]
	}

	renderThis() {
		return l("nav",
			l("ul",
				...this.navigationEntries
			)
		)
	}

	static styleThis() {
		return {
			nav: {
				backgroundColor: SearchSite.styling.headerBackground,
				color: SearchSite.styling.headerText,
				fontWeight: "bold",
				padding: "0.5rem"
			}
		}
	}
}

class NavigationEntry extends Component {
	constructor(content, selected) {
		super()
		this.selected = selected
		this.content = content
	}

	renderThis() {
		return l(Util.callOrReturn(this.selected) ? "li" : "li.unselected", this.content)
	}

	static styleThis() {
		return {
			li: {
				display: "inline-block",
				padding: "0 0.5rem"
			},
			".unselected": {
				color: SearchSite.styling.unselectedText,
			}
		}
	}
}

class SectionSearch extends Component {
	constructor(main) {
		super()
		this.main = main
	}

	renderThis() {
		return l("section",
			l("div.inputs",
				this.searchInput,
				this.filterInput,
				this.sortInput
			),
			l("ul.filters",
				l("li", "current filter 1"),
				l("li", "current filter 2")
			)
		)
	}

	static styleThis() {
		return {
			section: {
				backgroundColor: SearchSite.styling.headerBackground,
				color: SearchSite.styling.headerText,
				padding: "0.5rem"
			},
			li: {
				display: "inline-block",
				padding: "0 0.5rem"
			},
		}
	}
}

class SectionSelection extends Component {
	constructor(main) {
		super()
		this.main = main
	}

	renderThis() {
		return l("section",
			l("p", "selection info")
		)
	}
}

class SectionContent extends Component {
	constructor(main) {
		super()
		this.main = main
	}

	renderThis() {
		return l("section",
			l("div", "there'll be a list here")
		)
	}
}

class SectionFooter extends Component {
	constructor(main) {
		super()
		this.main = main
	}

	renderThis() {
		return l("footer",
			l("p", "footer")
		)
	}

	static styleThis() {
		return {
			footer: {
				padding: "1rem",
				"text-align": "left",
				"font-size": "0.8rem"
			}
		}
	}
}

class SearchEngine {
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

class Util {
	/** Returns either the parameter itself, or if it is a function, then the result of calling it */
	static callOrReturn(thing) {
		return typeof thing === "function" ? thing() : thing
	}
}

var site
window.onload = function () {
	site = new SearchSite()

	arf.setRenderFunction(() => site.render())
	arf.update()
}
