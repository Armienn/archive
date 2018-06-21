import { Component, update, l } from "../arf/arf.js"

export class SearchBar extends Component {
	constructor(engine) {
		super()
		this.engine = engine
		this.showSorting = false
	}

	renderThis() {
		return l("div.root",
			l("div.inputs",
				this.searchInput(),
				this.filterSelect(),
				this.sortThing(),
				this.filterAdd()
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
				maxWidth: "50rem"
			},
			".filters": {
				display: "flex",
				width: "100%",
				maxWidth: "50rem",
				justifyContent: "center"
			},
			input: {
				flexGrow: "1"
			},
			"select.filter": {
				color: "#888",
				flexGrow: "0",
				width: "8rem",
				textAlignLast: "center"
			},
			"div.sort": {
				display: "flex",
				width: "15rem",
				flexGrow: "0",
				overflow: "hidden",
				transition: "0.5s ease"
			},
			"div.sort.hidden": {
				width: "0",
				transition: "0.5s ease"
			},
			".sort label": {
				color: "#888",
				backgroundColor: "white",
				borderLeft: "1px solid #ddd",
				width: "4rem",
				height: "1.5rem",
				lineHeight: "1.5rem"
			},
			".sort select": {
				color: "#888",
				flexGrow: "0",
				width: "7rem",
				textAlignLast: "center"
			},
			"button.sort": {
				width: "1.5rem",
				color: "black",
				backgroundColor: "white",
				borderLeft: "1px solid #ddd"
			},
			"button.sortOrder": {
				width: "5rem",
				color: "#888",
				backgroundColor: "white"
			},
			"button.add": {
				width: "1.5rem",
				backgroundColor: "white",
				borderLeft: "1px solid #ddd",
				color: "black",
				fontSize: "1.1rem",
				fontWeight: "bold"
			},
			".filter-tag": {
				padding: "0.5rem",
				margin: "0 0.25rem",
				transition: "0.5s ease",
				cursor: "pointer",
				backgroundColor: "rgba(0,0,0,0.3)"
			},
			".filter-tag:hover": {
				transition: "0.5s ease",
				backgroundColor: "rgba(50,0,0,0.3)"
			},
			".filter-tag span": {
				color: "#888",
				marginRight: "0.5rem"
			},
			".inputs .clickable": {
				transition: "0.5s ease",
				backgroundColor: "white",
			},
			".inputs .clickable:hover": {
				transition: "0.5s ease",
				backgroundColor: "#ccc",
			},
			".inputs button.clickable.toggled": {
				transition: "0.5s ease",
				backgroundColor: "#aaa",
			}
		}
	}

	filters() {
		return this.engine.filters.map(e => {
			return l("div.filter-tag",
				{
					onclick: () => {
						this.engine.filters.splice(this.engine.filters.indexOf(e),1)
						this.engine.filter = e
						this.engine.updateFilteredCollection()
						update()
					}
				},
				l("span", this.engine.filterTitle(e)),
				e.query
			)
		})
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
		return l("select.filter.clickable", {
			oninput: (event) => {
				this.engine.filter.type = event.target.value
				this.engine.updateFilteredCollection()
				update()
			},
			value: this.engine.filter.type
		}, ...this.filterOptions()
		)
	}

	filterOptions() {
		const types = []
		for (let key in this.engine.filterModel)
			types.push(l("option", { value: key }, this.engine.filterModel[key].title))
		return types
	}

	sortThing() {
		return [l(this.showSorting ? "div.sort" : "div.sort.hidden",
			l("label", "Sort by"),
			l("select.clickable", {
				oninput: (event) => {
					this.engine.sorting = event.target.value
					this.engine.updateFilteredCollection()
					update()
				},
				value: this.engine.sorting
			}, ...this.sortOptions()),
			l("button.sortOrder.clickable", {
				onclick: () => {
					this.engine.reverseSort = !this.engine.reverseSort
					this.engine.updateFilteredCollection()
					update()
				}
			}, this.engine.reverseSort ? "Descending" : "Ascending")
		),
		l("button.sort.clickable" + (this.showSorting ? ".toggled" : ""), {
			onclick: () => {
				this.showSorting = !this.showSorting
				update()
			}
		}, "⚙")]
	}

	sortOptions() {
		const types = []
		for (let key in this.engine.sortingModel)
			types.push(l("option", { value: key }, this.engine.sortingModel[key].title))
		return types
	}

	filterAdd() {
		return l("button.add.clickable", {
			onclick: () => {
				this.engine.addCurrentFilter()
				update()
			},
			disabled: !this.engine.filter.query
		}, "+")
	}
}