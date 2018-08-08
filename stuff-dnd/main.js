import { SearchSite } from "../search/search-site.js"
import { update, setRenderFunction } from "../arf/arf.js"
import { CollectionSetup } from "../search/collection-setup.js"
import { State } from "./state.js"
//import { ExportView } from "../search/export-view.js"
//import { ImportView } from "../search/import-view.js"

window.onload = function () {
	var site = new SearchSite()
	window.site = site
	var stuff = new DnDStuff(site)
	window.stuff = stuff
	site.header = "D&D 3.5 Stuff"
	//site.sections.header.url = "https://armienn.github.com/pokemon"
	//site.sections.navigation.navigationEntries = () => stuff.navThing()
	site.sections.navigation.navigationSetup = () => stuff.navThing()
	setRenderFunction(() => site.render())
	update()
}

function spellCollectionSetup() {
	const setup = new CollectionSetup()
	setup.allowAnythingFilter = false
	setup.defaultFilter = "name"
	setup.add("name", "Name")
	setup.add("schools", "Schools", { value: e => e.school + (e.subschool ? " (" + e.subschool + ")" : "") + (e.descriptor ? " [" + e.descriptor + "]" : "") })
	setup.add("school", "School")
	setup.add("subschool", "Sub-School")
	setup.add("descriptor", "Descriptor")
	setup.add("level", "Level")
	setup.add("components", "Components", {}, { restricted: true, options: ["V", "S", "M", "F", "DF"] })
	setup.add("castingtime", "Casting Time")
	setup.add("range", "Range")
	setup.add("area", "Area")
	setup.add("effect", "Effect")
	setup.add("duration", "Duration")
	setup.add("savingthrow", "Saving Throw")
	setup.add("spellresistance", "Spell Resistance")
	setup.add("materialcomponents", "Material Components")
	setup.add("arcanefocus", "Arcane Focus")
	setup.add("divinefocus", "Divine Focus")
	setup.add("focus", "Focus")
	setup.add("shortdescription", "Description")
	setup.add("reference", "Reference")
	setup.addScriptFilter("return model.stats.atk > 150 || model.stats.spa > 150")
	setup.showTableEntries(["name", "schools", "level", "components", "castingtime", "shortdescription"])
	setup.showGridEntries(["name", "schools", "level", "components", "castingtime", "shortdescription"])
	// const view = new PokemonView()
	// setup.view = (pokemon, collection) => view.withPokemon(pokemon, collection)
	return setup
}

class DnDStuff {
	constructor(site) {
		this.site = site
		this.data = {} // new PokemonData()
		this.state = new State()
		//this.localCollectionGroup = new CollectionGroup("Local")
		this.collectorInfo = {}
		this.location = { tab: "game-spells", type: "", path: "" }
		this.selectedLocal
		this.loadBaseData()
		//this.loadCollectionData()
	}

