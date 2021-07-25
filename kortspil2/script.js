"use strict"

const config = {
	cardTypes: {
		"Regler": { type: "Regel", image: "" },
		"Strukturer": { type: "Struktur", image: "cards/tårn.jpg" },
		"Væsener": { type: "Væsen", image: "cards/soldat.jpg" },
		"Handlinger": { type: "Handling", image: "cards/pilesalve.jpg" },
		"Effekter": { type: "Effekt", image: "default.jpg" },
		"Egenskaber": { type: "Egenskab", image: "default.jpg" },
	}
}

let cards = {}
let currentCard = null
let currentCardGroup = null

function getElement(id) {
	return document.getElementById(id)
}

window.onload = () => {
	loadCards()
	setupCardGroups()
	showCurrentCards()
}

function loadCards() {
	const saved = localStorage["kortting2-cards"]
	cards = saved ? JSON.parse(saved) : defaultCards
}

function setupCardGroups() {
	getElement("buttons").innerHTML = ""
	getElement("buttons").appendChild(newButton("All cards", () => {
		getElement("add-card").className = "hidden"
		showCurrentCards()
	}))
	for (const cardType in config.cardTypes)
		addCardGroupButton(cardType)
}

function newButton(text, click) {
	const button = newElement("button")
	button.textContent = text
	button.onclick = click
	return button
}

function addCardGroupButton(type) {
	const button = newButton(type, () => {
		currentCardGroup = type
		hideInputs()
		getElement("add-card").className = ""
		showCurrentCards()
	})
	getElement("buttons").appendChild(button)
}

function change(field) {
	const value = getElement(field).value
	if (value)
		currentCard[field] = value
	else
		delete currentCard[field]
	saveCards()
	showCurrentCards()
}

function saveCards() {
	localStorage["kortting2-cards"] = JSON.stringify(cards)
}

function showCurrentCards() {
	const element = getElement("cards")
	element.innerHTML = ""
	if (currentCardGroup)
		for (const card of cards[currentCardGroup])
			element.appendChild(createCard(card, config.cardTypes[currentCardGroup]))
	else for (const group in cards)
		for (const card of cards[group])
			element.appendChild(createCard(card, config.cardTypes[group]))
}

function createCard(card, defaults = {}) {
	const container = newElement("div.card")
	addTextgetElement(card.title ?? defaults.title ?? "Unavngivet", "div.title", container)
	addTextgetElement(card.type ?? defaults.type ?? "", "div.type", container)
	addIcongetElement(card.icon ?? defaults.icon ?? "x", container)
	addImagegetElement(card.image ?? defaults.image ?? "", container)
	addMainTextgetElement(card.text ?? defaults.text ?? "", container) // this needs to be after image element for styling reasons
	container.onclick = () => clickCard(card)
	return container
}

function addTextgetElement(text, type, container) {
	const element = newElement(type)
	element.textContent = text
	container.appendChild(element)
}

function addIcongetElement(text, container) {
	const icon = getIconFor(text)
	if (!icon)
		return addTextgetElement(card.icon, "div.icon", container)
	const element = newElement("img.icon")
	element.src = icon
	container.appendChild(element)
}

function getIconFor(text) {
	return "cards/s-" + text + ".jpg"
}

function addImagegetElement(src, container) {
	if (!src)
		return
	const element = newElement("img.main")
	element.src = src
	container.appendChild(element)
}

function addMainTextgetElement(text, container) {
	const textContainer = newElement("div.text-container")
	container.appendChild(textContainer)
	if (text)
		addTextgetElement(text, "div.text", textContainer)
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
	if (card === currentCard)
		deselectCard()
	else
		selectCard(card)
}

function selectCard(card) {
	showInputs()
	currentCard = card
	getElement("icon").value = card.icon ?? ""
	getElement("title").value = card.title ?? ""
	getElement("type").value = card.type ?? ""
	getElement("text").value = card.text ?? ""
	getElement("image").value = card.image ?? ""
}

function deselectCard() {
	hideInputs()
	currentCard = null
}

function hideInputs() {
	setInputClass("hidden")
}

function showInputs() {
	setInputClass("")
}

function setInputClass(className) {
	getElement("icon").className = className
	getElement("title").className = className
	getElement("type").className = className
	getElement("text").className = className
	getElement("image").className = className
	getElement("remove-card").className = className
}

function addCardToCurrentGroup() {
	if (!currentCardGroup)
		return
	currentCard = {}
	clickCard(currentCard)
	cards[currentCardGroup].push(currentCard)
}

function removeCurrentCard() {
	for (const group in cards) {
		const index = cards[group].indexOf(currentCard)
		if (index >= 0) {
			cards[group].splice(index, 1)
			break
		}
	}
	saveCards()
	showCurrentCards()
}

function toggleConfig() {
	const element = getElement("config")
	element.value = JSON.stringify(config.cardTypes, null, "\t")
	element.className = element.className ? "" : "hidden"
}

function changeConfig() {

}


/*
window.onload = () => {
	const grid = document.getElementById("grid")
	for (const section in cards)
		addCardGroupButton(section)

	const buttons = document.getElementById("buttons")
	buttons.appendChild(newButton("show all defined", () => showCards()))

	buttons.appendChild(newButton("clear localStorage", () => {
		for (const type in cards)
			delete localStorage["korttingCards2" + type]
	}))

	for (const key in inputs)
		grid.appendChild(inputs[key])

	showCards()
}
*/
