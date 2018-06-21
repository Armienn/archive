import { SearchSite } from "./search-site.js"
import { Component, l } from "../arf/arf.js"


export class SectionHeader extends Component {
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
