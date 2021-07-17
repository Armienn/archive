"use strict"

const cardText = {
	types: {
		area: "Område",
		creature: "Væsen",
		artifact: "Struktur",
		spell: "Besværgelse",
		enchantment: "Fortryllelse",
	},
}

const cardParts = {
	triggerEffects: [],
	immediateEffects: [],
	permanentEffects: [],
	offBattleFieldEffects: [],
}

const cards = {
	rules: [],
	areas: [],
	creatures: [],
	artifacts: [],
	spells: [],
	enchantments: [],
}

let generatedCards = []
let useTypeAsTitle = false

const inputs = {}

window.onload = () => {
	const grid = document.getElementById("grid")
	newCardSection("rules")
	newCardSection("areas")
	newCardSection("creatures")
	newCardSection("artifacts")
	newCardSection("spells")
	newCardSection("enchantments")

	const buttons = document.getElementById("buttons")
	buttons.appendChild(newButton("show all defined", () => showCards()))

	newPartSection("triggerEffects")
	newPartSection("immediateEffects")
	newPartSection("permanentEffects")
	newPartSection("offBattleFieldEffects")

	buttons.appendChild(newButton("toggle card names", () => {
		useTypeAsTitle = !useTypeAsTitle
	}))

	buttons.appendChild(newButton("clear localStorage", () => {
		for (const type in cards)
			delete localStorage["korttingCards" + type]
		for (const type in cardParts)
			delete localStorage["korttingParts" + type]
	}))

	for (const key in inputs)
		grid.appendChild(inputs[key])

	generateCards()
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
	element.value = localStorage["korttingCards" + type] || defaultCards[type]
	element.onchange = () => {
		localStorage["korttingCards" + type] = element.value
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

function newPartSection(type) {
	const element = newElement("textarea.hidden")
	inputs[type] = element
	element.value = localStorage["korttingParts" + type] || defaultParts[type]
	element.onchange = () => {
		localStorage["korttingParts" + type] = element.value
		generateCards()
		showCards(generatedCards)
	}
	const buttons = document.getElementById("buttons")
	buttons.appendChild(newSwitchButton(type, type, () => generatedCards))
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
		const asdf = eval(inputs[type].value) || []
		cards[type] = asdf.map(x => new Card(x))
	}
}

function createCard(card) {
	const container = newElement("div.card")
	const type = newElement("div.type")
	const title = newElement("div.title")
	const text = newElement("div.text")
	const cost = newElement("div.cost")
	const strength = newElement("div.strength")
	type.textContent = useTypeAsTitle ? "" : card.type
	title.textContent = useTypeAsTitle ? card.type : card.title
	text.textContent = card.text
	cost.textContent = card.cost
	strength.textContent = card.strength
	container.appendChild(type)
	container.appendChild(title)
	container.appendChild(text)
	if (card.cost !== null && card.strength !== cost)
		container.appendChild(cost)
	if (card.strength !== null && card.strength !== undefined)
		container.appendChild(strength)
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
		type = "Besværgelse",
		title = "Unavngivet",
		text = "",
		cost = null,
		strength = null,
	}) {
		this.type = type
		this.title = title
		this.text = text
		this.cost = cost
		this.strength = strength
	}
}

function generateCards() {
	parseParts()
	generatedCards = [
		...cardParts.triggerEffects.flatMap(areasFromTriggerEffect),
		...plainCreatures(9),
		...cardParts.immediateEffects.flatMap(x => [
			areaFromImmediate(x),
			spellAreaFromImmediate(x),
			spellFromImmediate(x),
			enchantmentFromImmediate(x),
			artifactFromImmediate(x),
			creatureFromImmediate(x, 1),
			creatureFromImmediate(x, 2),
			creatureFromImmediate(x, 3),
			creatureFromImmediate(x, 4),
		]),
		...cardParts.permanentEffects.flatMap(x => [
			areaFromPermanent(x),
			spellAreaFromPermanent(x),
			spellFromPermanent(x),
			enchantmentFromPermanent(x),
			artifactFromPermanent(x),
			creatureFromPermanent(x, 1),
			creatureFromPermanent(x, 2),
			creatureFromPermanent(x, 3),
			creatureFromPermanent(x, 4),
		]),
		...cardParts.offBattleFieldEffects.flatMap(x => [
			areaFromPermanent(x),
			creatureFromPermanent(x, 1),
			creatureFromPermanent(x, 2),
			creatureFromPermanent(x, 3),
			creatureFromPermanent(x, 4),
		]),
	].filter(x => x)
}

