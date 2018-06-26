import { Component, update, l } from "../arf/arf.js"
import { CollectionSetup } from "../search/collection-setup.js"

export class ModelTypeEditor extends Component {
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
