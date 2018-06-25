import { SearchSite } from "./search-site.js"
import { Component, l, update } from "../arf/arf.js"
import iconButton, { menuIcon } from "./icons.js"


export class SectionHeader extends Component {
	constructor(main) {
		super()
		this.main = main
		this.header = "header"
		this.dark = true
	}

	renderThis() {
		return l("header",
			l("h1", this.header),
			iconButton(menuIcon(this.dark ? { filter: "invert(1)" } : {}),
				() => { this.main.sections.navigation.shown = true; update() }, ".mobile-menu-button")
		)
	}

	static styleThis() {
		return {
			header: {
				backgroundColor: SearchSite.styling.headerBackground,
				color: SearchSite.styling.headerText,
				height: "100%",
				fontWeight: "bold",
				padding: "0.5rem"
			},
			h1: {
				fontSize: "1.5rem",
			},
			button: {
				position: "absolute",
				fontSize: "1.5rem",
				left: "0",
				top: "0",
				opacity: "0.5",
				transition: "0.3s ease"
			},
			"button:hover": {
				opacity: "1",
				transition: "0.3s ease"
			}
		}
	}
}
