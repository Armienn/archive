import { Component, update, l } from "../../archive/arf/arf.js"
import iconButton, { acceptIcon, crossIcon } from "../../archive/search/icons.js"

export class NewSpellView extends Component {
	constructor(tabTitle, onSave, onCancel) {
		super()
		this.tabTitle = tabTitle
		this.spell = ""
		this.spellData
		this.onSave = onSave
		this.onCancel = onCancel
	}

	renderThis() {
		return l("div",
			l("div",
				l("span", { style: { color: "#888", height: "2rem", lineHeight: "2rem" } }, "Add "),
				l("input", {
					placeholder: "Spell",
					onchange: (event) => {
						this.spell = event.target.value
						//this.spellData = new Pokemon(this.pokemon)
						//if (!this.pokemonData.base)
						//	this.pokemonData = undefined
						update()
					},
					value: this.spell,
					attributes: { list: "newmodelchoice" }
				}),
				l("datalist#newmodelchoice", ...stuff.data.spells.map(e => l("option", e.name))),
				l("span", { style: { color: "#888", height: "2rem", lineHeight: "2rem" } }, " to " + this.tabTitle)
			),
			l("div",
				iconButton(acceptIcon({ filter: "invert(1)" }), () => {
					//this.pokemonData = new Pokemon(this.pokemon)
					//if (!this.pokemonData.base)
					//	this.onSave()
					this.onSave(this.spell)
				}),
				iconButton(crossIcon({ filter: "invert(1)" }), this.onCancel)
			)
		)
	}

	static styleThis() {
		return {
			"input, button": {
				margin: "0.25rem"
			},
			".close-button": {
				opacity: "0.5",
				transition: "0.3s ease"
			},
			".close-button:hover": {
				opacity: "1",
				transition: "0.3s ease"
			}
		}
	}
}
