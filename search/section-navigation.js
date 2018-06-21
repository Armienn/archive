import { SearchSite } from "./search-site.js"
import { Component, l } from "../arf/arf.js"
import callOrReturn from "./util.js"

export class SectionNavigation extends Component {
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
		return l(callOrReturn(this.selected) ? "li" : "li.unselected", this.content)
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
