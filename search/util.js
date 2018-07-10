/** Returns either the parameter itself, or if it is a function, then the result of calling it */
export default function callOrReturn(thing) {
	return typeof thing === "function" ? thing() : thing
}

export function fitsFancy(thing, query) {
	switch (query.type) {
		case ">": return thing > query.query
		case "<": return thing < query.query
		case "=": return ("" + thing).toLowerCase().trim() === query.query
		case "!":
		case "":
		default: return ("" + thing).toLowerCase().includes(query.query)
	}
}

export function fitsNested(thing, query, specialQueries) {
	if (!query)
		return true
	if (typeof query === "string") {
		const parsed = parseQuery(query)
		for (let q of parsed)
			if (q.type == "!" ? !fitsNested(thing, q, specialQueries) : fitsNested(thing, q, specialQueries))
				return true
		if (parsed.length == 0)
			return true
		return false
	}
	thing = callOrReturn(thing)
	if (thing == null)
		return false
	if(specialQueries && Object.keys(specialQueries).includes(query.query))
		return specialQueries[query.query](thing)
	if (isBasicType(thing)) {
		return fitsFancy(thing, query)
	} else if (typeof thing[Symbol.iterator] === "function") {
		for (let inner of thing)
			if (fitsNested(inner, query, false))
				return true
	} else {
		for (let key in thing)
			if (fitsNested(thing[key], query, false))
				return true
	}
	return false
}

export function parseQuery(query) {
	query = query.toLowerCase()
	return splitAtSingle(query, "|")
		.map(e => e.replace(/\|\|/g, "|").trim())
		.filter(e => e)
		.map(e => {
			var q = { query: e, type: "" }
			if (e.startsWith(">")) {
				q.query = e.substr(1)
				if (!q.query.startsWith(">")) {
					q.type = ">"
					q.query = +q.query
				}
			}
			if (e.startsWith("<")) {
				q.query = e.substr(1)
				if (!q.query.startsWith("<")) {
					q.type = "<"
					q.query = +q.query
				}
			}
			if (e.startsWith("!")) {
				q.query = e.substr(1)
				if (!q.query.startsWith("!"))
					q.type = "!"
			}
			if (e.startsWith("=")) {
				q.query = e.substr(1)
				if (!q.query.startsWith("="))
					q.type = "="
			}
			return q
		})
		.filter(e => e.query)
}

function splitAtSingle(text, separator) {
	var result = []
	var lastSplit = 0
	for (var i = 0; i < text.length; i++) {
		if (text[i] === separator && text[i - 1] !== separator && text[i + 1] !== separator) {
			result.push(text.substring(lastSplit, i))
			lastSplit = i + 1
		}
	}
	result.push(text.substring(lastSplit, text.length))
	return result
}

function isBasicType(thing) {
	return typeof thing === "string" || typeof thing === "number" || typeof thing === "boolean"
}

export function capitalise(text) {
	if (text.length)
		return text[0].toUpperCase() + text.substr(1)
}

export function stringFrom(source) {
	if (source === undefined)
		return ""
	if (source instanceof Array)
		return source.map(e => stringFrom(e)).join(", ")
	if (typeof source === "object")
		return JSON.stringify(source)
	return "" + source
}