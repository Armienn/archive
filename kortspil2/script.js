"use strict"

let cardTypes = { "Regler": {} }
let cards = { "Regler": [] }
let currentCard = null
let currentCardType = null

function getElement(id) {
	return document.getElementById(id)
}

window.onload = () => {
	loadCards()
	setupCardGroups()
	showCurrentCards()
}

function loadCards() {
	const saved = localStorage["cardSetup"]
	const setup = saved ? JSON.parse(saved) : defaultSetup
	cardTypes = setup.cardTypes
	cards = setup.cards
}

function setupCardGroups() {
	getElement("buttons").innerHTML = ""
	getElement("buttons").appendChild(newButton("All cards", () => {
		getElement("add-card").className = "hidden"
		currentCardType = null
		showCurrentCards()
	}))
	for (const cardType in cardTypes)
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
		currentCardType = type
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
	localStorage["cardSetup"] = JSON.stringify({ cardTypes, cards })
}

function showCurrentCards() {
	const element = getElement("cards")
	element.innerHTML = ""
	if (currentCardType)
		for (const card of cards[currentCardType])
			element.appendChild(createCard(card, cardTypes[currentCardType]))
	else for (const group in cards)
		for (const card of cards[group])
			element.appendChild(createCard(card, cardTypes[group]))
}

function createCard(card, defaults = {}) {
	const container = newElement("div.card")
	addTextElement(card.title ?? defaults.title ?? "Unavngivet", "div.title", container)
	addTextElement(card.type ?? defaults.type ?? "", "div.type", container)
	addIconElement(card.icon ?? defaults.icon ?? "x", container)
	addImageElement(card.image ?? defaults.image ?? "", container)
	addMainTextElement(card.text ?? defaults.text ?? "", container) // this needs to be after image element for styling reasons
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
	if (!currentCardType)
		return
	clickCard({})
	cards[currentCardType].push(currentCard)
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
	element.value = JSON.stringify({ cardTypes, cards }, null, "\t")
	element.className = element.className ? "" : "hidden"
}

function changeConfig() {
	const value = getElement("config").value
	if (value)
		localStorage["cardSetup"] = JSON.stringify(JSON.parse(value))
	else
		delete localStorage["cardSetup"]
	loadCards()
	showCurrentCards()
}
