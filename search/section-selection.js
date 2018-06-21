import { Component, l } from "../arf/arf.js"

export class SectionSelection extends Component {
	constructor(main) {
		super()
		this.main = main
	}

	renderThis() {
		return l("section",
			l("p", { style: { display: "none" } }, "selection info")
		)
	}
}
