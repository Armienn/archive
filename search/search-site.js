import { SearchEngine } from "./search-engine.js"
import { SectionHeader } from "./section-header.js"
import { SectionNavigation } from "./section-navigation.js"
import { SectionSearch } from "./section-search.js"
import { SectionSelection } from "./section-selection.js"
import { SectionContent } from "./section-content.js"
import { SectionFooter } from "./section-footer.js"
import { Component, l } from "../arf/arf.js"

export class SearchSite extends Component {
	constructor() {
		super()
		this.engine = new SearchEngine()
		this.constructor.styling = {
			headerBackground: "#c00",
			headerText: "#eee",
			mainBackground: "#222",
			mainText: "#eee",
			inactiveText: "rgba(0,0,0,0.4)",
			oddBackground: "rgba(180, 180, 180, 0.2)",
			evenBackground: "rgba(80, 80, 80, 0.2)",
			hoverBackground: "rgba(255, 255, 255, 0.35)"
		}
		this.sections = {
			header: new SectionHeader(this),
			navigation: new SectionNavigation(this),
			search: new SectionSearch(this),
			selection: new SectionSelection(this),
			content: new SectionContent(this),
			footer: new SectionFooter(this)
		}
	}

	renderThis() {
		return l("div", {},
			this.sections.header,
			this.sections.navigation,
			this.sections.search,
			this.sections.selection,
			this.sections.content,
			this.sections.footer
		)
	}

	static styleThis() {
		return {
			div: {
				backgroundColor: SearchSite.styling.mainBackground,
				color: SearchSite.styling.mainText,
				"text-align": "center",
				width: "100vw",
				height: "100vh",
				overflow: "auto",
				"overflow-x": "hidden"
			}
		}
	}
}