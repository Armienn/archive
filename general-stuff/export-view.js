import { Component, l } from "../arf/arf.js"

export class ExportView extends Component {
	constructor(manager) {
		super()
		this.manager = manager

	}

	renderThis() {
		return l("div",
			l("div", "Exported collection"),
			l("textarea", JSON.stringify(this.manager.site.engine.filteredCollection))
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
