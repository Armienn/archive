import { Component, update, l } from "../arf/arf.js"
import { stringFrom } from "../search/util.js"

export class DeleteView extends Component {
	constructor(manager, model, collection) {
		super()
		this.manager = manager
		this.collection = collection
		this.model = model
	}

	renderThis() {
		var entries = []
		for (var key in this.model)
			entries.push(l("div", key, ": ", stringFrom(this.model[key])))
		return l("div",
			...entries,
			l("div",
				l("button", {
					onclick: () => {
						this.collection.splice(this.collection.indexOf(this.model), 1)
						this.manager.save()
						this.manager.site.engine.updateFilteredCollection()
						this.manager.site.clearSelection()
						update()
					}
				}, "Delete this entry")
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
}
