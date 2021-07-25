"use strict"

const cardText = {
	types: {
		structure: "Struktur",
		creature: "Væsen",
		action: "Handling",
		passive: "Effekt",
		category: "Egenskab",
	},
}

const cards = {
	rules: [],
	structure: [],
	creature: [],
	action: [],
	passive: [],
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
	buttons.appendChild(newSwitchButton(cardText.types[type] || type, type, () => cards[type]))
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
	addTextElement(card.type, "div.type", container)
	addTextElement(card.title, "div.title", container)
	addIconElement(card.icon, container)
	addImageElement(card.image, container)
	addMainTextElement(card.text, container) // this needs to be after image element for styling reasons
	container.onclick = () => clickCard(card)
	return container
}

function addTextElement(text, type, container) {
	const element = newElement(type)
	element.textContent = text
	container.appendChild(element)
}

function addIconElement(text, container) {
	const icon = getIconFor(text)
	if (!icon)
		return addTextElement(card.icon, "div.icon", container)
	const element = newElement("img.icon")
	element.src = icon
	container.appendChild(element)
}

function getIconFor(text) {
	return "cards/s-" + text + ".jpg"
}

function addImageElement(src, container) {
	if (!src)
		return
	const element = newElement("img.main")
	element.src = src
	container.appendChild(element)
}

function addMainTextElement(text, container) {
	const textContainer = newElement("div.text-container")
	container.appendChild(textContainer)
	if (text)
		addTextElement(text, "div.text", textContainer)
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
		image = "default.jpg",
	}) {
		this.type = type
		this.title = title
		this.text = text
		this.icon = icon
		this.image = image
	}
}

