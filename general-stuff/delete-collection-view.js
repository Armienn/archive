import { Component, update, l } from "../arf/arf.js"
import { CollectionSetup } from "../search/collection-setup.js"

export class DeleteCollectionView extends Component {
	constructor(manager, setup) {
		super()
		this.manager = manager
		this.setup = setup
	}

	renderThis() {
		return l("div",
			l("div",
				l("button", {
					onclick: () => {
						this.manager.collections.splice(this.manager.collections.indexOf(this.setup), 1)
						this.manager.save()
						this.manager.site.clearSelection()
						this.manager.site.setCollection([], new CollectionSetup())
						update()
					}
				}, "Delete " + this.setup.title)
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
