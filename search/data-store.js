export class DataStore {
	constructor() {
		this.data = {}
		this.loaded = {}
		this.external = {}
		this.directory = "./"
	}

	addDataSource(thing, file) {
		if (!file)
			file = thing + ".json"
		this.data[thing] = file
		this.loaded[thing] = false
	}

	addExternalSource(thing){
		this.external[thing] = false
	}

	load(onfinished, onerror) {
		for (let key in this.data) {
			requestJSON(this.directory + this.data[key], response => {
				this[key] = response
				this.loaded[key] = true
				if (onfinished && this.finishedLoading())
					onfinished()
			}, onerror)
		}
	}

	finishedLoading() {
		for (var key in this.loaded)
			if (!this.loaded[key])
				return false
		return true
	}

	finishedExternal() {
		for (var key in this.external)
			if (!this.external[key])
				return false
		return true
	}
}

function requestJSON(url, callback, onerror) {
	request(url, r => callback(JSON.parse(r)), onerror)
}

function request(url, callback, onerror) {
	var xmlHttp = new XMLHttpRequest()
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200)
				callback(xmlHttp.responseText)
			else if (onerror)
				onerror()
		}
	}
	xmlHttp.onerror = function () {
		if (onerror)
			onerror()
	}
	xmlHttp.open("GET", url, true)
	xmlHttp.send()
}
