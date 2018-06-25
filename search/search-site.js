import { SectionHeader } from "./section-header.js"
import { SectionNavigation } from "./section-navigation.js"
import { SectionSelection } from "./section-selection.js"
import { SectionFooter } from "./section-footer.js"
import { Component, l, update } from "../arf/arf.js"
import { CollectionView } from "./collection-view.js"

export class SearchSite extends Component {
	constructor() {
		super()
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
			selection: new SectionSelection(this),
			content: new CollectionView((model) => { this.sections.selection.selection = model; update() }),
			footer: new SectionFooter(this)
		}
	}

	renderThis() {
		return l("div.layout", {},
			l("section.header", this.sections.header),
			l("section.navigation", this.sections.navigation),
			l("section.content", this.sections.content),
			l("section.selection", this.sections.selection),
			l("section.footer", this.sections.footer)
		)
	}

	static styleThis() {
		return {
			"div.layout": {
				backgroundColor: SearchSite.styling.mainBackground,
				color: SearchSite.styling.mainText,
				textAlign: "center",
				width: "100vw",
				height: "100vh",
				overflow: "hidden",
				display: "grid",
				gridTemplateRows: "4rem calc(100vh - 4rem) 0",
				gridTemplateColumns: "12rem calc(100vw - 12rem)",
				gridTemplateAreas: `
				"header content"
				"navigation content"
				"navigation selection"`
			},
			".header": { gridArea: "header" },
			".navigation": { gridArea: "navigation" },
			".search": { gridArea: "search" },
			".content": { gridArea: "content" },
			".selection": { gridArea: "selection" },
			".footer": { gridArea: "footer" }
		}
	}

	update() {
		update()
	}
}