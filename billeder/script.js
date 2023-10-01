"use strict"

const images = []
let grid
let imageHeight = 300

window.onload = () => {
	grid = document.getElementById("grid")
	createFileInput()
	createRangeInput()
	showImages()
}

function createFileInput() {
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
	for (const url of images) {
		URL.revokeObjectURL(url)
	}
	images.splice(0, images.length)
	grid.innerHTML = ""
}

function showImages() {
	for (const url of images) {
		createImage(url)
	}
}

function createImage(url) {
	const image = newElement("img")
	image.src = url
	image.className = "grid-image"
	image.style.height = imageHeight + "px"
	image.addEventListener("click", function () {
		if (image.className === "grid-image") {
			image.className = "center-image"
			image.style.height = ""
			image.style.left = "calc(50% - " + image.naturalWidth / 2 + "px)"
		} else {
			image.className = "grid-image"
			image.style.height = imageHeight + "px"
			image.style.left = ""
		}
	})
	grid.appendChild(image)
}

function createRangeInput() {
	const input = newElement("input")
	input.type = "range"
	input.min = 0
	input.max = 1000
	input.step = 50
	input.value = 300
	input.addEventListener("input", changeSize)
	document.getElementById("top-bar").appendChild(input)
}

function changeSize(event) {
	imageHeight = +event.target.value
	if (imageHeight < 300)
		imageHeight = imageHeight * 0.5 + 150
	for (const image of document.getElementsByClassName("grid-image"))
		image.style.height = imageHeight + "px"
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
