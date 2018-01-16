"use strict"

var purchases = []

var people = {}
var things = {}
var categories = []


function extractData(purchases) {
	people = {}
	things = {}
	categories = []
	for (var i in purchases) {
		var purchase = purchases[i]
		addPerson(purchase.payer)
		for (var j in purchase.things) {
			var thing = purchase.things[j]
			addThing(thing.name)
			for (var n in thing.receivers) {
				addPerson(thing.receivers[n])
				people[thing.receivers[n]].received += thing.price / thing.receivers.length
			}
			people[purchase.payer].paid += thing.price
			things[thing.name].lastPrice = thing.price
			things[thing.name].lastCategory = thing.category
			addCategory(thing.category)
		}
	}
}

function addPerson(name) {
	if (!Object.keys(people).includes(name))
		people[name] = { paid: 0, received: 0 }
}

function addThing(name) {
	if (!Object.keys(things).includes(name))
		things[name] = { lastPrice: 0, lastCategory: "diverse" }
}

function addCategory(name) {
	if (!categories.includes(name))
		categories.push(name)
}

function showData() {
	var para = document.getElementById("top-paragraph")
	var text = ""
	for (var i in people) {
		var balance = people[i].paid - people[i].received
		if (balance < 0)
			text += i + " mangler at betale " + (-1 * balance).toFixed(2) + " | "
		else
			text += i + " har betalt " + balance.toFixed(2) + " for meget | "
	}
	para.innerHTML = text

	var payerSelect = document.getElementById("payerselect")
	payerSelect.innerHTML = ""
	newTag("option", payerSelect)
	var receiverSelect = document.getElementById("receiverselect")
	receiverSelect.innerHTML = ""
	newTag("option", receiverSelect)
	for (var i in people) {
		var option = newTag("option", payerSelect)
		option.value = i
		option.textContent = i
		option = newTag("option", receiverSelect)
		option.value = i
		option.textContent = i
	}

	var date = document.getElementById("date")
	var now = new Date()
	if (!date.value)
		date.value = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear()

	var thingSelect = document.getElementById("thingselect")
	thingSelect.innerHTML = ""
	var sortedThings = Object.keys(things).sort()
	newTag("option", thingSelect)
	for (var i in sortedThings) {
		var option = newTag("option", thingSelect)
		option.value = sortedThings[i]
		option.textContent = sortedThings[i]
	}

	var categorySelect = document.getElementById("categoryselect")
	categorySelect.innerHTML = ""
	newTag("option", categorySelect)
	for (var i in categories) {
		var option = newTag("option", categorySelect)
		option.value = categories[i]
		option.textContent = categories[i]
	}
}

function selectThing(thing) {
	var thingInput = document.getElementById("thing")
	var priceInput = document.getElementById("price")
	var categoryInput = document.getElementById("category")
	thingInput.value = thing
	priceInput.value = things[thing].lastPrice
	categoryInput.value = things[thing].lastCategory
}

function addEntry() {
	var payer = document.getElementById("payer").value
	var date = document.getElementById("date").value
	var purchase = { date: date, payer: payer, things: [] }
	var existing = purchases.filter(e => {
		return e.payer == payer && e.date == date
	})
	if (existing.length > 0)
		purchase = existing[0]
	else
		purchases.push(purchase)
	var thing = { name: document.getElementById("thing").value, price: +document.getElementById("price").value, category: document.getElementById("category").value, receivers: [] }
	thing.receivers = document.getElementById("receivers").value.split(", ")
	purchase.things.push(thing)

	extractData(purchases)
	showData()
}

function addBon(bon) {
	var payer = document.getElementById("payer").value
	var date = document.getElementById("date").value
	var purchase = { date: date, payer: payer, things: [] }
	var existing = purchases.filter(e => {
		return e.payer == payer && e.date == date
	})
	if (existing.length > 0)
		purchase = existing[0]
	else
		purchases.push(purchase)
	for (var i in bon.currentBon) {
		if (bon.currentBon[i].ignore)
			continue
		purchase.things.push({
			name: bon.currentBon[i].label,
			price: bon.currentBon[i].number,
			category: bon.currentBon[i].category || "Diverse",
			receivers: bon.currentBon[i].receivers || []
		})
	}

	extractData(purchases)
	showData()
}

function save() {
	var blob = new Blob([stringify(purchases, parser)], { type: "text/plain;charset=utf-8" });

	var a = document.createElement("a")
	a.download = "penge" + new Date().toISOString().split("T")[0] + ".json"
	a.href = URL.createObjectURL(blob)
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}

function requestJSON(url, callback) {
	request(url, function (response) {
		callback(JSON.parse(response))
	})
}

