"use strict"

var l = arf.l
var Component = arf.Component

class SearchSite extends Component {
	constructor() {
		super()
		this.constructor.styling = {
			headerBackground: "#080",
			headerText: "#eee",
			mainBackground: "#222",
			mainText: "#eee",
			inactiveText: "rgba(0,0,0,0.4)",
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
		this.header = "Pathfinder ting"
		this.subheader = l("a", { href: "google.com" }, "hej du") // "subheader"
	}

	renderThis() {
		return l("header",
			l("h1", this.header)
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
		this.navigationEntries = [
			new NavigationEntry("Sætninger", () => {
				var sentences = ""
				var addSentence = (components) => {
					sentences += language.writeSentence(components) + "\n"
				}
				addSentence(["shine", "time: present", "sun"])
				addSentence(["shine", "time: present", "time: ongoing", "sun"])
				addSentence(["shine", "time: past", "sun"])
				addSentence(["shout, cry out", "time: past", "people (populace)", "some"])
				addSentence(["city, town", "large, big"])
				this.main.sections.selection.text = sentences
				arf.update()
			}),
			new NavigationEntry("Nyt sprog", () => {
				language.generateWords(wordlist)
				this.main.engine.collection = language.orderedWords
				this.main.engine.updateFilteredCollection()
				arf.update()
			}),
			new NavigationEntry("Nyt ord", () => {
				this.main.sections.selection.text = language.randomWord()
				arf.update()
			}, true)]
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
	constructor(content, onclick, selected) {
		super()
		this.onclick = onclick
		this.selected = selected
		this.content = content
	}

	renderThis() {
		return l(Util.callOrReturn(this.selected) ? "li" : "li.unselected", { onclick: this.onclick }, this.content)
	}

	static styleThis() {
		return {
			li: {
				display: "inline-block",
				padding: "0 0.5rem"
			},
			".unselected": {
				color: SearchSite.styling.inactiveText,
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
				this.searchInput()
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
			".inputs": {
				display: "flex",
				width: "70%",
				"margin-left": "15%"
			},
			input: {
				"flex-grow": "2"
			},
			select: {
				"flex-grow": "1",
				"margin-left": "1rem"
			},
			button: {
				"margin-left": "0.5rem",
				"font-weight": "bold",
				color: SearchSite.styling.headerText,
				backgroundColor: "transparent"
			}
		}
	}

	searchInput() {
		return l("input", {
			placeholder: "Search", oninput: (event) => {
				this.main.engine.query = event.target.value
				this.main.engine.updateFilteredCollection()
				arf.update()
			}
		})
	}
}

class SectionSelection extends Component {
	constructor(main) {
		super()
		this.main = main
		this.text = "selection info"
	}

	renderThis() {
		return l("section",
			l("pre", { style: { display: "" } }, this.text)
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
	language.generateWords(wordlist)
	site.engine.collection = language.orderedWords
	arf.setRenderFunction(() => site.render())
	arf.update()
}
