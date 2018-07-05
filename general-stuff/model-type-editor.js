import { Component, update, l } from "../arf/arf.js"
import { CollectionSetup } from "../search/collection-setup.js"
import iconButton, { crossIcon } from "../search/icons.js"
import { Styling } from "../search/styling.js"

export class ModelTypeEditor extends Component {
	constructor(manager, existingSetup) {
		super()
		this.manager = manager
		this.model = []
		this.collectionName = ""
		this.existingSetup = existingSetup
		if (existingSetup) {
			this.modelFromSetup(existingSetup.setup)
			this.collectionName = existingSetup.title
		}
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
						let col = {
							setup: CollectionSetup.fromExample(mod),
							title: this.collectionName,
							collection: []
						}
						for (let thing of this.model)
							col.setup.filterModel[thing.key] = thing
						if (this.existingSetup) {
							this.existingSetup.setup = col.setup
							this.existingSetup.title = col.title
							col = this.existingSetup
						}
						else {
							this.manager.collections.push(col)
						}
						this.manager.save()
						this.manager.currentSetup = col
						this.manager.site.setCollection(col.collection, col.setup)
						this.manager.site.clearSelection()
						update()
					}
				}, "Save collection")
			)
		)
	}

	static styleThis() {
		return {
			"input, button": {
				margin: "0.25rem"
			},
			".close-button": {
				opacity: "0.5",
				transition: "0.3s ease"
			},
			".close-button:hover": {
				opacity: "1",
				transition: "0.3s ease"
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
				}, e.restricted ? "Restricted" : "Unrestricted"),
				iconButton(crossIcon({ filter: Styling.styling.mainIconFilter }), () => {
					this.model.splice(this.model.indexOf(e), 1)
					update()
				}, ".close-button")
			)
		})
	}

	modelFromSetup(existingSetup) {
		for (var key in existingSetup.filterModel) {
			this.model.push({ key: key, options: existingSetup.filterModel[key].options || [], restricted: existingSetup.filterModel[key].restricted || false })
		}
	}
}
