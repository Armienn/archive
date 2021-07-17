"use strict"

const cardText = {
	types: {
		structure: "Struktur",
		creature: "Væsen",
		action: "Handling",
		passive: "Aktiv Effekt",
		active: "Passiv Effekt",
		meta: "Meta Effekt",
		category: "Kategori",
	},
}

const cards = {
	rules: [],
	structure: [],
	creature: [],
	action: [],
	passive: [],
	active: [],
	meta: [],
	category: [],
}

const inputs = {}

let currentCardType = "Regler"

window.onload = () => {
	const grid = document.getElementById("grid")
	for (const section in cards)
		newCardSection(section)

	const buttons = document.getElementById("buttons")
	buttons.appendChild(newButton("show all defined", () => showCards()))

	buttons.appendChild(newButton("clear localStorage", () => {
		for (const type in cards)
			delete localStorage["korttingCards2" + type]
	}))

	for (const key in inputs)
		grid.appendChild(inputs[key])

	showCards()

	/*fetch("cards.json").then(response => {
		cards = response.json().map(x => new Card(x))
		element.value = "cards = " + JSON.stringify(cards, null, "\t")
	})
	.catch(()=> {
		console.log("oh no")
	})*/
}

function newCardSection(type) {
	const element = newElement("textarea.hidden")
	inputs[type] = element
	element.value = localStorage["korttingCards2" + type] || defaultCards[type]
	element.onchange = () => {
		localStorage["korttingCards2" + type] = element.value
		parseCards()
		showCards(cards[type])
	}
	const buttons = document.getElementById("buttons")
	buttons.appendChild(newSwitchButton(type, type, () => cards[type]))
}

function newSwitchButton(text, input, cardsToShow) {
	return newButton(text, () => {
		hideInputs()
		inputs[input].className = ""
		parseCards()
		showCards(cardsToShow())
	})
}

function hideInputs() {
	for (const key in inputs)
		inputs[key].className = "hidden"
}

function newButton(text, click) {
	const button = newElement("button")
	button.textContent = text
	button.onclick = click
	return button
}

function showCards(cardsToShow) {
	if (!cardsToShow)
		parseCards()
	const element = document.getElementById("cards")
	element.innerHTML = ""
	if (cardsToShow)
		for (const card of cardsToShow)
			element.appendChild(createCard(card))
	else for (const key in cards)
		for (const card of cards[key])
			element.appendChild(createCard(card))
}

function parseCards() {
	for (const type in cards) {
		currentCardType = cardText.types[type]
		const asdf = eval(inputs[type].value) || []
		cards[type] = asdf.map(x => new Card(x))
	}
}

function createCard(card) {
	const container = newElement("div.card")
	const type = newElement("div.type")
	const title = newElement("div.title")
	const text = newElement("div.text")
	const icon = newElement("div.icon")
	type.textContent = card.type
	title.textContent = card.title
	text.textContent = card.text
	icon.textContent = card.icon
	container.appendChild(type)
	container.appendChild(title)
	container.appendChild(text)
	container.appendChild(icon)
	container.onclick = () => clickCard(card)
	return container
}

function newElement(definition) {
	const parts = definition.split(/([.#])/)
	const tag = parts.shift()
	const element = document.createElement(tag)
	const classes = []
	for (let i = 0; i < parts.length; i += 2) {
		if (parts[i] == "#")
			element.id = parts[i + 1]
		else if (parts[i] == ".")
			classes.push(parts[i + 1])
	}
	element.className = classes.join(", ")
	return element
}

function clickCard(card) {
	console.log(card)
}

class Card {
	constructor({
		type = currentCardType,
		title = "Unavngivet",
		text = "",
		icon = "X",
	}) {
		this.type = type
		this.title = title
		this.text = text
		this.icon = icon
	}
}

function ruleCard(type, text) {
	return new Card({
		type: "Regelkort",
		title: type,
		text: text,
	})
}
