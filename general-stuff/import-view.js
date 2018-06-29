import { Component, l, update } from "../arf/arf.js"

export class ImportView extends Component {
	constructor(manager) {
		super()
		this.manager = manager
		this.importBlob = ""
	}

	renderThis() {
		return l("div",
			l("div", "Import collection"),
			l("textarea", {
				oninput: (event) => { this.importBlob = event.target.value; update() }
			}, this.importBlob),
			l("button", {
				onclick: () => {
					this.manager.site.engine.collection.push(...JSON.parse(this.importBlob))
					this.manager.site.engine.updateFilteredCollection()
					this.manager.save()
					update()
				}
			}, "Import into current collection")
		)
	}

	static styleThis() {
		return {
			textarea: {
				width: "100%",
				height: "10rem"
			}
		}
	}
}
