import { Component, l, update, isArfElement } from "../arf/arf.js"
import iconButton, { editIcon, crossIcon, deleteIcon, acceptIcon } from "./icons.js"

export class SelectionView extends Component {
	constructor(model, setup, editSetup) {
		super()
		this.model = model
		this.editedModel = {}
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
		const setup = this.editing ? this.editSetup : this.setup
		const model = this.editing ? this.editedModel : this.model
		return l("div",
			l("div", ...(setup.upperContent || (() => []))(model).filter(e => e)),
			l("div.grid", ...(setup.gridContent || (() => []))(model).filter(e => e)),
			l("div", ...(setup.lowerContent || (() => []))(model).filter(e => e))
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
			},
			"input, select": {
				margin: "0.25rem"
			}
		}
	}

	switchToEdit(){
		this.editing = true
		this.editedModel = JSON.parse(JSON.stringify(this.model))
	}

	header() {
		if (!this.setup.header)
			return
		var editIcons = []
		if (this.editing)
			editIcons.push(
				iconButton(deleteIcon({ filter: "invert(1)" }), () => {
					this.editing = false
					if (this.editSetup.onDelete)
						this.editSetup.onDelete(this.model)
					update()
				}),
				iconButton(crossIcon({ filter: "invert(1)" }), () => {
					this.editing = false
					if (this.editSetup.onCancel)
						this.editSetup.onCancel()
					update()
				}),
				iconButton(acceptIcon({ filter: "invert(1)" }), () => {
					this.editing = false
					if (this.editSetup.onAccept)
						this.editSetup.onAccept(this.model, this.editedModel)
					update()
				})
			)
		else if (this.editSetup && this.editSetup.editable(this.model))
			editIcons.push(iconButton(editIcon({ filter: "invert(1)" }), () => {
				this.switchToEdit()
				update()
			}))
		return l("header", { style: { background: this.headerBackground() } },
			l("div.header-area", this.setup.header.content(this.model)),
			l("div.button-area", editIcons)
		)
	}

	headerBackground() {
		var colors = this.setup.header.colors(this.model) || ["transparent"]
		if (colors.length > 1)
			return "linear-gradient(to right, " + colors[0] + ", " + (colors[1] || colors[0]) + ")"
		return colors[0] || ""
	}

	static entries(setup, ...entries) {
		return this.splitIntoSections(setup, (e, i, columns) => {
			return i % columns ? l("span.content", e) : l("span.title", e, " | ")
		}, ...entries)
	}

	static editEntries(model, setup, ...entries) {
		return this.splitIntoSections(setup, (options, i, columns) => {
			if (!(i % columns))
				return l("span.title", options, " | ")
			if (typeof options === "string" || isArfElement(options))
				return l("span.content", options)
			if (options.restricted) {
				return l("select",
					{
						oninput: (event) => {
							if (options.key)
								model[options.key] = event.target.value
							else
								options.set(event.target.value)
							update()
						},
						style: { width: options.short ? "5rem" : "10rem" }
					},
					...(options.options || []).map(e => l("option", {
						selected: options.key ? model[options.key] == e : options.value
					}, e)))
			}
			else {
				return [l("input", {
					placeholder: options.key,
					oninput: (event) => {
						if (options.key)
							model[options.key] = event.target.value
						else
							options.set(event.target.value)
						update()
					},
					type: options.type || "",
					style: { width: options.short ? "5rem" : "10rem" },
					value: options.key ? model[options.key] : options.value,
					attributes: { list: "input-datalist" + options.key }
				}),
				l("datalist#input-datalist" + options.key, ...(options.options || []).map(e => l("option", e)))]
			}
		}, ...entries)
	}

	static splitIntoSections(setup, entryMap, ...entries) {
		setup = parseSetup(setup)
		var sections = []
		for (let i = 0; i < entries.length; i += setup.columnNumber * setup.rows)
			sections.push(entries.slice(i, i + setup.columnNumber * setup.rows))
		return sections.map(section => {
			return l("div.section", {
				style: {
					gridArea: "span " + setup.span,
					gridTemplateColumns: setup.columns,
					gridAutoRows: setup.rowHeight || "",
					lineHeight: setup.rowHeight || ""
				}
			}, ...section.map((e, i) => entryMap(e, i, setup.columnNumber)))
		})
	}
}

function parseSetup(_setup) {
	const setup = {
		columns: "auto auto",
		rows: 6,
		span: 6
	}
	if (_setup.span)
		setup.rows = _setup.span
	for (var key in _setup)
		setup[key] = _setup[key]
	setup.columnNumber = setup.columns.split(" ").length
	return setup
}