function parseParts() {
	for (const type in defaultParts)
		cardParts[type] = eval(inputs[type].value) || []
}

function areasFromTriggerEffect(effect) {
	const effectTypes = ["Evner", "Indbyggede evner", "Tilføjede evner"]
	return effectTypes.map(x => new Card({
		type: cardText.types.area,
		title: "asdf",
		text: (effect.throne ? "Trone\n" : "") + x + " i området, som aktiveres via udmattelse, aktiveres i stedet " + effect.trigger
			+ (effect.cost ? "\n\nTing i området koster " + effect.cost + " energi mere." : ""),
	}))
}

function plainCreatures(maxSize) {
	const cards = []
	for (let i = 1; i <= maxSize; i++)
		cards.push(new Card({
			type: cardText.types.creature,
			title: "asdf",
			strength: i,
			cost: i,
		}))
	return cards
}

function areaFromImmediate(effect) {
	return new Card({
		type: cardText.types.area,
		title: "asdf",
		text: "Ting i området har \"Udmat: " + effect.text + "\", og koster " + effect.cost + " energi mere.",
	})
}

function areaFromPermanent(effect) {
	return new Card({
		type: cardText.types.area,
		title: "asdf",
		text: "Ting i området har " + effect.text + ", og koster " + effect.cost + " energi mere.",
	})
}

function spellAreaFromImmediate(effect) {
	return new Card({
		type: cardText.types.area,
		title: "asdf",
		text: "Ting i området har \"Når dette spilles, " + effect.text + "\", og koster " + effect.cost + " energi mere.",
	})
}

function spellAreaFromPermanent(effect) {
	return new Card({
		type: cardText.types.area,
		title: "asdf",
		text: "Ting i området har \"Når dette spilles, giv noget " + effect.text + " resten af turen\", og koster " + effect.cost + " energi mere.",
	})
}

function spellFromImmediate(effect) {
	return new Card({
		type: cardText.types.spell,
		title: "asdf",
		text: effect.text,
		cost: Math.abs(effect.cost),
	})
}

function spellFromPermanent(effect) {
	return new Card({
		type: cardText.types.spell,
		title: "asdf",
		text: "Giv noget " + effect.text + " resten af turen",
		cost: Math.abs(effect.cost),
	})
}

function enchantmentFromImmediate(effect) {
	return new Card({
		type: cardText.types.enchantment,
		title: "asdf",
		text: "Det fortryllede har \"Udmat: " + effect.text + "\"",
		cost: Math.abs(effect.cost),
	})
}

function enchantmentFromPermanent(effect) {
	return new Card({
		type: cardText.types.enchantment,
		title: "asdf",
		text: "Det fortryllede har " + effect.text,
		cost: Math.abs(effect.cost),
	})
}

function artifactFromImmediate(effect) {
	return new Card({
		type: cardText.types.artifact,
		title: "asdf",
		text: "Udmat: " + effect.text,
		cost: Math.abs(effect.cost * 2),
	})
}

function artifactFromPermanent(effect) {
	return new Card({
		type: cardText.types.artifact,
		title: "asdf",
		text: "Udmat: Giv et væsen " + effect.text + " resten af turen",
		cost: Math.abs(effect.cost * 2),
	})
}

function creatureFromImmediate(effect, strength) {
	if (effect.skipCreatures)
		return
	return new Card({
		type: cardText.types.creature,
		title: "asdf",
		text: "Udmat: " + effect.text,
		cost: strength + effect.cost,
		strength: strength
	})
}

function creatureFromPermanent(effect, strength) {
	if (effect.skipCreatures)
		return
	return new Card({
		type: cardText.types.creature,
		title: "asdf",
		text: effect.text,
		cost: strength + effect.cost,
		strength: strength
	})
}

function ruleCard(type, text) {
	return new Card({
		type: "Regelkort",
		title: type,
		text: text,
	})
}
