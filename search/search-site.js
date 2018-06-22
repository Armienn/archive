import { SearchEngine } from "./search-engine.js"
import { SectionHeader } from "./section-header.js"
import { SectionNavigation } from "./section-navigation.js"
import { SectionSelection } from "./section-selection.js"
import { SectionContent } from "./section-content.js"
import { SectionFooter } from "./section-footer.js"
import { Component, l, update } from "../arf/arf.js"
import { SearchBar } from "./search-bar.js"

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
			search: new SearchBar(this.engine),
			selection: new SectionSelection(this),
			content: new SectionContent(this),
			footer: new SectionFooter(this)
		}
	}

	renderThis() {
		return l("div", {},
			l("section.header",this.sections.header),
			l("section.navigation",this.sections.navigation),
			l("section.search",this.sections.search),
			l("section.selection",this.sections.selection),
			l("section.content",this.sections.content),
			l("section.footer",this.sections.footer)
		)
	}

	static styleThis() {
		return {
			div: {
				backgroundColor: SearchSite.styling.mainBackground,
				color: SearchSite.styling.mainText,
				textAlign: "center",
				width: "100vw",
				height: "100vh",
				overflow: "auto",
				display: "grid",
				gridTemplateAreas: `
				"header header"
				"navigation navigation"
				"search search"
				"selection selection"
				"content content"
				"footer footer"`
			},
			".header":{ gridArea:"header"	},
			".navigation":{ gridArea:"navigation"	},
			".search":{ gridArea:"search"	},
			".selection":{ gridArea:"selection"	},
			".content":{ gridArea:"content"	},
			".footer":{ gridArea:"footer"	}
		}
	}

	update(){
		update()
	}
}