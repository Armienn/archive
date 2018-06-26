import { SearchSite } from "./search-site.js"
import { update, setRenderFunction } from "../arf/arf.js"
import { NavGroup, NavEntry } from "./section-navigation.js"
import { CollectionSetup } from "./collection-setup.js"

window.onload = function () {
	var site = new SearchSite()
	window.site = site
	const pokemons = [
		{"id":38,"name":"Ninetales","form":"Alolan","classification":"Fox Pokémon","abilities":["Snow Cloak",null,"Snow Warning"],"ratio":"1:3"},
		{"id":39,"name":"Jigglypuff","form":"Base","classification":"Balloon Pokémon","abilities":["Cute Charm","Competitive","Friend Guard"],"ratio":"1:3"},
		{"id":40,"name":"Wigglytuff","form":"Base","classification":"Balloon Pokémon","abilities":["Cute Charm","Competitive","Frisk"],"ratio":"1:3"},
		{"id":41,"name":"Zubat","form":"Base","classification":"Bat Pokémon","abilities":["Inner Focus",null,"Infiltrator"],"ratio":"1:1"},
		{"id":42,"name":"Golbat","form":"Base","classification":"Bat Pokémon","abilities":["Inner Focus",null,"Infiltrator"],"ratio":"1:1"},
		{"id":43,"name":"Oddish","form":"Base","classification":"Weed Pokémon","abilities":["Chlorophyll",null,"Run Away"],"ratio":"1:1"},
		{"id":44,"name":"Gloom","form":"Base","classification":"Weed Pokémon","abilities":["Chlorophyll",null,"Stench"],"ratio":"1:1"},
		{"id":45,"name":"Vileplume","form":"Base","classification":"Flower Pokémon","abilities":["Chlorophyll",null,"Effect Spore"],"ratio":"1:1"},
		{"id":46,"name":"Paras","form":"Base","classification":"Mushroom Pokémon","abilities":["Effect Spore","Dry Skin","Damp"],"ratio":"1:1"},
		{"id":47,"name":"Parasect","form":"Base","classification":"Mushroom Pokémon","abilities":["Effect Spore","Dry Skin","Damp"],"ratio":"1:1"},
		{"id":48,"name":"Venonat","form":"Base","classification":"Insect Pokémon","abilities":["Compound Eyes","Tinted Lens","Run Away"],"ratio":"1:1"},
		{"id":49,"name":"Venomoth","form":"Base","classification":"Poison Moth Pokémon","abilities":["Shield Dust","Tinted Lens","Wonder Skin"],"ratio":"1:1"},
		{"id":50,"name":"Diglett","form":"Base","classification":"Mole Pokémon","abilities":["Sand Veil","Arena Trap","Sand Force"],"ratio":"1:1"},
		{"id":50,"name":"Diglett","form":"Alolan","classification":"Mole Pokémon","abilities":["Sand Veil","Tangling Hair","Sand Force"],"ratio":"1:1"},
		{"id":51,"name":"Dugtrio","form":"Base","classification":"Mole Pokémon","abilities":["Sand Veil","Arena Trap","Sand Force"],"ratio":"1:1"},
		{"id":51,"name":"Dugtrio","form":"Alolan","classification":"Mole Pokémon","abilities":["Sand Veil","Tangling Hair","Sand Force"],"ratio":"1:1"},
		{"id":52,"name":"Meowth","form":"Base","classification":"Scratch Cat Pokémon","abilities":["Pickup","Technician","Unnerve"],"ratio":"1:1"},
		{"id":52,"name":"Meowth","form":"Alolan","classification":"Scratch Cat Pokémon","abilities":["Pickup","Technician","Rattled"],"ratio":"1:1"},
		{"id":53,"name":"Persian","form":"Base","classification":"Classy Cat Pokémon","abilities":["Limber","Technician","Unnerve"],"ratio":"1:1"},
		{"id":53,"name":"Persian","form":"Alolan","classification":"Classy Cat Pokémon","abilities":["Fur Coat","Technician","Rattled"],"ratio":"1:1"},
		{"id":54,"name":"Psyduck","form":"Base","classification":"Duck Pokémon","abilities":["Damp","Cloud Nine","Swift Swim"],"ratio":"1:1"},
		{"id":55,"name":"Golduck","form":"Base","classification":"Duck Pokémon","abilities":["Damp","Cloud Nine","Swift Swim"],"ratio":"1:1"},
		{"id":56,"name":"Mankey","form":"Base","classification":"Pig Monkey Pokémon","abilities":["Vital Spirit","Anger Point","Defiant"],"ratio":"1:1"},
		{"id":57,"name":"Primeape","form":"Base","classification":"Pig Monkey Pokémon","abilities":["Vital Spirit","Anger Point","Defiant"],"ratio":"1:1"},
		{"id":58,"name":"Growlithe","form":"Base","classification":"Puppy Pokémon","abilities":["Intimidate","Flash Fire","Justified"],"ratio":"3:1"},
		{"id":59,"name":"Arcanine","form":"Base","classification":"Legendary Pokémon","abilities":["Intimidate","Flash Fire","Justified"],"ratio":"3:1"},
		{"id":60,"name":"Poliwag","form":"Base","classification":"Tadpole Pokémon","abilities":["Water Absorb","Damp","Swift Swim"],"ratio":"1:1"},
		{"id":61,"name":"Poliwhirl","form":"Base","classification":"Tadpole Pokémon","abilities":["Water Absorb","Damp","Swift Swim"],"ratio":"1:1"},
		{"id":62,"name":"Poliwrath","form":"Base","classification":"Tadpole Pokémon","abilities":["Water Absorb","Damp","Swift Swim"],"ratio":"1:1"},
		{"id":63,"name":"Abra","form":"Base","classification":"Psi Pokémon","abilities":["Synchronize","Inner Focus","Magic Guard"],"ratio":"3:1"},
		{"id":64,"name":"Kadabra","form":"Base","classification":"Psi Pokémon","abilities":["Synchronize","Inner Focus","Magic Guard"],"ratio":"3:1"},
		{"id":65,"name":"Alakazam","form":"Base","classification":"Psi Pokémon","abilities":["Synchronize","Inner Focus","Magic Guard"],"ratio":"3:1"},
		{"id":65,"name":"Alakazam","form":"Mega","classification":"Psi Pokémon","abilities":["Trace"],"ratio":"3:1"},
		{"id":66,"name":"Machop","form":"Base","classification":"Superpower Pokémon","abilities":["Guts","No Guard","Steadfast"],"ratio":"3:1"},
		{"id":67,"name":"Machoke","form":"Base","classification":"Superpower Pokémon","abilities":["Guts","No Guard","Steadfast"],"ratio":"3:1"},
		{"id":68,"name":"Machamp","form":"Base","classification":"Superpower Pokémon","abilities":["Guts","No Guard","Steadfast"],"ratio":"3:1"},
		{"id":69,"name":"Bellsprout","form":"Base","classification":"Flower Pokémon","abilities":["Chlorophyll",null,"Gluttony"],"ratio":"1:1"},
		{"id":70,"name":"Weepinbell","form":"Base","classification":"Flycatcher Pokémon","abilities":["Chlorophyll",null,"Gluttony"],"ratio":"1:1"},
		{"id":71,"name":"Victreebel","form":"Base","classification":"Flycatcher Pokémon","abilities":["Chlorophyll",null,"Gluttony"],"ratio":"1:1"},
		{"id":72,"name":"Tentacool","form":"Base","classification":"Jellyfish Pokémon","abilities":["Clear Body","Liquid Ooze","Rain Dish"],"ratio":"1:1"},
		{"id":73,"name":"Tentacruel","form":"Base","classification":"Jellyfish Pokémon","abilities":["Clear Body","Liquid Ooze","Rain Dish"],"ratio":"1:1"},
		{"id":74,"name":"Geodude","form":"Base","classification":"Rock Pokémon","abilities":["Rock Head","Sturdy","Sand Veil"],"ratio":"1:1"},
		{"id":74,"name":"Geodude","form":"Alolan","classification":"Rock Pokémon","abilities":["Magnet Pull","Sturdy","Galvanize"],"ratio":"1:1"},
		{"id":75,"name":"Graveler","form":"Base","classification":"Rock Pokémon","abilities":["Rock Head","Sturdy","Sand Veil"],"ratio":"1:1"},
		{"id":75,"name":"Graveler","form":"Alolan","classification":"Rock Pokémon","abilities":["Magnet Pull","Sturdy","Galvanize"],"ratio":"1:1"},
		{"id":76,"name":"Golem","form":"Base","classification":"Megaton Pokémon","abilities":["Rock Head","Sturdy","Sand Veil"],"ratio":"1:1"},
		{"id":76,"name":"Golem","form":"Alolan","classification":"Megaton Pokémon","abilities":["Magnet Pull","Sturdy","Galvanize"],"ratio":"1:1"},
		{"id":77,"name":"Ponyta","form":"Base","classification":"Fire Horse Pokémon","abilities":["Run Away","Flash Fire","Flame Body"],"ratio":"1:1"},
		{"id":78,"name":"Rapidash","form":"Base","classification":"Fire Horse Pokémon","abilities":["Run Away","Flash Fire","Flame Body"],"ratio":"1:1"},
		{"id":79,"name":"Slowpoke","form":"Base","classification":"Dopey Pokémon","abilities":["Oblivious","Own Tempo","Regenerator"],"ratio":"1:1"}]
	const staffList = [
		{
			DBID: 1,
			ID: "1234",
			Name: "Joakim von And",
			Abbreviation: "JvA",
			Title: "Rigand",
			Gender: 0,

			Email: "joakim@andeby.dk",
			TelephoneNumbers: [{ Number: "87654321", Type: "home", Primary: true }],
			Address: { AddressLine: "Store Velstands Boulevard 888", Country: "dk" },

			PermissionGroupID: 1,
			Competences: { AllowedProcedureTypes: [1], AllowedProcedures: [1, 2], DisallowedProcedures: [] },
			WeeklyWorkhours: 40
		},
		{
			DBID: 2,
			ID: "121212-1234",
			Name: "Sekretær 1",
			Abbreviation: "S1",
			Title: "Sekretær",
			Gender: 1,

			Email: "s1@clinic.dk",
			TelephoneNumbers: [{ Number: "87654321", Type: "home", Primary: true }],
			Address: { AddressLine: "Vej 888", Country: "dk" },

			PermissionGroupID: 2,
			Competences: { AllowedProcedureTypes: [], AllowedProcedures: [], DisallowedProcedures: [] },
			WeeklyWorkhours: 40
		},
		{
			DBID: 2,
			ID: "121212-1236",
			Name: "Sekretær 2",
			Abbreviation: "S2",
			Title: "Sekretær",
			Gender: 1,

			Email: "s2@clinic.dk",
			TelephoneNumbers: [{ Number: "87654322", Type: "home", Primary: true }],
			Address: { AddressLine: "Vej 888", Country: "dk" },

			PermissionGroupID: 2,
			Competences: { AllowedProcedureTypes: [], AllowedProcedures: [], DisallowedProcedures: [] },
			WeeklyWorkhours: 40
		},
		{
			DBID: 3,
			ID: "121212-1235",
			Name: "Radiograf 1",
			Abbreviation: "R1",
			Title: "Radiograf",
			Gender: 1,

			Email: "r1@clinic.dk",
			TelephoneNumbers: [{ Number: "87654311", Type: "home", Primary: true }],
			Address: { AddressLine: "Vej 888", Country: "dk" },

			PermissionGroupID: 2,
			Competences: { AllowedProcedureTypes: [3], AllowedProcedures: [], DisallowedProcedures: [] },
			WeeklyWorkhours: 40
		},
		{
			DBID: 4,
			ID: "121212-1233",
			Name: "Radiograf 2",
			Abbreviation: "R2",
			Title: "Radiograf",
			Gender: 1,

			Email: "r2@clinic.dk",
			TelephoneNumbers: [{ Number: "87654312", Type: "home", Primary: true }],
			Address: { AddressLine: "Vej 888", Country: "dk" },

			PermissionGroupID: 2,
			Competences: { AllowedProcedureTypes: [3], AllowedProcedures: [], DisallowedProcedures: [] },
			WeeklyWorkhours: 40
		},
		{
			DBID: 5,
			ID: "121212-1233",
			Name: "Doktor 2",
			Abbreviation: "D2",
			Title: "Doktor",
			Gender: 1,

			Email: "d2@clinic.dk",
			TelephoneNumbers: [{ Number: "87654332", Type: "home", Primary: true }],
			Address: { AddressLine: "Vej 888", Country: "dk" },

			PermissionGroupID: 2,
			Competences: { AllowedProcedureTypes: [], AllowedProcedures: [], DisallowedProcedures: [] },
			WeeklyWorkhours: 40
		},
		{
			DBID: 6,
			ID: "121212-1233",
			Name: "Doktor 1",
			Abbreviation: "D1",
			Title: "Doktor",
			Gender: 1,

			Email: "d1@clinic.dk",
			TelephoneNumbers: [{ Number: "87654331", Type: "home", Primary: true }],
			Address: { AddressLine: "Vej 888", Country: "dk" },

			PermissionGroupID: 2,
			Competences: { AllowedProcedureTypes: [1, 2], AllowedProcedures: [], DisallowedProcedures: [] },
			WeeklyWorkhours: 40
		}
	]
	site.addCollectionSetup("pokemon", CollectionSetup.fromExample(pokemons[0]))
	site.setCollection(pokemons, "pokemon")

	site.sections.navigation.navigationEntries.push(
		new NavGroup("Test functions",
			new NavEntry("Test auto", () => {
				site.sections.collection.collection = pokemons
				site.sections.collection.setupFromCollection()
				update()
			}),
			/*new NavEntry("Test manual", () => {
				site.sections.content.collection = pokemons
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
				site.sections.content.setup(filters, sorting, dataEntries, defaultShown)

				update()
			}),*/
			new NavEntry("Test staff auto", () => {
				site.sections.content.collection = staffList
				site.sections.content.setupFromCollection()
				update()
			})
		)
	)
	setRenderFunction(() => site.render())
	update()
}
