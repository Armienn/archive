/** Returns either the parameter itself, or if it is a function, then the result of calling it */
export default function callOrReturn(thing) {
	return typeof thing === "function" ? thing() : thing
}

export function fitsFancy(thing, query) {
	switch (query.type) {
		case "greater": return thing > query.query
		case "less": return thing < query.query
		case "not":
		case "normal":
		default: return ("" + thing).toLowerCase().includes(query.query)
	}
}

export function fitsNested(thing, query) {
	if (!query)
		return true
	if (typeof query === "string") {
		for (let q of parseQuery(query))
			if (q.type == "not" ? !fitsNested(thing, q) : fitsNested(thing, q))
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

function parseQuery(query) {
	query = query.toLowerCase()
	// split at single |, then merge || to |
	return query.split(/(?<!\|)\|(?!\|)/g).map(e => e.replace(/\|\|/g, "|").trim())
		.map(e => {
			var q = { query: e.trim(), type: "normal" }
			if (e.startsWith(">")) {
				q.query = e.substr(1)
				if (!q.query.startsWith(">")) {
					q.type = "greater"
					q.query = +q.query
				}
			}
			if (e.startsWith("<")) {
				q.query = e.substr(1)
				if (!q.query.startsWith("<")) {
					q.type = "less"
					q.query = +q.query
				}
			}
			if (e.startsWith("!")) {
				q.query = e.substr(1)
				if (!q.query.startsWith("!"))
					q.type = "not"
			}
			return q
		})
}

function isBasicType(thing) {
	return typeof thing === "string" || typeof thing === "number" || typeof thing === "boolean"
}
