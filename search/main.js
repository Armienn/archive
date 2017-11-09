"use strict"

var l = arf.l
var Component = arf.Component

class SearchSite extends Component {
	constructor() {
		super()
		this.constructor.styling = {
			headerBackground: "#c00",
			headerText: "#eee",
			mainBackground: "#222",
			mainText: "#eee",
			unselectedText: "rgba(0,0,0,0.4)",
			oddBackground: "rgba(180, 180, 180, 0.2)",
			evenBackground: "rgba(80, 80, 80, 0.2)",
			hoverBackground: "rgba(255, 255, 255, 0.35)"
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
		this.headerFunction = this.defaultHeaderFunction
		this.cellFunction = this.defaultCellFunction
		this.columns = ["1", "2", "3"]
	}

	renderThis() {
		return l("section",
			l("table",
				l("thead",
					l("tr",
						...this.getHeader()
					)
				),
				l("tbody",
					...this.getRows()
				)
			)
		)
	}

	static styleThis() {
		return {
			table: {
				width: "calc(100% - 2rem)",
				margin: "1rem"
			},
			tr: {
				height: "2rem",
			},
			"tbody tr": {
				cursor: "pointer",
				transition: "0.2s ease background"
			},
			"tbody tr:hover": {
				backgroundColor: SearchSite.styling.hoverBackground,
				transition: "0.2s ease background"
			},
			th: {
				"vertical-align": "middle"
			},
			".odd": {
				backgroundColor: SearchSite.styling.oddBackground,
			},
			".even": {
				backgroundColor: SearchSite.styling.evenBackground,
			},
		}
	}

	getHeader() {
		var entries = []
		var headers = this.headerFunction(this.main)
		for (var i in headers)
			entries.push(l("th", headers[i]))
		return entries
	}

	getRows() {
		var rows = []
		var odd = true
		for (var i in this.main.engine.filteredCollection) {
			rows.push(l("tr" + (odd ? ".odd" : ".even"), ...this.getRow(this.main.engine.filteredCollection[i])))
			odd = !odd
		}
		return rows
	}

	getRow(data) {
		var entries = []
		var dataEntries = this.cellFunction(data, this.main)
		for (var i in dataEntries)
			entries.push(l("th", dataEntries[i]))

		return entries
	}

	defaultHeaderFunction(main) {
		if (!main.engine.collection[0])
			return []
		return Object.keys(main.engine.collection[0])
	}

	defaultCellFunction(model, main) {
		if (!main.engine.collection[0])
			return []
		var headers = Object.keys(main.engine.collection[0])
		var cells = []
		for (var i in headers)
			cells.push(model[headers[i]])
		return cells
	}
}

class SectionFooter extends Component {
	constructor(main) {
		super()
		this.main = main
	}

	renderThis() {
		return l("footer",
			l("a", { href: "https://github.com/Armienn" }, "Design and code © Armienn, 2017.")
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
	site.engine.collection = [
		{
			"name": "Acid Arrow",
			"school": "conjuration",
			"casting_time": "1 standard action",
			"range": "long (400 ft. + 40 ft./level)",
			"duration": "1 round + 1 round per three levels",
			"short_description": " Ranged touch attack; 2d4 damage for 1 round + 1 round/three levels.",
			"classes": {
				"sor": 2,
				"wiz": 2,
				"magus": 2,
				"bloodrager": 2
			},
			"types": [
				"acid"
			]
		},
		{
			"name": "Acid Fog",
			"school": "conjuration",
			"casting_time": "1 standard action",
			"range": "medium (100 ft. + 10 ft./level)",
			"duration": "1 round/level",
			"short_description": " Fog deals acid damage.",
			"classes": {
				"sor": 6,
				"wiz": 6,
				"magus": 6
			},
			"types": [
				"acid"
			]
		},
		{
			"name": "Acid Splash",
			"school": "conjuration",
			"casting_time": "1 standard action",
			"range": "close (25 ft. + 5 ft./2 levels)",
			"duration": "instantaneous",
			"short_description": " Orb deals 1d3 acid damage.",
			"classes": {
				"sor": 0,
				"wiz": 0,
				"summoner": 0,
				"inquisitor": 0,
				"magus": 0
			},
			"types": [
				"acid"
			]
		}]
	arf.setRenderFunction(() => site.render())
	arf.update()
}
