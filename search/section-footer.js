import { Component, l } from "../arf/arf.js"
import { SearchSite } from "./search-site.js"

export class SectionFooter extends Component {
	constructor(main) {
		super()
		this.main = main
	}

	renderThis() {
		return l("footer",
			l("a", { href: "https://github.com/Armienn" }, "Design and code © Armienn, 2017-2018.")
		)
	}

	static styleThis() {
		return {
			footer: {
				height: "100%",
				padding: "0.5rem",
				textAlign: "center",
				fontSize: "0.8rem",
				backgroundColor: SearchSite.styling.headerBackground,
			}
		}
	}
}
