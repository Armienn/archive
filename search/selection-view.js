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
			parts = { gridContent: () => [...SelectionView.entries(6, ...entries)] }
		}
		this.parts = parts
		this.span = parts.span || 6
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
				lineHeight: "2rem",
				whiteSpace: "nowrap"
			},
			".content": {
				textAlign: "left",
				lineHeight: "2rem",
				whiteSpace: "nowrap"
			},
			".section": {
				display: "grid",
				gridTemplateColumns: "auto auto",
				gridAutoRows: "2rem"
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

	static entries(span, ...entries) {
		const columns = span[1] || 2
		span = span[0] || span
		var sections = []
		for (let i = 0; i < entries.length; i += columns * span)
			sections.push(entries.slice(i, i + columns * span))
		const sectionStyle = { style: { 
			gridArea: "span " + span,
			gridTemplateColumns: "auto " + "min-content ".repeat(columns-2) + "auto" } }
		return sections.map(section => {
			var count = -1
			return l("div.section", sectionStyle, ...section.map(e => {
				count++
				return count % columns ? l("span.content", e) : l("span.title", e + " | ")
			}))
		})
	}
}
