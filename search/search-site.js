import { SectionHeader } from "./section-header.js"
import { SectionNavigation } from "./section-navigation.js"
import { SectionSelection } from "./section-selection.js"
import { Component, l, update, clearStylesheets } from "../arf/arf.js"
import { CollectionView } from "./collection-view.js"
import { Styling } from "./styling.js"
import { toJSON, toMarkdown, toXSV, fromJSON, fromXSV, fromMarkdown, detectJSON, detectXSV } from "./porting.js"

export class SearchSite extends Component {
	constructor() {
		super()
		this.sections = {
			header: new SectionHeader(this),
			navigation: new SectionNavigation(this),
			selection: new SectionSelection(this),
			collection: new CollectionView(
				(model, setup, collection) => {
					if (this.selection == model)
						this.clearSelection()
					else
						this.showModel(model, setup, collection)
				},
				() => this.selection,
				() => this.sections.selection.getTop().substr(1)
			)
		}
		this.selection = null
		this.shownView = null
		this.collectionSetups = {}
		this.exportMethods = {
			JSON: toJSON,
			CSV: (collection, fields) => toXSV(collection, fields, ","),
			TSV: (collection, fields) => toXSV(collection, fields, "\t"),
			Markdown: toMarkdown
		}
		this.importMethods = {
			JSON: fromJSON,
			CSV: (data) => fromXSV(data, ","),
			TSV: (data) => fromXSV(data, "\t"),
			Markdown: fromMarkdown
		}
		this.detectMethods = {
			JSON: detectJSON,
			Markdown: (data, lines) => detectXSV(data, lines, "|"),
			TSV: (data, lines) => detectXSV(data, lines, "\t"),
			CSV: (data, lines) => detectXSV(data, lines, ",")
		}
		this.setFiltersFromLocation()
		this.engine.onChange = serialisedFilters => {
			if (serialisedFilters != window.location.hash.substr(1))
				window.location.hash = serialisedFilters
		}
	}

	set saveFunction(func) {
		this.sections.collection.save = func
	}

	set header(header) {
		this.sections.header.header = header
	}

	get engine() {
		return this.sections.collection.engine
	}

	setFiltersFromLocation() {
		if (window.location.hash.length > 1)
			this.engine.setFiltersFrom(decodeURI(window.location.hash.substr(1)))
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

	showModel(model, collectionSetup, collection) {
		this.sections.collection.collectionComponent.cachedEntries.delete(this.selection)
		this.sections.collection.collectionComponent.cachedEntries.delete(model)
		this.sections.collection.collectionComponent.hasChanged = true
		this.selection = model
		if (typeof collectionSetup === "string")
			this.sections.selection.content = this.collectionSetups[collectionSetup].view(model, collection)
		else
			this.sections.selection.content = collectionSetup.view(model, collection)
		update()
	}

	show(content) {
		this.sections.collection.collectionComponent.cachedEntries.delete(this.selection)
		this.sections.collection.collectionComponent.hasChanged = true
		this.selection = null
		this.sections.selection.content = content
		update()
	}

	clearSelection() {
		this.sections.collection.collectionComponent.cachedEntries.delete(this.selection)
		this.sections.collection.collectionComponent.hasChanged = true
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
			typeof setup === "string" ?
				this.collectionSetups[setup] :
				setup)
	}

	clearStylesheets() {
		clearStylesheets()
	}

	update() {
		update()
	}

	colorTest(style) {
		Styling.styling = style || {
			headerBackground: "#111155",
			headerText: "#fff",
			headerIconFilter: "invert(1)",
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
}
