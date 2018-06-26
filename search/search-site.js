import { SectionHeader } from "./section-header.js"
import { SectionNavigation } from "./section-navigation.js"
import { SectionSelection } from "./section-selection.js"
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
			hoverBackground: "rgba(255, 255, 255, 0.35)"
		}
		this.sections = {
			header: new SectionHeader(this),
			navigation: new SectionNavigation(this),
			selection: new SectionSelection(this),
			collection: new CollectionView((model, setup) => {
				if (this.selection == model)
					this.clearSelection()
				else
					this.selectModel(model, setup)
			}, () => this.selection)
		}
		this.selection = null
		this.collectionSetups = {}
	}

	renderThis() {
		return l("div.layout", {},
			l("section.header", this.sections.header),
			l("section.navigation", this.sections.navigation),
			l("section.collection", this.sections.collection),
			l("section.selection", this.sections.selection)
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
				"header collection"
				"navigation collection"
				"navigation selection"`
			},
			".header": { gridArea: "header" },
			".navigation": { gridArea: "navigation" },
			".collection": { gridArea: "collection" },
			".selection": { gridArea: "selection" }
		}
	}

	selectModel(model, collectionSetup) {
		this.selection = model
		this.sections.selection.content = () => collectionSetup.view(model)
		update()
	}

	clearSelection() {
		this.selection = null
		this.sections.selection.content = null
		update()
	}

	addCollectionSetup(key, setup) {
		this.collectionSetups[key] = setup
	}

	setCollection(collection, setup) {
		this.sections.collection.collection = collection
		this.sections.collection.setCollectionSetup(
			typeof setup == "string" ?
				this.collectionSetups[setup] :
				setup)
	}

	update() {
		update()
	}
}