	navThing() {
		const setup = {}
		setup["Game Data"] = {}
		setup["Game Data"][""] = {}
		setup["Game Data"][""]["Spells"] = {
			action: () => {
				this.site.setCollection(this.data.spells, "spells")
				this.selectedLocal = undefined
				this.setLocation("game-spells")
				update()
			},
			selected: this.site.sections.collection.collection == this.data.spells
		}
		/*if (this.localCollectionGroup.tabs.length)
			setup["Game Data"]["Local"] = {}
		for (let tab of this.localCollectionGroup.tabs) {
			setup["Game Data"]["Local"][tab.title] = {
				action: () => {
					this.selectedLocal = tab
					this.site.setCollection(tab.pokemons, "knownSpells")
					update()
				},
				selected: this.site.sections.collection.collection == tab.spells
			}
		}*/
		setup["Game Data"]["Options"] = {}
		/*setup["Game Data"]["Options"]["Import"] = {
			action: () => {
				this.site.show(new ImportView(this.site, (collection, type) => {
					let parsedCollection = collection.map(e => type === "JSON" ? new Pokemon(e) : pokemonFromUnsanitised(e)).filter(e => e)
					if (collection.length == 0)
						parsedCollection = collection.map(e => pokemonFromUnsanitised(e)).filter(e => e)
					const tab = this.localCollectionGroup.addTab("Imported", parsedCollection)
					this.site.setCollection(tab.pokemons, "pokemonIndividuals")
					this.site.clearSelection()
					this.localCollectionGroup.saveToLocalStorage()
					update()
				}))
			}
		}
		setup["Game Data"]["Options"]["Export"] = {
			action: () => {
				this.site.show(new ExportView(this.site, (collection, type) => {
					if (type == "raw")
						return collection.map(e => {
							const model = {}
							for (var key in e)
								model[key] = e[key]
							delete model.base
							return model
						})
					return collection
				}))
			}
		}
		setup["Game Data"]["Options"]["Add Collection"] = {
			action: () => {
				this.site.show(new CollectionEditor("New Collection",
					(title) => {
						const tab = this.localCollectionGroup.addTab(title, [])
						this.site.setCollection(tab.pokemons, "pokemonIndividuals")
						this.site.clearSelection()
						this.localCollectionGroup.saveToLocalStorage()
						update()
					},
					() => {
						this.site.clearSelection()
						update()
					},
					() => {
						this.site.clearSelection()
						update()
					}
				))
			}
		}*/
		/*if (this.selectedLocal) {
			setup["Game Data"][this.selectedLocal.title] = {}
			setup["Game Data"][this.selectedLocal.title]["Add Pokémon"] = {
				action: () => {
					const tab = this.selectedLocal
					this.site.show(new NewPokemonView(tab.title,
						(pokemon) => {
							this.site.clearSelection()
							if (!pokemon)
								return update()
							tab.pokemons.push(pokemon)
							this.localCollectionGroup.saveToLocalStorage()
							this.site.showModel(pokemon, "pokemonIndividuals", tab.pokemons)
							this.site.sections.selection.content.switchToEdit()
							update()
						},
						() => {
							this.site.clearSelection()
							update()
						}
					))
				}
			}
			setup["Game Data"][this.selectedLocal.title]["Edit collection"] = {
				action: () => {
					const tab = this.selectedLocal
					this.site.show(new CollectionEditor(tab.title,
						(title) => {
							tab.title = title
							this.site.clearSelection()
							this.localCollectionGroup.saveToLocalStorage()
							update()
						},
						() => {
							this.site.clearSelection()
							update()
						},
						() => {
							this.site.clearSelection()
							this.localCollectionGroup.remove(tab)
							this.localCollectionGroup.saveToLocalStorage()
							update()
						}
					))
				}
			}
			if (this.selectedLocal.title !== "Imported" && this.localCollectionGroup.tabs.find(e => e.title == "Imported"))
				setup["Game Data"][this.selectedLocal.title]["Copy from Imported"] = {
					action: () => {
						const imported = this.localCollectionGroup.tabs.find(e => e.title == "Imported")
						this.selectedLocal.pokemons.push(...imported.pokemons)
						this.localCollectionGroup.remove(imported)
						this.site.engine.changed(true)
						this.localCollectionGroup.saveToLocalStorage()
						update()
					}
				}
		}*/
		return setup
	}

	loadBaseData() {
		/*this.loadJSONData("pokemons")
		this.loadJSONData("moves")
		this.loadJSONData("abilities")
		this.loadJSONData("natures")
		this.loadJSONData("eggGroups", "egg-groups")*/
		requestJSON("./spells.json", (spells) => {
			this.data.spells = spells
			this.state.thingsLoaded.spells = true
			this.tryLoad()
		})
	}

	loadJSONData(thing, file) {
		if (!file)
			file = thing
		requestJSON("./data-usum/" + file + ".json", (data) => {
			this.data[thing] = data
			this.state.thingsLoaded[thing] = true
			this.tryLoad()
		})
	}

	/*loadCollectionData() {
		if (!window.location.search)
			return
		this.parseLocation()
		this.state.externalInventory.load = true
		for (let i in this.site.importMethods)
			if (i.toLowerCase() == this.location.type.toLowerCase()) {
				request("https://" + this.location.path, (response) => {
					this.loadData = () => this.loadFromImport(this.location.tab, this.site.importMethods[i](response).map(e => new Pokemon(e)))
					stuff.state.externalInventory.load = false
					this.tryLoad()
				})
				return
			}
		if (this.location.type === "sheet")
			requestJSON(getSpreadsheetUrl(this.location.path), (response) => {
				this.loadData = () => loadSheetsFrom({ id: this.location.path, spreadsheet: response })
				stuff.state.externalInventory.load = false
				this.tryLoad()
			})
	}*/

