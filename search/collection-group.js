export class CollectionGroup {
	constructor(title, saveName) {
		this.title = title
		this.tabs = []
		this.saveName = saveName
		this.saveFunction = m => JSON.parse(JSON.stringify(m))
		this.loadFunction = m => m
	}

	addTab(title, list) {
		const tab = { list: list || [], title: title }
		this.tabs.push(tab)
		return tab
	}

	remove(tab) {
		this.tabs.splice(this.tabs.indexOf(tab), 1)
	}

	groupings() {
		const groupings = { "Collection": {} }
		for (var tab of this.tabs) {
			const parts = tab.title.split(":")
			if (parts.length > 1) {
				if (!groupings[parts[0]])
					groupings[parts[0]] = {}
				groupings[parts[0]][parts[1]] = tab
			}
			else {
				groupings["Collection"][parts[0]] = tab
			}
		}
		if (!Object.keys(groupings.Collection).length)
			delete groupings.Collection
		return groupings
	}

	saveToLocalStorage() {
		var tabs = {}
		for (var i in this.tabs) {
			tabs[i] = { title: this.tabs[i].title, list: [] }
			for (var model of this.tabs[i].list)
				tabs[i].list.push(this.saveFunction(model))
		}
		localStorage[this.saveName] = JSON.stringify(tabs)
	}

	loadFromLocalStorage() {
		if (!(localStorage && localStorage[this.saveName]))
			return
		var tabs = JSON.parse(localStorage[this.saveName])
		this.tabs = []
		for (var i in tabs) {
			for (var n in tabs[i].list)
				tabs[i].list[n] = this.loadFunction(tabs[i].list[n])
			this.addTab(tabs[i].title, tabs[i].list)
		}
	}
}