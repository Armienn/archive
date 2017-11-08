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
	}

	renderThis() {
		return l("header",
			l("h1", "header"),
			l("h2", "subheader")
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
	}

	renderThis() {
		return l("nav",
			l("ul",
				l("li", "nav item 1"),
				l("li.unselected", "nav item 2")
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
			},
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
	
}

window.onload = function () {
	var site = new SearchSite()

	arf.setRenderFunction(() => site.render())
	arf.update()
}
