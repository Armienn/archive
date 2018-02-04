var output, input
// output functions
var print = function (text) {
	output.innerHTML += encodeHTML(text)
}
var printJSON = function (obj) {
	output.innerHTML += encodeHTML(formattedJSON(obj))
}
var clearOutput = function () {
	output.innerHTML = ""
}
//
var formattedJSON = function (obj, level) {
	if (!level)
		level = 0
	var result = obj instanceof Array ? "[\n" : "{\n"
	if (Object.keys(obj).length == 0)
		return obj instanceof Array ? "[]" : "{}"
	for (var key in obj) {
		var line = ""
		for (var i = 0; i < level + 1; i++)
			line += "\t"
		if (!(obj instanceof Array))
			line += "\"" + key + "\": "
		if (obj[key] === undefined)
			line += ""
		else if (typeof obj[key] == "string")
			line += JSON.stringify(obj[key])
		else if (Object.keys(obj[key]).length)
			line += formattedJSON(obj[key], level + 1)
		else
			line += JSON.stringify(obj[key])
		result += line + ",\n"
	}
	result = result.substr(0, result.length - 2) + "\n"
	for (var i = 0; i < level; i++)
		result += "\t"
	return result + (obj instanceof Array ? "]" : "}")
}
//
var parseCSVTable = function (data, separator, ignoreSeparatorWithinQuotes) {
	if (ignoreSeparatorWithinQuotes) {
		var split = data.split('"')
		for (var i = 1; i < split.length; i += 2) {
			split[i] = split[i].split(separator).join("🐐")
		}
		data = split.join("")
	}
	var rows = data.split("\n")
	for (var i in rows) {
		var list = rows[i].split(separator)
		rows[i] = list
	}
	if (ignoreSeparatorWithinQuotes) {
		for (var i in rows)
			rows[i] = rows[i].map(e => e.split("🐐").join(separator))
	}

	var headers = rows[0]
	var result = []
	for (var i = 1; i < rows.length; i++) {
		var entry = {}
		for (var j in headers) {
			entry[headers[j]] = rows[i][j]
		}
		result.push(entry)
	}
	return result
}
// function to encode in html
var encodeHTML = (function () {
	var encodeHTMLmap = { "&": "&amp;", "'": "&#39;", '"': "&quot;", "<": "&lt;", ">": "&gt;" }
	function encodeHTMLmapper(ch) { return encodeHTMLmap[ch] }
	return function (text) { return text.replace(/[&"'<>]/g, encodeHTMLmapper) }
})()

var newLink = function (text) {
	return "armienn.github.io/archive/sandbox/#" + LZString.compressToEncodedURIComponent(text)
}

window.onload = () => {
	output = document.getElementById("output")
	input = document.getElementById("input")
	if (window.location.hash && window.location.hash.substr(1))
		input.innerHTML = LZString.decompressFromEncodedURIComponent(window.location.hash.substr(1))
	// let tab work in textareas
	var textareas = document.getElementsByTagName("textarea")
	var count = textareas.length
	for (var i = 0; i < count; i++) {
		textareas[i].onkeydown = function (e) {
			if (e.keyCode == 9 || e.which == 9) {
				e.preventDefault()
				var s = this.selectionStart
				this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd)
				this.selectionEnd = s + 1
			}
		}
	}
}