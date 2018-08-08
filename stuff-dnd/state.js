export class State {
	constructor() {
		// Loading stuff
		this.loaded = false
		this.thingsLoaded = {
			spells: false
		}
		this.externalInventory = { load: false, tabsLoaded: [] }
		this.script
		this.spreadsheet
		this.destination
	}

	get thingsAreLoaded() {
		for (var i in this.thingsLoaded)
			if (!this.thingsLoaded[i])
				return false
		if (this.externalInventory.load)
			return false
		return true
	}

	get externalThingsAreLoaded() {
		for (var tab of this.externalInventory.tabsLoaded)
			if (tab === false)
				return false
		return true
	}
}