function request(url, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText)
	}
	xmlHttp.open("GET", url, true)
	xmlHttp.send()
}

function stringify(purchases, bon) {
	var text = "{\n\"ignore\":" + JSON.stringify(bon.ignore)
	text += ",\n\"labels\":" + JSON.stringify(bon.labels)
	text += ",\n\"purchases\":[\n"
	var temp
	for (var i in purchases) {
		temp = JSON.parse(JSON.stringify(purchases[i]))
		delete temp.things
		text += JSON.stringify(temp).slice(0, -1) + ", \"things\": [\n"
		for (var j in purchases[i].things) {
			text += "\t" + JSON.stringify(purchases[i].things[j]) + (j == purchases[i].things.length - 1 ? "]\n" : ",\n")
		}
		text += (i == purchases.length - 1 ? "}]\n" : "},\n")
	}
	return text += "\n}"
}

function parseOld(penge) {
	var purs = penge.split("}\n{")
	var purchases = []
	for (var i in purs) {
		purs[i] = purs[i].replace(/{/g, "").replace(/}/g, "").trim()
		purs[i] = purs[i].split("\n")
		for (var j in purs[i]) {
			purs[i][j] = purs[i][j].trim()
		}
		//console.log(JSON.stringify(purs[i]))
		var purchase = { date: purs[i][0].split(" ")[0], payer: purs[i][0].split(" ")[1], things: [] }
		for (var j = 1; j < purs[i].length; j++) {
			var thing = {}
			var bub
			for (var n = 0; n < purs[i][j].length; n++) {
				if (purs[i][j][n] == " ") {
					thing.price = +(purs[i][j].substr(0, n).replace(",", "."))
					bub = purs[i][j].substr(n)
					break
				}
			}
			bub = bub.split(";")
			thing.name = bub[0].trim()
			thing.category = bub[1].trim()
			thing.receivers = []
			for (var n = 2; n < bub.length; n++) {
				if (bub[n])
					thing.receivers.push(bub[n].trim())
			}
			purchase.things.push(thing)
		}
		purchases.push(purchase)
	}
}

function handleFiles(files) {
	parseFile(files[0])
}

function FileDragHover(e) {
	e.stopPropagation()
	e.preventDefault()
	e.target.className = (e.type == "dragover" ? "dragover" : "")
}
function FileSelectHandler(callback) {
	return (e) => {
		// cancel event and hover styling
		FileDragHover(e)
		var files = e.target.files || e.dataTransfer.files;
		callback(files[0])
	}
}

function parseFile(file) {
	document.getElementById("file-box").className = "loading"
	document.getElementById("file-loading").style.display = ""
	// http://tesseract.projectnaptha.com/
	Tesseract.recognize(file, {
		lang: 'dan'
	}).then((thing) => {
		document.getElementById("file-box").className = ""
		document.getElementById("file-loading").style.display = "none"
		parser.currentBon = []
		document.getElementById("bon").innerHTML = ""
		parser.parse(thing.text)
		parser.setupBonInterface(document.getElementById("bon"))
		//document.getElementById('blub').innerHTML = parser.currentBon.map(e => JSON.stringify(e)).join("\n")
	})
}

window.onload = () => {
	/*requestJSON("./penge.json", (response) => {
		purchases = response.purchases
		parser.ignore = response.ignore
		parser.labels = response.labels
		extractData(purchases)
		showData()
	})*/
	var filebox = document.getElementById("file-box")
	filebox.addEventListener("dragover", FileDragHover, false)
	filebox.addEventListener("dragleave", FileDragHover, false)
	filebox.addEventListener("drop", FileSelectHandler(parseFile), false)
	var databox = document.getElementById("data-box")
	databox.addEventListener("dragover", FileDragHover, false)
	databox.addEventListener("dragleave", FileDragHover, false)
	databox.addEventListener("drop", FileSelectHandler((file) => {
		document.getElementById("data-box").className = "loading"
		document.getElementById("data-loading").style.display = ""
		var reader = new FileReader()
		reader.onload = () => {
			document.getElementById("data-box").className = ""
			document.getElementById("data-box").style.display = "none"
			document.getElementById("data-loading").style.display = "none"
			document.getElementById("main").style.display = ""
			var response = JSON.parse(reader.result)
			purchases = response.purchases
			parser.ignore = response.ignore
			parser.labels = response.labels
			extractData(purchases)
			showData()
		}
		reader.readAsText(file)
	}), false)
}

class BonParser {
	constructor() {
		this.ignore = {}
		this.labels = {}
		this.currentBon = []
	}

	parse(text) {
		text = text.toLowerCase()
		var lines = text.split("\n")
		for (var i in lines)
			this.parseLine(lines[i])
	}

