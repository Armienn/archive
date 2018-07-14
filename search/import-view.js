import { Component, l, update } from "../arf/arf.js"

export class ImportView extends Component {
	constructor(site, onImport) {
		super()
		this.site = site
		this.onImport = onImport
		this.importBlob = ""
		this.type = "nothing"
	}

	renderThis() {
		return l("div",
			l("textarea", {
				placeholder: "Data to import",
				oninput: (event) => {
					this.importBlob = event.target.value
					this.type = this.detectType()
					update()
				}
			}, this.importBlob),
			l("div", "Detected " + this.type),
			l("button", {
				onclick: () => {
					if (this.type == "nothing")
						return
					var collection = this.site.importMethods[this.type](this.importBlob)
					if (!collection.length)
						return
					this.onImport(collection, this.type)
				}
			}, "Import")
		)
	}

	static styleThis() {
		return {
			textarea: {
				width: "100%",
				height: "10rem",
				whiteSpace: "nowrap"
			}
		}
	}

	detectType() {
		var data = this.importBlob.trim()
		var lines = data.split("\n").splice(0, 10)
		for (var type in this.site.detectMethods) {
			if (this.site.detectMethods[type](data, lines))
				return type
		}
		if (lines.length < 2)
			return "nothing"
		return "CSV"
	}
}
