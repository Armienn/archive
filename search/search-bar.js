import { Component, update, l } from "../arf/arf.js"

export class SearchBar extends Component {
	constructor(engine) {
		super()
		this.engine = engine
		this.showSorting = false
	}

	renderThis() {
		return l("div.root",
			l("div.root-row", l("div.inputs",
				this.searchThing(),
				...this.sortThing(),
				this.filterAdd()
			)),
			l("div.root-row", l("div.filters",
				...this.filters()
			))
		)
	}

	static styleThis() {
		return {
			".root": {
				padding: "0.5em",
			},
			".root-row": {
				width: "100%",
				display: "flex",
				justifyContent: "center"
			},
			".inputs": {
				display: "flex",
				width: "100%",
				maxWidth: "50em"
			},
			".filters": {
				display: "flex",
				width: "100%",
				maxWidth: "50em",
				justifyContent: "center"
			},
			"input, select, button": {
				fontSize: "1em",
				height: "2em",
				padding: "0.2em"
			},
			".search-input-root": {
				display: "flex",
				flexGrow: "1",
				minWidth: "0",
			},
			".search-input": {
				flexGrow: "1",
				minWidth: "4em",
			},
			"button.search-input": {
				fontWeight: "bold",
				color: "#888"
			},
			"select.filter": {
				color: "#888",
				flexGrow: "0",
				width: "8em",
				textAlignLast: "center"
			},
			"div.sort": {
				display: "flex",
				width: "16em",
				minWidth: "16em",
				flexGrow: "0",
				overflow: "hidden",
				transition: "0.5s ease"
			},
			"div.sort.hidden": {
				width: "0",
				minWidth: "0",
				transition: "0.5s ease"
			},
			".sort label": {
				color: "#555",
				backgroundColor: "white",
				borderLeft: "1px solid #555",
				width: "4em",
				minWidth: "4em",
				height: "2em",
				lineHeight: "2em"
			},
			".sort select": {
				color: "#555",
				flexGrow: "0",
				width: "7em",
				minWidth: "7em",
				textAlignLast: "center"
			},
			"button.sort": {
				width: "2em",
				minWidth: "2em",
				color: "black",
				fontWeight: "bold",
				backgroundColor: "white",
				borderLeft: "1px solid #ddd"
			},
			"button.sortOrder": {
				minWidth: "5em",
				width: "5em",
				color: "#555",
				backgroundColor: "white"
			},
			"button.remove": {
				transition: "0.5s ease",
				width: "2em",
				color: "white",
				backgroundColor: "white"
			},
			"div.inputs:hover button.remove": {
				transition: "0.5s ease",
				color: "#aaa"
			},
			"div.inputs:hover button.remove:hover": {
				transition: "0.5s ease",
				color: "black"
			},
			"button.add": {
				width: "2em",
				minWidth: "2em",
				borderLeft: "1px solid #ddd",
				color: "black",
				fontWeight: "bold"
			},
			".filter-tag": {
				padding: "0.5em",
				margin: "0 0.25em",
				transition: "0.5s ease",
				cursor: "pointer",
				backgroundColor: "rgba(0,0,0,0.3)"
			},
			".filter-tag:hover": {
				transition: "0.5s ease",
				backgroundColor: "rgba(100,100,100,0.3)"
			},
			".filter-tag span": {
				color: "#888",
				marginRight: "0.5em"
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
				color: "white"
			}
		}
	}

	filters() {
		return this.engine.filters.map(e => {
			return l("div.filter-tag",
				{
					onclick: () => {
						this.engine.filters.splice(this.engine.filters.indexOf(e), 1)
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

	searchThing() {
		return l("div.search-input-root",
			...this.searchInput(),
			l("button.remove.symbol", {
				onclick: () => {
					if (this.engine.filter.query)
						this.engine.filter.query = ""
					else
						this.engine.filter.type = ""
					this.engine.updateFilteredCollection()
					update()
				},
			}, "🗙"),
			l("select.filter.clickable", {
				oninput: (event) => {
					if(this.engine.currentFilterType().restrictToOptions)
						this.engine.filter.query = ""
					this.engine.filter.type = event.target.value
					if(this.engine.currentFilterType().restrictToOptions)
						this.engine.filter.query = ""
					this.engine.updateFilteredCollection()
					update()
				}
			}, ...this.filterOptions())
		)
	}

	searchInput() {
		const current = this.engine.currentFilterType()
		const parsedQuery = this.engine.currentParsedQuery()
		if (current.restrictToOptions) {
			return current.options.map(e => {
				const currentIndex = parsedQuery.findIndex(q => q.query == e)
				return l("button.search-input.clickable" + (currentIndex > -1 ? ".toggled" : ""), {
					onclick: () => {
						if (currentIndex > -1)
							parsedQuery.splice(currentIndex, 1)
						else
							parsedQuery.push({ type: "", query: e })
						this.engine.setCurrentQueryFrom(parsedQuery)
						this.engine.updateFilteredCollection()
						update()
					},
				}, e)
			})
		}
		else {
			return [l("input.search-input", {
				placeholder: "Search", oninput: (event) => {
					this.engine.filter.query = event.target.value
					this.engine.updateFilteredCollection()
					update()
				},
				attributes: { list: "search-input-datalist" },
				value: this.engine.filter.query
			}),
			l("datalist#search-input-datalist", ...current.options.map(e => l("option", e)))]
		}
	}

	filterOptions() {
		const types = []
		for (let key in this.engine.filterModel){
			const props = key == this.engine.filter.type ? { value: key, selected: true } : { value: key }
			types.push(l("option", props, this.engine.filterModel[key].title))
		}
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
				}
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
		}, l("span.symbol",{style:{fontSize:"1.2em"}},"⚙"))]
	}

	sortOptions() {
		const types = []
		for (let key in this.engine.sortingModel){
			const props = key == this.engine.sorting ? { value: key, selected: true } : { value: key }
			types.push(l("option", props, this.engine.sortingModel[key].title))
		}
		return types
	}

	filterAdd() {
		return l("button.add.clickable", {
			onclick: () => {
				this.engine.addCurrentFilter()
				update()
			},
			disabled: !this.engine.filter.query
		}, l("span",{style:{fontSize:"1.2em"}},"+"))
	}
}

function SelectValueHook(value){
	this.value = value
}

SelectValueHook.prototype.hook = function(node){
	node.setAttribute("value", this.value)
}
