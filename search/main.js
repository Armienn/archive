import { SearchSite } from "./search-site.js"
import { update, setRenderFunction } from "../arf/arf.js"

var site
window.onload = function () {
	site = new SearchSite()
	site.engine.collection = [
		{
			"name": "Acid Arrow",
			"school": "conjuration",
			"casting_time": "1 standard action",
			"range": "long (400 ft. + 40 ft./level)",
			"duration": "1 round + 1 round per three levels",
			"short_description": " Ranged touch attack; 2d4 damage for 1 round + 1 round/three levels.",
			"classes": {
				"sor": 2,
				"wiz": 2,
				"magus": 2,
				"bloodrager": 2
			},
			"types": [
				"acid"
			]
		},
		{
			"name": "Acid Fog",
			"school": "conjuration",
			"casting_time": "1 standard action",
			"range": "medium (100 ft. + 10 ft./level)",
			"duration": "1 round/level",
			"short_description": " Fog deals acid damage.",
			"classes": {
				"sor": 6,
				"wiz": 6,
				"magus": 6
			},
			"types": [
				"acid"
			]
		},
		{
			"name": "Acid Splash",
			"school": "conjuration",
			"casting_time": "1 standard action",
			"range": "close (25 ft. + 5 ft./2 levels)",
			"duration": "instantaneous",
			"short_description": " Orb deals 1d3 acid damage.",
			"classes": {
				"sor": 0,
				"wiz": 0,
				"summoner": 0,
				"inquisitor": 0,
				"magus": 0
			},
			"types": [
				"acid"
			]
		}]
	setRenderFunction(() => site.render())
	update()
}
