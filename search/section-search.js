import { SearchSite } from "./search-site.js"
import { Component, update, l } from "../arf/arf.js"

export class SectionSearch extends Component {
	constructor(main) {
		super()
		this.main = main
	}

	renderThis() {
		return l("section",
			l("div.inputs",
				this.searchInput(),
				this.filterInput(),
				this.sortInput()
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
				update()
			}
		})
	}

	filterInput() {
		return l("select",
			l("option", "hej"),
			l("option", "hej2")
		)
	}

	sortInput() {
		return [l("select",
			l("option", "hej"),
			l("option", "hej2")
		),
		l("button", { style: { color: SearchSite.styling.inactiveText } }, "Reverse")
		]
	}
}