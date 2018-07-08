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

export function toJSON(collection, fields) {
	var lines = []
	for (let entry of collection) {
		let thisEntry = {}
		for (let key in fields)
			thisEntry[fields[key].title] = fields[key].dataFor(entry)
		lines.push(JSON.stringify(thisEntry))
	}
	return "[\n" + lines.join(",\n") + "\n]"
}

export function fromJSON(data) {
	return JSON.parse(data)
}

export function detectJSON(data) {
	return data[0] == "[" && data[data.length - 1] == "]"
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

export function fromXSV(data, separator) {
	var rows = data.trim().split("\n")
	var table = []
	for (let i in rows)
		table.push(rows[i].split(separator).map(e => e.trim()))
	var collection = []
	for (var i = 1; i < table.length; i++) {
		var entry = {}
		collection.push(entry)
		for (var j in table[0])
			entry[table[0][j]] = table[i][j]
	}
	return collection
}

export function detectXSV(data, lines, separator) {
	if (lines.length < 2)
		return false
	for (var line of lines)
		if (!line.includes(separator))
			return false
	return true
}

export function toMarkdown(collection, fields) {
	if (!collection.length)
		return ""
	var sub = []
	for (let key in fields)
		sub.push("-".repeat(fields[key].title.length))
	return toXSV(collection, fields, "|").replace("\n", "\n" + sub.join("|") + "\n")
}

export function fromMarkdown(data) {
	// regex to remove the ---|---|--- line if it exists
	return this.fromXSV(data.replace(/\n\s*[-:|]+\s*\n/, "\n"), "|")
}
