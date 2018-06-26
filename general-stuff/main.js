import { SearchSite } from "../search/search-site.js"
import { update, setRenderFunction, l, Component } from "../arf/arf.js"
import { NavGroup, NavEntry } from "../search/section-navigation.js"
import { CollectionSetup } from "../search/collection-setup.js"

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
		this.editor = new ModelTypeEditor(this)
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
						update()
					}, () => this.site.sections.collection.engine.collection == e.collection)
				})
			),
			new NavGroup("Actions",
				new NavEntry("New collection", () => {
					this.editor.model = []
					this.site.show(() => {
						return this.editor
					})
					update()
				})
			)
		]
	}
}

class ModelTypeEditor extends Component {
	constructor(manager) {
		super()
		this.manager = manager
		this.model = []
		this.collectionName = ""
	}

	renderThis() {
		return l("div",
			l("div",
				l("input", {
					placeholder: "Collection name",
					oninput: (event) => { this.collectionName = event.target.value; update() },
					value: this.collectionName
				})
			),
			...this.inputs(),
			l("div",
				l("button", {
					onclick: () => { this.model.push({ key: "", options: [], restricted: false }); update() }
				}, "New field"),
				l("button", {
					onclick: () => {
						var mod = {}
						for (let thing of this.model)
							mod[thing.key] = "bla"
						const col = {
							setup: CollectionSetup.fromExample(mod),
							title: this.collectionName,
							collection: []
						}
						for (let thing of this.model)
							col.setup.filterModel[thing.key] = thing
						this.manager.collections.push(col)
						this.manager.save()
						this.manager.site.setCollection(col.collection, col.setup)
						update()
					}
				}, "Create collection")
			)
		)
	}

	static styleThis() {
		return {
			"input, button": {
				margin: "0.25rem"
			}
		}
	}

	inputs() {
		return this.model.map((e) => {
			return l("div",
				l("input", {
					placeholder: "title",
					oninput: (event) => { e.key = event.target.value; update() },
					value: e.key
				}),
				l("input", {
					placeholder: "options",
					oninput: (event) => { e.options = event.target.value.split("|"); update() },
					value: e.options.join("|")
				}),
				l("button", {
					onclick: () => { e.restricted = !e.restricted; update() },
				}, e.restricted ? "Restricted" : "Unrestricted")
			)
		})
	}
}
