function getEl(id) {
	return document.getElementById(id)
}

var lineSize = 3
var lineColor = "yellow"

var canvas = getEl("canvas")
var context = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.onresize = function () {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	draw()
}

function draw() {
	context.fillStyle = "black"
	context.fillRect(0, 0, canvas.width, canvas.height)
}

var mouseDown = false
window.onmousedown = function (event) {
	mouseDown = true
	context.beginPath()
	context.moveTo(event.x, event.y)
	context.lineTo(event.x, event.y)
	context.lineWidth = lineSize
	context.strokeStyle = lineColor
	context.lineCap = "round"
	context.stroke()
	//context.fillStyle = lineColor
	//context.fillRect(Math.floor(event.x-lineSize/2), Math.floor(event.y-lineSize/2), lineSize, lineSize)
	lastX = event.x
	lastY = event.y
}
window.onmouseup = function (event) {
	mouseDown = false
	lastX = -1
	lastY = -1
}

var lastX = -1
var lastY = -1
window.onmousemove = function (event) {
	if (mouseDown) {
		//context.fillStyle = lineColor
		//context.fillRect(Math.floor(event.x-lineSize/2), Math.floor(event.y-lineSize/2), lineSize, lineSize)
		if (lastX >= 0 && lastY >= 0) {
			context.beginPath()
			context.moveTo(lastX, lastY)
			context.lineTo(event.x, event.y)
			context.lineWidth = lineSize
			context.strokeStyle = lineColor
			context.lineCap = "round"
			context.stroke()
		}
		lastX = event.x
		lastY = event.y
	}
}

window.onmousewheel = (event) => {
	if (event.deltaY > 0)
		lineSize--
	else
		lineSize++
}

draw()