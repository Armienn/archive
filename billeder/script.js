"use strict"

const images = []
let grid

window.onload = () => {
	grid = document.getElementById("grid")
	createFileInput()
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
	image.addEventListener("click", function () {
		if (image.style.position !== "fixed") {
			image.style.position = "fixed"
			image.style.height = "unset"
			image.style.left = "calc(50% - " + image.naturalWidth / 2 + "px)"
			image.style.top = "41px"
		} else {
			image.style.position = ""
			image.style.height = ""
			image.style.left = ""
			image.style.top = ""
		}
	})
	grid.appendChild(image)
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
