import { SectionHeader } from "./section-header.js"
import { SectionNavigation } from "./section-navigation.js"
import { SectionSelection } from "./section-selection.js"
import { Component, l, update, clearStylesheets } from "../arf/arf.js"
import { CollectionView } from "./collection-view.js"
import { Styling } from "./styling.js"

export class SearchSite extends Component {
	constructor() {
		super()
		this.sections = {
			header: new SectionHeader(this),
			navigation: new SectionNavigation(this),
			selection: new SectionSelection(this),
			collection: new CollectionView(
				(model, setup) => {
					if (this.selection == model)
						this.clearSelection()
					else
						this.showModel(model, setup)
				},
				() => this.selection,
				() => this.sections.selection.getTop().substr(1)
			)
		}
		this.selection = null
		this.collectionSetups = {}
	}

	set saveFunction(func) {
		this.sections.collection.save = func
	}

	set header(header) {
		this.sections.header.header = header
	}

	colorTest(style) {
		Styling.styling = style || {
			headerBackground: "#111155",
			headerText: "#fff",
			headerIconFilter: "",
			mainBackground: "#bbddff",
			mainText: "#222",
			mainIconFilter: "",
			inactiveText: "rgba(120,120,120,0.4)",
			hoverBackground: "rgba(255, 255, 255, 0.35)",
			tableColor: "130,160,200"
		}
		clearStylesheets()
		update()
	}

	get engine() {
		return this.sections.collection.engine
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
				backgroundColor: Styling.styling.mainBackground,
				color: Styling.styling.mainText,
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

	clearStylesheets() {
		clearStylesheets()
	}

	showModel(model, collectionSetup) {
		this.selection = model
		this.sections.selection.content = () => collectionSetup.view(model)
		update()
	}

	show(content) {
		this.selection = null
		this.sections.selection.content = content
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
