import { SearchSite } from "./search-site.js"
import { update, setRenderFunction } from "../arf/arf.js"

window.onload = function () {
	var site = new SearchSite()
	window.site = site
	site.engine.collection = [
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
	site.engine.setModelFromCollection()
	site.sections.content.setDataEntriesFromCollection()
	setRenderFunction(() => site.render())
	update()
}
