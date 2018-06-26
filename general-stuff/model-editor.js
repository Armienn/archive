import { Component, update, l } from "../arf/arf.js"

export class ModelEditor extends Component {
	constructor(manager, collection) {
		super()
		this.manager = manager
		this.collection = collection
		this.model = {}
	}

	renderThis() {
		return l("div",
			...this.inputs(),
			l("div",
				l("button", {
					onclick: () => {
						this.collection.collection.push(this.model)
						this.manager.save()
						this.manager.site.sections.collection.engine.updateFilteredCollection()
						this.manager.site.clearSelection()
						update()
					}
				}, "Add")
			)
		)
	}

	static styleThis() {
		return {
			"input, button": {
				margin: "0.25rem"
			},
			label: {
				margin: "0.25rem"
			}
		}
	}

	inputs() {
		var list = []
		for (let key in this.collection.setup.entryModel) {
			list.push(l("div",
				l("label", key),
				l("input", {
					placeholder: "value",
					oninput: (event) => { this.model[key] = event.target.value; update() },
					value: this.model[key]
				})
			))
		}
		return list
	}
}
