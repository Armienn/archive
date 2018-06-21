/** Returns either the parameter itself, or if it is a function, then the result of calling it */
export default function callOrReturn(thing) {
	return typeof thing === "function" ? thing() : thing
}

export function fitsFancy(thing, query) {
	if (query.startsWith(">")) {
		query = query.substr(1)
		if (!query.startsWith(">"))
			return thing > query
	}
	if (query.startsWith("<")) {
		query = query.substr(1)
		if (!query.startsWith("<"))
			return thing < query
	}
	if (query.startsWith("!")) {
		query = query.substr(1)
		if (!query.startsWith("!"))
			return !("" + thing).toLowerCase().includes(query)
	}
	return ("" + thing).toLowerCase().includes(query)
}

export function fitsNested(thing, query, forceLowerCase = true) {
	if (!query)
		return true
	if(forceLowerCase)
		query = query.toLowerCase()
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

function isBasicType(thing) {
	return typeof thing === "string" || typeof thing === "number" || typeof thing === "boolean"
}