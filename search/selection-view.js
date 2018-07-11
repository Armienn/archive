import { Component, l, update } from "../arf/arf.js"
import iconButton, { editIcon, crossIcon, deleteIcon, acceptIcon } from "./icons.js"

export class SelectionView extends Component {
	constructor(model, setup, editSetup) {
		super()
		this.model = model
		if (!setup) {
			var entries = []
			for (var key in model) {
				entries.push(key)
				entries.push(model[key])
			}
			setup = { gridContent: () => [...SelectionView.entries({}, ...entries)] }
		}
		this.setup = setup
		this.editSetup = editSetup
	}

	renderThis() {
		return l("div",
			l("div", ...(this.setup.upperContent || (() => []))(this.model).filter(e => e)),
			l("div.grid", ...(this.setup.gridContent || (() => []))(this.model).filter(e => e)),
			l("div", ...(this.setup.lowerContent || (() => []))(this.model).filter(e => e))
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
		if (!this.setup.header)
			return
		var editIcons = []
		if (this.editing)
			editIcons.push(
				iconButton(acceptIcon({ filter: "invert(1)" }), () => {
					this.editing = false
					update()
				}),
				iconButton(crossIcon({ filter: "invert(1)" }), () => {
					this.editing = false
					update()
				}),
				iconButton(deleteIcon({ filter: "invert(1)" }), () => {
					this.editing = false
					update()
				})
			)
		else if (this.editSetup && this.editSetup.editable(this.model))
			editIcons.push(iconButton(editIcon({ filter: "invert(1)" }), () => {
				this.editing = true
				update()
			}))
		return l("header", { style: { background: this.headerBackground() } },
			this.setup.header.content(this.model),
			...editIcons
		)
	}

	headerBackground() {
		var colors = this.setup.header.colors(this.model) || ["transparent"]
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
		if (_setup.span)
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
