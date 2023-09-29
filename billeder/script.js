"use strict"

const images = []
let grid

window.onload = () => {
	grid = document.getElementById("grid")
	createInput()
	showImages()
}

function createInput() {
	const input = newElement("input")
	input.type = "file"
	input.webkitdirectory = true
	input.addEventListener("change", loadFiles)
	document.getElementById("top-bar").appendChild(input)
}

function loadFiles(event) {
	clearImages()
	const files = event.target.files
	for (let file of files) {
		if (file.type.startsWith("image")) {
			const url = URL.createObjectURL(file)
			images.push(url)
		}
	}
	showImages()
}

function clearImages() {
	for(const url of images){
		URL.revokeObjectURL(url)
	}
	images.splice(0, images.length)
	grid.innerHTML = ""
}

function showImages() {
	let index = 0
	while (index < images.length) {
		const image = newElement("img")
		image.src = images[index]
		grid.appendChild(image)

		index = index + 1
	}
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
