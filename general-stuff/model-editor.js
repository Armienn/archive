import { Component, update, l } from "../arf/arf.js"

export class ModelEditor extends Component {
	constructor(manager, collection, existingModel) {
		super()
		this.manager = manager
		this.collection = collection
		this.model = {}
		for (let key in this.collection.setup.filterModel)
			if (this.collection.setup.filterModel[key].restricted)
				this.model[key] = this.collection.setup.filterModel[key].options[0] || ""
			else
				this.model[key] = ""
		for (var key in existingModel)
			this.model[key] = existingModel[key]
		this.existingModel = existingModel
	}

	renderThis() {
		return l("div",
			...this.inputs(),
			l("div",
				l("button", {
					onclick: () => {
						if (this.existingModel)
							for (var key in this.model)
								this.existingModel[key] = this.model[key]
						else
							this.collection.collection.push(this.model)
						this.manager.save()
						this.manager.site.engine.updateFilteredCollection()
						this.manager.site.clearSelection()
						update()
					}
				}, "Save entry")
			)
		)
	}

	static styleThis() {
		return {
			"input, button, select": {
				margin: "0.25rem"
			},
			label: {
				margin: "0.25rem"
			}
		}
	}

	inputs() {
		var list = []
		for (let key in this.collection.setup.filterModel)
			list.push(...this.input(this.collection.setup.filterModel[key], key))
		return list
	}

	input(current, key) {
		if (current.restricted) {
			return [l("select",
				{ oninput: (event) => { this.model[key] = event.target.value; update() } },
				...(current.options || []).map(e => l("option", e)))]
		}
		else {
			return [l("input", {
				placeholder: key,
				oninput: (event) => { this.model[key] = event.target.value; update() },
				value: this.model[key],
				attributes: { list: "input-datalist" + key }
			}),
			l("datalist#input-datalist" + key, ...(current.options || []).map(e => l("option", e)))]
		}
	}
}
