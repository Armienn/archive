"use strict"

const cardParts = {
	types: {
		area: "Område",
		creature: "Væsen",
		artifact: "Struktur",
		spell: "Besværgelse",
		enchantment: "Fortryllelse",
	},
	immediateEffects: [],
	permanentEffects: [],
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
	buttons.appendChild(newButton("show defined", () => showCards()))
	buttons.appendChild(newButton("show generated", () => showCards(generatedCards)))

	newPartSection("immediateEffects")
	newPartSection("permanentEffects")

	for (const key in inputs)
		grid.appendChild(inputs[key])

	generateCardsOrWhatever()
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
	element.value = localStorage.korttingCards?.[type] || defaultCards[type]
	element.onchange = () => {
		localStorage.korttingCards[type] = element.value
		showCards()
	}
	const buttons = document.getElementById("buttons")
	buttons.appendChild(newSwitchButton(type, type))
}

function newSwitchButton(text, input) {
	return newButton(text, () => {
		hideInputs()
		inputs[input].className = ""
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
	element.value = localStorage.korttingParts?.[type] || defaultParts[type]
	element.onchange = () => {
		localStorage.korttingParts[type] = element.value
		generateCardsOrWhatever()
		showCards(generatedCards)
	}
	const buttons = document.getElementById("buttons")
	buttons.appendChild(newSwitchButton(type, type))
}

function showCards(cardsToShow) {
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
	type.textContent = card.type
	title.textContent = card.title
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

function generateCardsOrWhatever() {
	parseParts()
	generatedCards = [
		...cardParts.immediateEffects.map(spellFromImmediate),
		...cardParts.permanentEffects.map(spellFromPermanent),
	]
}

function parseParts() {
	for (const type in defaultParts)
		cardParts[type] = eval(inputs[type].value) || []
}

function spellFromImmediate(effect) {
	return new Card({
		type: cardParts.types.spell,
		title: "asdf",
		text: effect.text,
		cost: effect.cost,
	})
}

function spellFromPermanent(effect) {
	return new Card({
		type: cardParts.types.spell,
		title: "asdf",
		text: effect.text,
		cost: effect.cost,
	})
}

function ruleCard(type, text) {
	return new Card({
		type: "Regelkort",
		title: type,
		text: text,
	})
}

const defaultCards = {
	rules: `[
	ruleCard("Område", "Områder gør noget"),
	ruleCard("Væsen", "Væsner gør også noget"),
]`,
	areas: `[
new Card({
	type: "Område",
	title: "Dyster Skov",
	text: "Dette område giver +2 forsvar og øger priser med 1 energi.",
}),
new Card({
	type: "Område",
	title: "Valplads",
	text: "Det koster 1 energi ekstra at spille noget i dette område. Dette område giver +2 angreb.",
}),
new Card({
	type: "Område",
	title: "Frodig Lund",
	text: "Væsner i dette område har \\"Tap: Få 1 energi\\", og koster 1 energi ekstra.",
}),
new Card({
	type: "Område",
	title: "asdf",
	text: "Væsner i dette område har \\"Tap: Giv 1 skade til et væsen eller en spiller.\\", og koster 1 energi ekstra.",
}),
new Card({
	type: "Område",
	title: "Kæmpernes Land",
	text: "Væsner i dette område har dobbelt styrke, og koster dobbelt energi.",
}),
new Card({
	type: "Område",
	title: "asdf",
	text: "Væsner i dette område har Lifelink, og koster 1 energi ekstra.",
}),
new Card({
	type: "Område",
	title: "asdf",
	text: "Væsner i dette område har Deathtouch, og koster 2 energi ekstra.",
}),
]`,
	creatures: `[
new Card({
	type: "Væsen",
	title: "Soldat",
	cost: 1,
	strength: 1,
}),
new Card({
	type: "Væsen",
	title: "Soldat+",
	cost: 2,
	strength: 2,
}),
new Card({
	type: "Væsen",
	title: "Kaptajn",
	cost: 3,
	strength: 3,
}),
new Card({
	type: "Væsen",
	title: "General",
	cost: 4,
	strength: 4,
}),
new Card({
	type: "Væsen",
	title: "Helt",
	cost: 5,
	strength: 5,
}),
]`,
	spells: `[
new Card({
	type: "Besværgelse",
	title: "asdf",
	text: "Ødelæg en fortryllelse",
	cost: 2,
}),
new Card({
	type: "Besværgelse",
	title: "asdf",
	text: "Ødelæg en permanent",
	cost: 2,
}),
new Card({
	type: "Besværgelse",
	title: "Slynge",
	text: "Giv et væsen eller en spiller 1 skade",
	cost: 1,
}),
new Card({
	type: "Besværgelse",
	title: "Bue",
	text: "Giv et væsen eller en spiller 2 skade",
	cost: 2,
}),
new Card({
	type: "Besværgelse",
	title: "Noget bedre end en bue",
	text: "Giv et væsen eller en spiller 3 skade",
	cost: 3,
}),
new Card({
	type: "Besværgelse",
	title: "Ballista",
	text: "Giv et væsen eller en spiller 4 skade",
	cost: 4,
}),
new Card({
	type: "Besværgelse",
	title: "Super Ballista",
	text: "Giv et væsen eller en spiller 5 skade",
	cost: 5,
}),
new Card({
	type: "Besværgelse",
	title: "Avada Kedavra",
	text: "Giv et væsen 10 skade",
	cost: 5,
}),
]`,
	enchantments: `[
new Card({
	type: "Fortryllelse",
	title: "Lifelink",
	text: "asdf får Lifelink.\\n Når noget med Lifelink giver skade, giver det lige så meget liv til sin side.",
	cost: 1,
}),
new Card({
	type: "Fortryllelse",
	title: "Hast",
	text: "asdf får Hast.\\n Væsner med Hast kan tappes samme runde som det kommer i spil.",
	cost: 1,
}),
new Card({
	type: "Fortryllelse",
	title: "Plyndring",
	text: "asdf får Plyndring.\\n Væsner med Plyndring kan angribe et område.",
	cost: 1,
}),
new Card({
	type: "Fortryllelse",
	title: "Duelant",
	text: "asdf får Duelant.\\n Væsner med Duelant kan angribe et andet væsen.",
	cost: 1,
}),
new Card({
	type: "Fortryllelse",
	title: "Hærgen",
	text: "asdf får Hærgen.\\n Væsner med Hærgen kan angribe en permanent.",
	cost: 1,
}),
]`,
	artifacts: `[
new Card({
	type: "Permanent",
	title: "asdf",
	text: "Alle væsner i dette område får +1 styrke",
	cost: 3,
}),
new Card({
	type: "Permanent",
	title: "Ja det",
	text: "Alle væsner på denne side får +1 styrke",
	cost: 5,
}),
new Card({
	type: "Permanent",
	title: "Motor",
	text: "Tap: Få 1 energi",
	cost: 2,
}),
new Card({
	type: "Permanent",
	title: "asdf",
	text: "Slår hårdt",
	cost: 3,
}),
]`
}

const defaultParts = {
	immediateEffects: `[
{
	text: "Giv 1 skade til et væsen eller en spiller.",
	cost: 1,
},
{
	text: "Giv 2 skade til et væsen eller en spiller.",
	cost: 2,
},
{
	text: "Giv 3 skade til et væsen eller en spiller.",
	cost: 3,
},
{
	text: "Giv 4 skade til et væsen eller en spiller.",
	cost: 4,
},
{
	text: "Giv 5 skade til et væsen eller en spiller.",
	cost: 5,
},
{
	text: "Giv 10 skade til et væsen.",
	cost: 5,
},
{
	text: "Få 1 energi",
	cost: 1,
},
]`,
	permanentEffects: `[
{
	type: "lifelink",
	text: "asdf har Lifelink.\\nNår noget med Lifelink giver skade, giver det lige så meget liv til sin side.",
	cost: 1,
},
]`,
}

