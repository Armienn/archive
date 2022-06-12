"use strict"

const games = [
	{
		name: "Renderend",
		link: "renderend",
		description: "This is a small game inspired by the trench run from Star Wars",
		img: "",
	},
	{
		name: "Piong",
		link: "piong",
		description: "This is a clone of Pong I made waaay back. The code's not pretty, but the game is simple and playable",
		img: "",
	},
	{
		name: "Tern",
		link: "https://armienn.github.io/Tern",
		description: "This is actually a collection of games. I'll be remaking these individually, but until then I'll keep this link here. I made it to try out Kotlin, and while I like the language, I no longer like the code I wrote!",
		img: "",
	},
]

function buildGames() {
	return /* html */`
<h2>Games</h2>
<p class="aber">These are various games I've made. Many of them are clones of other games, but there are some original ones as well</p>
<ol class="cards">
${games.map(toGameEntry).join("")}
</ol>`
}

function toGameEntry(info) {
	return /* html */`
<li><a href="${info.link}">
	<h3>${info.name}</h3>
	<p>${info.description}</p>
	${getImg(info.img)}
</a></li>`
}

function getImg(url) {
	return url ? `<img src="${url}"/>` : ""
}

if (!pages)
	var pages = {}
pages["games"] = buildGames()