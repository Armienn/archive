"use strict"

var l = arf.l
var Component = arf.Component

class SearchSite extends Component {
	constructor() {
		super()
		this.sections = {
			header: new SectionHeader(),
			navigation: new SectionNavigation(),
			selection: new SectionSelection(),
			content: new SectionContent(),
			footer: new SectionFooter()
		}
	}

	renderThis() {
		return l("div", {},
			this.sections.header,
			this.sections.navigation,
			this.sections.selection,
			this.sections.content,
			this.sections.footer
		)
	}

	static styleThis() {
		return {
			header: {
				fontSize: "2rem",
				fontWeight: "bold",
				height: "3rem",
				lineHeight: "3rem",
				paddingLeft: "1rem"
			},
			nav: {
				height: "3rem"
			},
			section: {
				minHeight: "calc(100vh - 6rem)"
			}
		}
	}
}

class SectionHeader extends Component {
	renderThis() {
		return l("header",
			l("h1", "header"),
			l("h2", "subheader")
		)
	}
}

class SectionNavigation extends Component {
	renderThis() {
		return l("nav",
			l("ul",
				l("li", "nav item 1"),
				l("li", "nav item 2")
			)
		)
	}
}

class SectionSelection extends Component {
	renderThis() {
		return l("section",
			l("p", "selection info")
		)
	}
}

class SectionContent extends Component {
	renderThis() {
		return l("section",
			l("div", "there'll be a list here")
		)
	}
}

class SectionFooter extends Component {
	renderThis() {
		return l("footer",
			l("p", "footer")
		)
	}
}

window.onload = function () {
	var site = new SearchSite()

	arf.setRenderFunction(() => site.render())
	arf.update()
}