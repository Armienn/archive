"use strict"

var cards

window.onload = () => {

	const element = document.getElementById("input")
	element.value = localStorage.nyeSjoveKort || `cards = [	
new Card({
	type: "Område",
	title: "Dyster Skov",
text: "Væsner i dette område får +1 forsvar.\\nOmråder kan være i asdf-dækket, og kan spilles i en gruppe.",
	cost: 0,
	strength: null,
}),
new Card({
	type: "Væsen",
	title: "Drage",
	text: "Slår hårdt",
	cost: 3,
	strength: 2,
}),
new Card({
	type: "Fortryllelse",
	title: "Drage",
	text: "Slår hårdt",
	cost: 3,
	strength: 2,
}),
]`
	element.onchange = () => {
		eval(element.value)
		localStorage.nyeSjoveKort = element.value
		showCards()
	}

	eval(element.value)
	showCards()

	/*fetch("cards.json").then(response => {
		cards = response.json().map(x => new Card(x))
		element.value = "cards = " + JSON.stringify(cards, null, "\t")
	})
	.catch(()=> {
		console.log("oh no")
	})*/
}

function showCards() {
	const element = document.getElementById("cards")
	element.innerHTML = ""
	for (const card of cards)
		element.appendChild(createCard(card))
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
	container.appendChild(cost)
	if (card.strength !== null && card.strength !== undefined)
		container.appendChild(strength)
	return container
}

function newElement(definition) {
	const parts = definition.split(/([\.#])/)
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
		cost = 0,
		strength = null,
	}) {
		this.type = type
		this.title = title
		this.text = text
		this.cost = cost
		this.strength = strength
	}
}
