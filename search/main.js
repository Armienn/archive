import { SearchSite } from "./search-site.js"
import { update, setRenderFunction } from "../arf/arf.js"

window.onload = function () {
	var site = new SearchSite()
	window.site = site
	site.engine.collection = [
		{
			"name": "Acid Arrow",
			"school": "conjuration",
			"casting_time": "1 standard action",
			"range": "long (400 ft. + 40 ft./level)",
			"duration": true,
			"short_description": " Ranged touch attack; 2d4 damage for 1 round + 1 round/three levels.",
			"classes": 23
		},
		{
			"name": "Acid Fog",
			"school": "conjuration",
			"casting_time": "1 standard action",
			"range": "medium (100 ft. + 10 ft./level)",
			"duration": false,
			"short_description": " Fog deals acid damage.",
			"classes": 6
		},
		{
			"name": "Acid Splash",
			"school": "conjuration",
			"casting_time": "1 standard action",
			"range": "close (25 ft. + 5 ft./2 levels)",
			"duration": true,
			"short_description": " Orb deals 1d3 acid damage.",
			"classes": 3
		}]
	site.engine.setModelFromCollection()
	setRenderFunction(() => site.render())
	update()
}
