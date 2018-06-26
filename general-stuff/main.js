import { SearchSite } from "../search/search-site.js"
import { update, setRenderFunction } from "../arf/arf.js"
import { NavGroup, NavEntry } from "../search/section-navigation.js"
import { FilterType, SortingType } from "../search/search-engine.js"
import { DataEntry } from "../search/collection-view.js"

window.onload = function () {
	var site = new SearchSite()
	window.site = site
	const pokemons = [
		{"id":38,"name":"Ninetales","form":"Alolan","classification":"Fox Pokémon","abilities":["Snow Cloak",null,"Snow Warning"],"ratio":"1:3"},
		{"id":39,"name":"Jigglypuff","form":"Base","classification":"Balloon Pokémon","abilities":["Cute Charm","Competitive","Friend Guard"],"ratio":"1:3"},
	]
	
	site.sections.collection.collection = pokemons
	site.sections.collection.setupFromCollection()

	site.sections.navigation.navigationEntries.push(
		new NavGroup("Test functions",
			new NavEntry("Test auto", () => {
				site.sections.collection.collection = pokemons
				site.sections.collection.setupFromCollection()
				update()
			}),
			new NavEntry("Test manual", () => {
				site.sections.collection.collection = pokemons
				const filters = {
					id: new FilterType("Id", "id"),
					name: new FilterType("Name", "name"),
					form: new FilterType("Form", "form", ["base", "alolan", "mega"], true),
					ability: new FilterType("Ability", "abilities"),
					ratio: new FilterType("Gender Ratio", "ratio", ["1:1", "3:1", "1:3"], true)
				}
				const sorting = {
					id: new SortingType("Id", "id"),
					name: new SortingType("Name", "name"),
					form: new SortingType("Form", "form"),
					ability: new SortingType("Ability", "abilities", (a, b) => a.abilities[0] > b.abilities[0] ? 1 : a.abilities[0] < b.abilities[0] ? -1 : 0),
					ratio: new SortingType("Gender Ratio", "ratio")
				}
				const dataEntries = {
					id: new DataEntry("Id", "id"),
					name: new DataEntry("Name", "name"),
					form: new DataEntry("Form", "form"),
					classification: new DataEntry("Classification", "classification"),
					ability: new DataEntry("Ability", "abilities"),
					ratio: new DataEntry("Gender Ratio", "ratio")
				}
				const defaultShown = ["id", "name", "classification", "ability", "ratio"]
				site.sections.collection.setup(filters, sorting, dataEntries, defaultShown)

				update()
			})
		)
	)
	setRenderFunction(() => site.render())
	update()
}

class CollectionManager{
	constructor(){
		this.collections = this.loadCollections()
	}
	
	loadCollections() {
		if (!(localStorage && localStorage.generalCollections))
			return {}
		return JSON.parse(localStorage.generalCollections)
	}
}

[
	{title: "", options: [], restricted: false}
]