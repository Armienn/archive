import { SearchSite } from "./search-site.js"
import { Component, l } from "../arf/arf.js"


export class SectionHeader extends Component {
	constructor(main) {
		super()
		this.main = main
		this.header = "header"
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
				height: "100%",
				fontWeight: "bold",
				padding: "0.5rem"
			},
			h1: {
				fontSize: "1.5rem",
			}
		}
	}
}
