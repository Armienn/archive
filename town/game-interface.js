"use strict"

class GameInterface {
	constructor() {
		this.settings = {
			updateInterval: 20,
			boardWidth: 1,
			boardHeight: 1,
		}
		this.state = {
			x: 0,
			y: 0
		}
		this.game
		this.canvas
		this.context
		this.sizeChanged = true
		this.lastStateUpdate = new Date()
	}

	draw() {
		if (!this.canvas)
			return console.error("no canvas")
		if (!this.game)
			return console.error("no game")
		if (this.sizeChanged) {
			this.sizeChanged = false
			this.canvas.width = window.innerWidth
			this.canvas.height = window.innerHeight
			/*var horisontalRatio = this.canvas.width / this.settings.boardWidth
			var verticalRatio = this.canvas.height / this.settings.boardHeight
			if (horisontalRatio < verticalRatio) {
				scale = horisontalRatio
				horisontalOffset = 0
				verticalOffset = (this.canvas.height - this.settings.boardHeight * scale) / 2
			}
			else {
				scale = verticalRatio
				verticalOffset = 0
				horisontalOffset = (this.canvas.width - this.settings.boardWidth * scale) / 2
			}*/
		}
		this.context.fillStyle = "black"
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.context.save()
		//this.context.translate(horisontalOffset, verticalOffset)
		var delta = (new Date().getTime() - this.lastStateUpdate.getTime()) / this.settings.updateInterval
		for (var i in this.game.state.buildings)
			for (var j in this.game.state.buildings[i])
				this.drawObject(this.game.state.buildings[i][j], delta)
		this.context.restore()
		requestAnimationFrame(() => gameInterface.draw())
	}

	drawObject(thing, delta) {
		this.context.save()
		this.context.fillStyle = "white"
		this.context.translate(Math.floor(thing.x*20), Math.floor(thing.y*20))
		this.context.fillRect(-10, -10, 20, 20)
		/*var vector = thing.velocity.copy().multiply(delta).add(thing.position).multiply(scale)
		this.context.translate(Math.floor(vector.x), Math.floor(vector.y))
		this.context.rotate(thing.rotation + thing.rotationalVelocity * delta)
		this.context.scale(scale, scale)
		thing.draw(this.context)*/
		this.context.restore()
	}
}

var gameInterface = new GameInterface()

window.onload = () => {
	gameInterface.canvas = document.getElementById("canvas")
	gameInterface.context = canvas.getContext("2d")
	gameInterface.game = game

	window.onresize = function () { gameInterface.sizeChanged = true }


	//
	// initialise()
	// setInterval(updateState, gameSettings.updateInterval)
	//

	requestAnimationFrame(() => gameInterface.draw())
}

/*
function updateState() {
	updatePositions(gameState.objects)
	gameLogic()
	updatePhysics([]) // gameState.objects)
	lastStateUpdate = new Date()
}*/
