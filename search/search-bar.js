import { Component, update, l } from "../arf/arf.js"
import iconButton, { gearIcon, crossIcon, plusIcon, arrowDownIcon, arrowUpIcon } from "./icons.js"

export class SearchBar extends Component {
	constructor(engine) {
		super()
		this.engine = engine
		this.collectionSetup = {}
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
				fontSize: "1em",
				padding: "0.5em",
				color: "black"
			},
			".root-row": {
				width: "100%",
				display: "flex",
				justifyContent: "center"
			},
			".inputs": {
				display: "flex",
				width: "100%",
				maxWidth: "50em",
				border: "0.06125rem solid rgba(0,0,0,0.3)",
				backgroundColor: "white"
			},
			".filters": {
				display: "flex",
				width: "100%",
				maxWidth: "50em",
				justifyContent: "center"
			},
			"input, select, button": {
				fontSize: "1em",
				height: "2em"
			},
			".search-input-root": {
				display: "flex",
				flexGrow: "1",
				minWidth: "0",
			},
			".search-input": {
				flexGrow: "1",
				minWidth: "auto",
				whiteSpace: "nowrap",
				margin: "0 0.25em"
			},
			"button.search-input": {
				fontWeight: "bold",
				color: "#888"
			},
			"div.options":{
				overflowX: "auto",
				overflowY: "hidden",
				height: "2em",
				display: "flex",
				flexGrow: "1"
			},
			"select.filter": {
				color: "#888",
				flexGrow: "1",
				maxWidth: "8em",
				width: "4rem",
				textAlignLast: "center"
			},
			"div.sort": {
				zIndex: "1",
				display: "flex",
				width: "13em",
				minWidth: "13em",
				flexGrow: "0",
				overflow: "hidden",
				color: "rgba(0,0,0,0.6)",
				backgroundColor: "white",
				transition: "0.5s ease"
			},
			"div.sort.hidden": {
				width: "0",
				minWidth: "0",
				transition: "0.5s ease"
			},
			".sort label": {
				borderLeft: "1px solid rgba(0,0,0,0.6)",
				width: "4em",
				minWidth: "4em",
				height: "2em",
				lineHeight: "2em"
			},
			".sort select": {
				flexGrow: "0",
				width: "7em",
				minWidth: "7em",
				color: "rgba(0,0,0,0.6)",
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
				minWidth: "2em",
				width: "2em",
				backgroundColor: "white"
			},
			"button.remove": {
				transition: "0.5s ease",
				width: "2em",
				opacity: "0",
				backgroundColor: "transparent"
			},
			"div.inputs:hover button.remove": {
				transition: "0.5s ease",
				opacity: "0.4",
			},
			"div.inputs:hover button.remove:hover": {
				transition: "0.5s ease",
				opacity: "1",
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
				color: "white",
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
				l("span", this.title(e.type)),
				e.query
			)
		})
	}

	title(key) {
		if (key === "_anything_")
			return "Anything"
		if (key === "_bestfit_")
			return "Best Fit"
		if (key === "")
			return "Original"
		if (this.collectionSetup.titles && this.collectionSetup.titles[key])
			return this.collectionSetup.titles[key]
		return key
	}

	searchThing() {
		return l("div.search-input-root",
			...this.searchInput(),
			this.clearSearchButton(),
			this.searchFilterBox()
		)
	}

	clearSearchButton(){
		return iconButton(crossIcon(), () => {
			if (this.engine.filter.query)
				this.engine.filter.query = ""
			else
				this.engine.filter.type = "_anything_"
			this.engine.updateFilteredCollection()
			update()
		}, ".remove")
	}

	searchFilterBox(){
		return l("select.filter.clickable", {
			oninput: (event) => {
				if (this.engine.currentFilterType().restricted)
					this.engine.filter.query = ""
				this.engine.filter.type = event.target.value
				if (this.engine.currentFilterType().restricted)
					this.engine.filter.query = ""
				this.engine.updateFilteredCollection()
				update()
			}
		}, ...this.filterOptions())
	}

	filterOptions() {
		const types = []
		for (let key in this.engine.filterModel) {
			const props = key == this.engine.filter.type ? { value: key, selected: true } : { value: key }
			types.push(l("option", props, this.title(key)))
		}
		return types
	}

	searchInput() {
		const current = this.engine.currentFilterType()
		const parsedQuery = this.engine.currentParsedQuery()
		if (current.restricted) {
			return [l("div.options", ...current.options.map(e => {
				const elower = e.toLowerCase()
				const currentIndex = parsedQuery.findIndex(q => q.query == elower)
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
			}))]
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
			l("datalist#search-input-datalist", ...(current.options || []).map(e => l("option", e)))]
		}
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
			iconButton(this.engine.reverseSort ? arrowUpIcon({ opacity: "0.6" }) : arrowDownIcon({ opacity: "0.6" }),
				() => {
					this.engine.reverseSort = !this.engine.reverseSort
					this.engine.updateFilteredCollection()
					update()
				}, ".sortOrder.clickable")
		),
		iconButton(gearIcon(),
			() => {
				this.showSorting = !this.showSorting
				update()
			}, ".sort.clickable" + (this.showSorting ? ".toggled" : ""))]
	}

	sortOptions() {
		const types = []
		for (let key in this.engine.sortingModel) {
			const props = key == this.engine.sorting ? { value: key, selected: true } : { value: key }
			types.push(l("option", props, this.title(key)))
		}
		return types
	}

	filterAdd() {
		return iconButton(plusIcon(),
			() => {
				this.engine.addCurrentFilter()
				update()
			},
			".add.clickable",
			{ disabled: !this.engine.filter.query })
	}

	setCollectionSetup(setup){
		this.collectionSetup = setup
		this.engine.setFilterModel(setup.filterModel)
		this.engine.setSortingModel(setup.sortingModel)
	}
}
