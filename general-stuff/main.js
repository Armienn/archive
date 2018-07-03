import { SearchSite } from "../search/search-site.js"
import { update, setRenderFunction } from "../arf/arf.js"
import { NavGroup, NavEntry } from "../search/section-navigation.js"
import { CollectionSetup } from "../search/collection-setup.js"
import { ModelTypeEditor } from "./model-type-editor.js"
import { ModelEditor } from "./model-editor.js"
import { ExportView } from "./export-view.js"
import { ImportView } from "./import-view.js"

window.onload = function () {
	var site = new SearchSite()
	window.site = site
	var manager = new CollectionManager(site)
	window.manager = manager
	site.sections.navigation.navigationEntries = () => manager.navThing()
	setRenderFunction(() => site.render())
	update()
}

class CollectionManager {
	constructor(site) {
		this.site = site
		this.view
		this.currentSetup
		this.load()
	}

	load() {
		if (!(localStorage && localStorage.generalCollections))
			return this.collections = []
		this.collections = JSON.parse(localStorage.generalCollections)
		for (var col of this.collections)
			col.setup = new CollectionSetup(col.setup)
	}

	save() {
		if (!localStorage)
			return
		localStorage.generalCollections = JSON.stringify(this.collections)
	}

	showView(component) {
		this.view = component
		this.site.show(() => {
			return this.view
		})
		update()
	}

	navThing() {
		return [
			new NavGroup("Collections",
				...this.collections.map(e => {
					return new NavEntry(e.title, () => {
						this.site.setCollection(e.collection, e.setup)
						this.currentSetup = e
						update()
					}, () => this.site.sections.collection.engine.collection == e.collection)
				})
			),
			new NavGroup("Actions",
				new NavEntry("New collection", () => {
					this.showView(new ModelTypeEditor(this))
				}),
				new NavEntry("New entry", () => {
					if (this.currentSetup)
						this.showView(new ModelEditor(this, this.currentSetup))
				}),
				new NavEntry("Export", () => {
					this.showView(new ExportView(this))
				}),
				new NavEntry("Import", () => {
					this.showView(new ImportView(this))
				})
			),
			new NavGroup("Edit",
				this.currentSetup ?
					new NavEntry("Edit " + this.currentSetup.title, () => {
						this.showView(new ModelTypeEditor(this, this.currentSetup))
					}) :
					undefined,
				this.site.selection ?
					new NavEntry("Edit entry", () => {
						if (this.currentSetup)
							this.showView(new ModelEditor(this, this.currentSetup, this.site.selection))
					}) :
					undefined
			)
		]
	}
}