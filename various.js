"use strict"

const various = [
	{
		name: "Pokémon Stuff",
		link: "https://armienn.github.io/pokemon",
		description: "This basically an advanced list of Pokémon. It's from 2018, so it's outdated by now, but it's still rather useful if you're playing a game from before gen 8",
	},
	{
		name: "Syllabic Numerals",
		link: "https://armienn.github.io/SyllabicNumerals",
		description: "This is a simple system I designed for making long numbers easier to remember",
	},
	{
		name: "Identifying Unique Names",
		link: "https://armienn.github.io/IdentifyingUniqueName",
		description: "This is a standard for personal ID's inspired by GUID's, and combined with Syllabic Numerals to be easy-ish to remember",
	},
]

const old = [
	{
		name: "Game of Life+",
		link: "game-of-life",
		description: "This is an implementation of Conway's Game of Life. It supports more than to states and allows you to change the basic rules",
	},
	{
		name: "Crypt",
		link: "crypt",
		description: "This is a small page for encrypting and decrypting text. I made it long ago and used it mainly for encrypting my passwords",
	},
	{
		name: "Draw",
		link: "draw",
		description: "A black page where you can draw yellow lines. Very useful.",
	},
	{
		name: "Voronoi",
		link: "voronoi",
		description: "I don't even remember why I made this. Voronoi regions are cool, I guess?",
	},
	{
		name: "Sokoban tester",
		link: "sokoban-tester",
		description: "I made this in order to easily test sokoban solutions. I think I made it when I was taking the AI course at university, but it may not have been until a few years later when my girlfriend did the same",
	},
	{
		name: "Helm",
		link: "https://armienn.github.io/helm",
		description: "This is a small project I made to familiarise myself with the Elm programming language",
	},
	{
		name: "Some Money Calculator",
		link: "money",
		description: "This is a utility that reads through a .json file filled with information about who's paid for what, and calculates what each person ultimately owes who.",
	},
]

function buildVarious() {
	return /* html */`
<h2>Various</h2>
<p class="aber">There are all kinds of stuff here. Some are websites, some are utilities, some are systems, and at the end there's a list of old experiments and what-not.</p>
<ol class="cards">
${various.map(toVariousEntry).join("")}
</ol>
<h2>Old Crap</h2>
<p class="aber">This is a list of old stuff I don't want you to look at.</p>
<ol class="cards">
${old.map(toVariousEntry).join("")}
</ol>`
}

function toVariousEntry(info) {
	return /* html */`
<li><a href="${info.link}">
	<h3>${info.name}</h3>
	<p>${info.description}</p>
</a></li>`
}

if (!pages)
	var pages = {}
pages["various"] = buildVarious()