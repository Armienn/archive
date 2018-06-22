import { Component, l } from "../arf/arf.js"

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
				padding: "0.5rem",
				textAign: "left",
				fontSize: "0.8rem"
			}
		}
	}
}