	parseLine(line) {
		if (!line)
			return
		if (this.ignore[line])
			return this.currentBon.push({ original: line, ignore: true })
		var lineSplit = this.splitLine(line)
		var thing = { original: line, ignore: false, ...lineSplit, receivers: [] }
		thing.label = this.labels[thing.text] || (thing.text ? thing.text[0].toUpperCase() + thing.text.substr(1) : "") || thing.original
		thing.category = things[thing.label] ? things[thing.label].lastCategory : undefined
		if (this.ignore[lineSplit.text])
			thing.ignore = true
		this.currentBon.push(thing)
	}

	splitLine(line) {
		var parts = line.split(" ")
		var isNumber = []
		var numbers = []
		for (var i = parts.length - 1; i >= 0; i--) {
			if (parts[i].replace(/[-.,0-9]/g, ""))
				isNumber[i] = false
			else {
				isNumber[i] = true
				if (!numbers.length)
					numbers.push(parts[i])
				else if (isNumber[i + 1])
					numbers.push(parts[i])
			}
		}
		var numberparts = 1
		var number = numbers[0]
		for (var i = 1; i < numbers.length; i++) {
			if (number.startsWith(",") || number.startsWith("."))
				number = numbers[i] + number
			else if (number.includes(",") || number.includes("."))
				break
			else
				number = numbers[i] + number
			numberparts++
		}
		if (!number)
			number = "0"
		var factor = number.includes("-") ? -1 : 1
		number = number.replace("-", "")
		return { number: factor * (+(number.replace(/,/g, "."))), text: parts.splice(0, parts.length - numberparts).join(" ") }
	}

	setupBonInterface(parent) {
		for (var i in this.currentBon)
			this.setupBonLine(this.currentBon[i], parent)
	}

	setupBonLine(line, parent) {
		var row = newTag("div", parent, { className: "row" })
		var labelElement = newTag("input", row, {
			type: "text", value: line.label, onchange: (e) => {
				line.label = e.target.value
				this.labels[line.text] = line.label
			}
		})
		var textElement = newTag("span", row, { text: line.original, style: { fontSize: "0.6rem", padding: "0.2rem" } })
		var numberElement = newTag("input", row, { type: "number", value: line.number, step: "any", onchange: (e) => { line.number = +e.target.value } })
		this.setupBonButton(line, row, labelElement, numberElement)
		for (var person in people)
			this.setupReceiverButton(line, row, person)
		this.setupCategorySelect(line, row)
	}

	setupBonButton(line, row, labelElement, numberElement) {
		const ignoreText = "use / <span style='font-weight: bold;'>ignore</span>"
		const useText = "<span style='font-weight: bold;'>use</span> / ignore"
		var ignoreElement = newTag("button", row, {
			type: "button", onclick: (e) => {
				line.ignore = !line.ignore
				if (line.ignore) {
					this.ignore[line.original] = true
					this.ignore[line.text] = true
				}
				else {
					delete this.ignore[line.original]
					delete this.ignore[line.text]
				}
				setLineState()
			}
		})
		var setLineState = () => {
			labelElement.disabled = line.ignore
			numberElement.disabled = line.ignore
			ignoreElement.innerHTML = line.ignore ? ignoreText : useText
		}
		setLineState()
	}

	setupReceiverButton(line, row, person) {
		var button = newTag("button", row, {
			type: "button", onclick: (e) => {
				var index = line.receivers.indexOf(person)
				if (index > -1)
					line.receivers.splice(index, 1)
				else
					line.receivers.push(person)
				setButtonText()
			}
		})

		var setButtonText = () => {
			button.innerHTML = line.receivers && line.receivers.includes(person) ? "<span style='font-weight: bold;'>" + person + "</span>" : person
		}
		setButtonText()
	}

	setupCategorySelect(line, row) {
		var categorySelect = newTag("select", row, {
			onchange: (e) => {
				line.category = e.target.value
			}
		})
		newTag("option", categorySelect)
		for (var i in categories) {
			var option = newTag("option", categorySelect)
			option.value = categories[i]
			option.textContent = categories[i]
		}
		categorySelect.value = line.category
	}
}

function newTag(tag, parentElement, options = {}) {
	var newElement = document.createElement(tag)
	if (parentElement) {
		if (options.first)
			parentElement.insertBefore(newElement, parentElement.firstChild)
		else
			parentElement.appendChild(newElement)
	}
	for (var style in options.style)
		newElement.style[style] = options.style[style]
	if (options.text)
		newElement.innerHTML = options.text
	delete options.text
	delete options.style
	delete options.first
	for (var i in options)
		newElement[i] = options[i]
	return newElement
}

var parser = new BonParser()
