import { Component, l, update } from "../arf/arf.js"
import { SearchEngine } from "./search-engine.js"
import { SearchBar } from "./search-bar.js"
import iconButton, { barsIcon, gridIcon, gearIcon, arrowRightIcon, arrowLeftIcon } from "./icons.js"
import { CollectionSetup } from "./collection-setup.js"
import { Styling } from "./styling.js"
import { CollectionComponent } from "./collection-component.js"

export class CollectionView extends Component {
	constructor(select, selected, hiddenByOverlay) {
		super()
		this.engine = new SearchEngine()
		this.searchBar = new SearchBar(this.engine)
		this.collectionSetup = new CollectionSetup()
		this.collectionComponent = new CollectionComponent(this)
		this.mode = "table"
		this.showSettings = false
		this.select = select || (() => { })
		this.selected = selected || (() => false)
		this.hiddenByOverlay = hiddenByOverlay
		this.save = () => { }
	}

	set collection(value) {
		this.engine.collection = value
	}
	get collection() {
		return this.engine.collection
	}

	renderThis() {
		return l("div.root",
			{ style: { height: this.hiddenByOverlay ? "calc(100% - " + this.hiddenByOverlay() + ")" : "" } },
			l("div.search-section", this.searchBar),
			l("div.table-section" + (this.hiddenByOverlay && !this.hiddenByOverlay() ? ".overlayable" : ""),
				this.viewSettings(), this.collectionComponent)
		)
	}

	currentCompact() {
		if (this.mode == "table")
			return this.collectionSetup.tableSetup.compact
		return this.collectionSetup.gridSetup.compact
	}

	static styleThis() {
		return {
			"div.root": {
				fontSize: "1rem",
				width: "100%",
				height: "100%",
				color: Styling.styling.mainText
			},
			"div.table-section": {
				height: "calc(100% - 3em)",
				overflow: "auto",
				transition: "0.3s"
			},
			"div.table-section.overlayable": {
				height: "calc(100vh - 3em)",
				transition: "0.3s"
			},
			button: {
				fontSize: "1rem",
			},
			"div.table-settings": {
				display: "flex",
				justifyContent: "flex-end",
				width: "100%",
				height: "2em"
			},
			"div.entry-editor": {
				display: "flex",
				height: "2em",
				lineHeight: "2em",
				maxWidth: "calc(100% - 2em)",
				flexGrow: "0",
				flexShrink: "0",
				overflowX: "auto",
				overflowY: "hidden",
				transition: "0.5s ease"
			},
			"div.entry-editor.hidden": {
				maxWidth: "0",
				transition: "0.5s ease"
			},
			".data-entry": {
				display: "contents"
			},
			"button.table-settings": {
				fontSize: "1em",
				fontWeight: "bold",
				width: "2em",
				height: "2em"
			},
			"span.count": {
				fontSize: "0.8em",
				lineHeight: "2.5em",
				marginRight: "1em",
				whiteSpace: "nowrap",
				opacity: "0.5"
			},
			"button.label": {
				fontSize: "0.8em",
				height: "2.5em"
			},
			".clickable": {
				transition: "0.5s ease",
				backgroundColor: "transparent",
				opacity: "0.4"
			},
			".clickable:hover": {
				transition: "0.5s ease",
				opacity: "0.7"
			},
			"button.clickable.toggled": {
				transition: "0.5s ease",
				backgroundColor: "#888",
				opacity: "1"
			},
			"button.clickable.active": {
				transition: "0.5s ease",
				opacity: "1"
			}
		}
	}

	viewSettings() {
		return l("div.table-settings",
			l("span.count", "Showing: " + this.engine.filteredCollection.length),
			l("button.label" + (this.currentCompact() ? ".active" : ".inactive"), {
				onclick: () => {
					if (this.mode == "table")
						this.collectionSetup.tableSetup.compact = !this.collectionSetup.tableSetup.compact
					else
						this.collectionSetup.gridSetup.compact = !this.collectionSetup.gridSetup.compact
					this.collectionComponent.hasChanged = true
					update()
				}
			}, "Compact"),
			iconButton(barsIcon({ filter: Styling.styling.mainIconFilter }), () => {
				this.mode = "table"
				this.collectionComponent.hasChanged = true
				update()
			}, ".table-settings.clickable" + (this.mode == "table" ? ".active" : "")),
			iconButton(gridIcon({ filter: Styling.styling.mainIconFilter }), () => {
				this.mode = "grid"
				this.collectionComponent.hasChanged = true
				update()
			}, ".table-settings.clickable" + (this.mode == "grid" ? ".active" : "")),
			this.entryEditor(),
			iconButton(gearIcon({ filter: Styling.styling.mainIconFilter }), () => {
				this.showSettings = !this.showSettings
				update()
			}, ".table-settings.clickable" + (this.showSettings ? ".toggled" : ""))
		)
	}

	entryEditor() {
		return l("div.entry-editor" + (this.showSettings ? "" : ".hidden"),
			...this.collectionSetup.entries(this.mode).map(e => {
				return l("div.data-entry",
					iconButton(arrowLeftIcon({ filter: Styling.styling.mainIconFilter }),
						() => {
							const index = this.collectionSetup.entries(this.mode).indexOf(e)
							if (index == 0)
								return
							this.collectionSetup.entries(this.mode).splice(index, 1)
							this.collectionSetup.entries(this.mode).splice(index - 1, 0, e)
							this.collectionComponent.hasChanged = true
							this.save()
							update()
						}, ".clickable"),
					l("button.label.clickable" + (e.shown ? ".active" : ""), {
						onclick: () => {
							e.shown = !e.shown
							this.collectionComponent.hasChanged = true
							this.save()
							update()
						}
					}, this.collectionSetup.title(e.key)),
					iconButton(arrowRightIcon({ filter: Styling.styling.mainIconFilter }),
						() => {
							const index = this.collectionSetup.entries(this.mode).indexOf(e)
							if (index == this.collectionSetup.entries(this.mode).length - 1)
								return
							this.collectionSetup.entries(this.mode).splice(index, 1)
							this.collectionSetup.entries(this.mode).splice(index + 1, 0, e)
							this.collectionComponent.hasChanged = true
							this.save()
							update()
						}, ".clickable"))
			})
		)
	}

	setCollectionSetup(setup) {
		this.collectionSetup = setup
		this.engine.setCollectionSetup(setup)
	}
}
