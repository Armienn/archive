import { SearchSite } from "./search-site.js"
import { Component, l } from "../arf/arf.js"
import { SearchBar } from "./search-bar.js"

export class SectionSearch extends Component {
	/**
	 * 
	 * @param {SearchSite} main 
	 */
	constructor(main) {
		super()
		this.main = main
		this.searchBar = new SearchBar(main.engine)
	}

	renderThis() {
		return l("section", this.searchBar)
	}

	static styleThis() {
		return {
			section: {
				backgroundColor: SearchSite.styling.headerBackground,
				color: SearchSite.styling.headerText
			}
		}
	}
}