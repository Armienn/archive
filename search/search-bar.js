import { Component, update, l } from "../arf/arf.js"

export class SearchBar extends Component {
	constructor(engine) {
		super()
		this.engine = engine
	}

	renderThis() {
		return l("div.root",
			l("div.inputs",
				this.searchInput(),
				this.filterSelect(),
				this.filterAdd(),
				this.sortSelect()
			),
			l("div.filters",
				...this.filters()
			)
		)
	}

	static styleThis() {
		return {
			".root": {
				padding: "0.5rem",
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center"
			},
			".inputs": {
				display: "flex",
				width: "100%",
				maxWidth: "1000px"
			},
			".filters": {
				display: "flex",
				width: "100%",
				maxWidth: "1000px"
			},
			input: {
				flexGrow: "1"
			},
			select: {
				color: "#aaa",
				flexgrow: "0",
				width: "8rem",
				borderLeft: "1px solid #ddd",
				textAlignLast: "center"
			},
			"button.sort": {
				color: "black",
				backgroundColor: "white",
				borderLeft: "1px solid #ddd"
			},
			"button.add": {
				backgroundColor: "white",
				borderLeft: "1px solid #ddd",
				color: "black",
				fontSize: "1.1rem",
				fontWeight: "bold"
			}
		}
	}

	filters() {
		return this.engine.filters.map(e => l("div", this.engine.filterTitle(e) + ": " + e.query))
	}

	searchInput() {
		return l("input", {
			placeholder: "Search", oninput: (event) => {
				this.engine.filter.query = event.target.value
				this.engine.updateFilteredCollection()
				update()
			},
			value: this.engine.filter.query
		})
	}

	filterSelect() {
		return l("select",
			l("option", "hej"),
			l("option", "hej2")
		)
	}

	sortSelect() {
		return [l("select",
			l("option", "hej"),
			l("option", "hej2")
		),
		l("button.sort", {
			onclick: () => {
				this.engine.reverseSort = !this.engine.reverseSort
				this.engine.updateFilteredCollection()
				update()
			}
		}, this.engine.reverseSort ? "▲" : "▼")
		]
	}

	filterAdd() {
		return l("button.add", {
			onclick: () => {
				this.engine.addCurrentFilter()
				update()
			}
		}, "+")
	}
}