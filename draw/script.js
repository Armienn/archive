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


var touches = {}
function handleStart(event) {
	event.preventDefault()
	touches[event.pointerId] = event
	context.beginPath()
	context.moveTo(event.pageX, event.pageY)
	context.lineTo(event.pageX, event.pageY)
	context.lineWidth = lineSize
	context.strokeStyle = lineColor
	context.lineCap = "round"
	context.stroke()
}

function handleMove(event) {
	event.preventDefault()
	if (!touches[event.pointerId])
		return
	context.beginPath()
	context.moveTo(touches[event.pointerId].pageX, touches[event.pointerId].pageY)
	context.lineTo(event.pageX, event.pageY)
	context.lineWidth = lineSize
	context.strokeStyle = lineColor
	context.lineCap = "round"
	context.stroke()

	touches[event.pointerId] = event
}

function handleEnd(event) {
	event.preventDefault()
	if (touches[event.pointerId])
		delete touches[event.pointerId]
}

function handleCancel(event) {
	event.preventDefault()
	if (touches[event.pointerId])
		delete touches[event.pointerId]
}

window.onmousewheel = (event) => {
	if (event.deltaY > 0)
		lineSize--
	else
		lineSize++
}

addEventListener("pointerdown", handleStart, { passive: false })
addEventListener("pointermove", handleMove, { passive: false })
addEventListener("pointerup", handleEnd, { passive: false })
addEventListener("pointercancel", handleCancel, { passive: false })

// catch up, firefox!
addEventListener("mousedown", (e) => { e.pointerId = "mouse"; handleStart(e) }, { passive: false })
addEventListener("mousemove", (e) => { e.pointerId = "mouse"; handleMove(e) }, { passive: false })
addEventListener("mouseup", (e) => { e.pointerId = "mouse"; handleEnd(e) }, { passive: false })

draw()