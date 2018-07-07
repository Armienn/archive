export function tableFrom(collection, fields) {
	var table = [[]]
	if (!collection.length)
		return table
	for (let key in fields)
		table[0].push(fields[key].title)
	for (let entry of collection) {
		let tableEntry = []
		table.push(tableEntry)
		for (let key in fields)
			tableEntry.push(fields[key].stringifiedDataFor(entry))
	}
	return table
}

export default function toJSON(collection, fields) {
	var lines = []
	for (let entry of collection) {
		let thisEntry = {}
		for (let key in fields)
			thisEntry[fields[key].title] = fields[key].dataFor(entry)
		lines.push(JSON.stringify(thisEntry))
	}
	return "[\n" + lines.join(",\n") + "\n]"
}

export function toXSV(collection, fields, separator) {
	var table = tableFrom(collection, fields)
	for (var i in table) {
		for (var j in table[i]) {
			var val = table[i][j]
			if (val === undefined || val === null)
				val = ""
			table[i][j] = ("" + val).replace(new RegExp(separator, "g"), "")
		}
		table[i] = table[i].join(separator)
	}
	table = table.join("\n")
	return table
}

export function toMarkdown(collection, fields) {
	if (!collection.length)
		return ""
	var sub = {}
	for (let key in fields)
		sub[key] = "-".repeat(fields[key].title.length)
	return toXSV([sub, ...collection], fields, "|")
}
