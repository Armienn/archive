/** Returns either the parameter itself, or if it is a function, then the result of calling it */
export default function callOrReturn(thing) {
	return typeof thing === "function" ? thing() : thing
}

export function fitsFancy(thing, query) {
	switch (query.type) {
		case ">": return thing > query.query
		case "<": return thing < query.query
		case "!":
		case "":
		default: return ("" + thing).toLowerCase().includes(query.query)
	}
}

export function fitsNested(thing, query) {
	if (!query)
		return true
	if (typeof query === "string") {
		const parsed = parseQuery(query)
		for (let q of parsed)
			if (q.type == "!" ? !fitsNested(thing, q) : fitsNested(thing, q))
				return true
		if (parsed.length == 0)
			return true
		return false
	}
	thing = callOrReturn(thing)
	if (thing == null)
		return false
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
	// split at single |, then merge || to |
	return query.split(/(?<!\|)\|(?!\|)/g).map(e => e.replace(/\|\|/g, "|").trim())
		.map(e => {
			var q = { query: e.trim(), type: "" }
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
			return q
		})
		.filter(e => e.query)
}

function isBasicType(thing) {
	return typeof thing === "string" || typeof thing === "number" || typeof thing === "boolean"
}

export function compareFit(a, b, query) {
	return 0
}
