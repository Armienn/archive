import { SearchSite } from "../search/search-site.js"
import { update, setRenderFunction } from "../arf/arf.js"
import { NavGroup, NavEntry } from "../search/section-navigation.js"
import { CollectionSetup } from "../search/collection-setup.js"
import { ModelTypeEditor } from "./model-type-editor.js"
import { ModelEditor } from "./model-editor.js"

window.onload = function () {
	var site = new SearchSite()
	window.site = site
	var manager = new CollectionManager(site)
	site.sections.navigation.navigationEntries = () => manager.navThing()
	setRenderFunction(() => site.render())
	update()
}

class CollectionManager {
	constructor(site) {
		this.site = site
		this.typeEditor = new ModelTypeEditor(this)
		this.editor
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
					this.typeEditor.model = []
					this.typeEditor.collectionName = ""
					this.site.show(() => {
						return this.typeEditor
					})
					update()
				}),
				new NavEntry("New entry", () => {
					if (!this.currentSetup)
						return
					this.editor = new ModelEditor(this, this.currentSetup)
					this.site.show(() => {
						return this.editor
					})
					update()
				})
			)
		]
	}
}
