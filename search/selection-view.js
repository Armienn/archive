import { Component, l } from "../arf/arf.js"

export class SelectionView extends Component {
	constructor(model, parts) {
		super()
		this.model = model
		if (!parts) {
			var entries = []
			for (var key in model) {
				entries.push(key)
				entries.push(model[key])
			}
			parts = { gridContent: () => [...SelectionView.entries({}, ...entries)] }
		}
		this.parts = parts
	}

	renderThis() {
		return l("div",
			l("div", ...(this.parts.upperContent || (() => []))(this.model).filter(e => e)),
			l("div.grid", ...(this.parts.gridContent || (() => []))(this.model).filter(e => e)),
			l("div", ...(this.parts.lowerContent || (() => []))(this.model).filter(e => e))
		)
	}

	static styleThis() {
		return {
			header: {
				fontSize: "1.5rem",
				fontWeight: "bold",
				height: "3rem",
				lineHeight: "3rem"
			},
			".grid": {
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
				gridAutoRows: "2rem",
				justifyContent: "center"
			},
			".title": {
				color: "#888",
				textAlign: "right",
				marginRight: "0.5rem",
				whiteSpace: "nowrap"
			},
			".content": {
				textAlign: "left",
				whiteSpace: "nowrap"
			},
			".section": {
				display: "grid",
				gridTemplateColumns: "auto auto",
				gridAutoRows: "2rem",
				lineHeight: "2rem"
			}
		}
	}

	header() {
		return this.parts.header ?
			l("header", { style: { background: this.headerBackground() } }, this.parts.header.content(this.model)) :
			undefined
	}

	headerBackground() {
		var colors = this.parts.header.colors(this.model) || ["transparent"]
		if (colors.length > 1)
			return "linear-gradient(to right, " + colors[0] + ", " + (colors[1] || colors[0]) + ")"
		return colors[0] || ""
	}

	static entries(_setup, ...entries) {
		const setup = {
			columns: "auto auto",
			rows: 6,
			span: 6
		}
		if(_setup.span)
			setup.rows = _setup.span
		for (var key in _setup)
			setup[key] = _setup[key]
		const columns = setup.columns.split(" ").length
		var sections = []
		for (let i = 0; i < entries.length; i += columns * setup.rows)
			sections.push(entries.slice(i, i + columns * setup.rows))
		return sections.map(section => {
			var count = -1
			return l("div.section", {
				style: {
					gridArea: "span " + setup.span,
					gridTemplateColumns: setup.columns,
					gridAutoRows: setup.rowHeight || "",
					lineHeight: setup.rowHeight || ""
				}
			}, ...section.map(e => {
				count++
				return count % columns ? l("span.content", e) : l("span.title", e, " | ")
			}))
		})
	}
}