	parseLocation() {
		const args = window.location.search.substring(1).split(":")
		if (args.length == 1) {
			this.location.tab = ""
			this.location.type = "sheet"
			this.location.path = args[0]
		}
		else if (args.length == 2) {
			this.location.tab = ""
			this.location.type = args[0]
			this.location.path = args[1]
		}
		else if (args.length == 3) {
			this.location.tab = args[0]
			this.location.type = args[1]
			this.location.path = args[2]
		}
	}

	setLocation(tab) {
		this.location.tab = tab
		history.replaceState({}, "", "?" + tab.toLowerCase().replace(/[: ]/g, "") + ":" + this.location.type + ":" + this.location.path)
	}

	loadFromImport(title, collection) {
		const tab = this.externalCollectionGroup.addTab(title, collection)
		this.site.setCollection(tab, "pokemonIndividuals")
	}

	tryLoad() {
		if (!this.state.thingsAreLoaded)
			return
		//this.data.movesList = Object.keys(this.data.moves).map(key => this.data.moves[key])
		var spellSetup = spellCollectionSetup()
		this.site.addCollectionSetup("spells", spellSetup)
		this.site.setCollection(this.data.spells, "spells")
		//this.localCollectionGroup.loadFromLocalStorage()
		this.state.loaded = true
		if (this.loadData) {
			//try {
			this.state.loaded = !this.loadData()
			//}
			//catch (e) {
			/*document.getElementById("loading").innerHTML = "Failed to load external collection: " + e.message
			document.getElementById("loading").onclick = () => {
				this.state.externalInventory.load = false
				this.tryLoad()
			}
			return*/
			//}
		}
		if (!this.state.loaded)
			return
		//this.selectCollectionFrom(this.location.tab)
		update()
		//setInterval(() => { this.listSection.loadMoreWhenScrolledDown() }, 500)
	}

	tryLoadAgain() {
		if (!this.state.externalThingsAreLoaded)
			return
		this.state.loaded = true
		var tab = this.externalCollectionGroup.tabs[Object.keys(this.externalCollectionGroup.tabs)[0]]
		if (this.location)
			this.selectCollectionFrom(this.location.tab, tab)
		else if (tab)
			this.site.setCollection(tab.pokemons, "pokemonIndividuals")
		update()
	}

	selectCollectionFrom(destination, defaultTab) {
		if (destination === "game-pokemon")
			return this.site.setCollection(this.data.pokemons, "pokemon")
		if (destination === "game-moves")
			return this.site.setCollection(this.data.movesList, "moves")
		destination = destination.toLowerCase().replace(/[: ]/g, "")
		for (var tab of this.externalCollectionGroup.tabs)
			if (tab.title.toLowerCase().replace(/[: ]/g, "") === destination)
				return this.site.setCollection(tab.pokemons, "pokemonIndividuals")
		if (defaultTab)
			this.site.setCollection(defaultTab.pokemons, "pokemonIndividuals")
	}
}


export function requestJSON(url, callback) {
	request(url, function (response) {
		callback(JSON.parse(response))
	})
}

function request(url, callback) {
	var xmlHttp = new XMLHttpRequest()
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200)
				callback(xmlHttp.responseText)
			else {
				document.getElementById("loading").innerHTML = "Failed to load external data"
				/*document.getElementById("loading").onclick = () => {
					stuff.state.externalInventory.load = false
					stuff.tryLoad()
				}*/
			}
		}
	}
	xmlHttp.onerror = function () {
		document.getElementById("loading").innerHTML = "Failed to load external data"
		/*document.getElementById("loading").onclick = () => {
			stuff.state.externalInventory.load = false
			stuff.tryLoad()
		}*/
	}
	xmlHttp.open("GET", url, true)
	xmlHttp.send()
}