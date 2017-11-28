function getEl(id) {
	return document.getElementById(id)
}

var canvas = getEl("canvas")
var context = canvas.getContext("2d")

canvasContainer = document.getElementById("canvas-container")

canvas.width = canvasContainer.offsetWidth
canvas.height = canvasContainer.offsetHeight

window.onresize = function () {
	canvas.width = canvasContainer.offsetWidth
	canvas.height = canvasContainer.offsetHeight
	autosize()
}

/*window.onmousedown = function (event) {
	var coordX = Math.floor(event.x / display.cellSize)
	var coordY = Math.floor(event.y / display.cellSize)
	if (coordX < game.width && coordY < game.height) {
		game.grid[coordX][coordY]++
		//game.markUpdateGrid(coordX, coordY, true)
		if (game.factions < game.grid[coordX][coordY])
			game.grid[coordX][coordY] = 0
	}
	display.drawBoard()
}*/

class Game {
	constructor(options = {}) {
		this.parseBoard(options.board || "6 3 1\nXXXXXX\nXMJ.GX\nXXXXXX")
	}

	parseBoard(boardText) {
		this.width = 0
		this.height = 0
		this.board = []
		this.position = { x: 1, y: 1 }
		this.direction = "n"
		this.diamonds = []

		var lines = boardText.split("\n")
		this.width = +lines[0].split(" ")[0]
		this.height = +lines[0].split(" ")[1]
		//this.diamonds = +lines[0].split(" ")[2]
		this.direction = lines[0].split(" ")[3] || "n"
		this.direction = this.direction.toLowerCase()

		for (var i = 0; i < this.width; i++)
			this.board[i] = []

		for (var i = 1; i < lines.length && i < this.height + 1; i++)
			for (var j = 0; j < this.width; j++)
				this.parseCell(j, i - 1, lines[i][j])
	}

	parseCell(x, y, cell) {
		this.board[x][y] = "x"
		if (!cell)
			return
		cell = cell.toLowerCase()
		switch (cell) {
			case "g": this.board[x][y] = "g"; return
			case ".": this.board[x][y] = ""; return
			case "j":
				this.board[x][y] = ""
				this.diamonds.push({ x: x, y: y })
				return
			case "m":
				this.board[x][y] = ""
				this.position = { x: x, y: y }
				return
		}
	}

	move(direction) {
		direction = direction.toLowerCase()
		switch (direction) {
			case "f": this.moveForward(); break
			case "b": break
			case "r": this.turnRight(); break
			case "l": this.turnLeft(); break
			case "n":
			case "e":
			case "s":
			case "v":
				;
				break
		}
	}



	moveForward() {
		var newx = this.position.x
		var newy = this.position.y
		var diax = this.position.x
		var diay = this.position.y
		switch (this.direction) {
			case "n": newy--; diay = newy - 1; break
			case "e": newx++; diax = newx + 1; break
			case "s": newy++; diay = newy + 1; break
			case "w": newx--; diax = newx - 1; break
		}

		if (this.board[newx][newy] == "x")
			return false
		var dia = this.diamonds.filter(e => e.x == newx && e.y == newy)[0]
		if (dia) {
			if (this.board[diax][diay] == "x")
				return false
			else if (this.diamonds.filter(e => e.x == diax && e.y == diay)[0])
				return false
			else {
				dia.x = diax
				dia.y = diay
				this.position.x = newx
				this.position.y = newy
				return true
			}
		}
		this.position.x = newx
		this.position.y = newy
		return true
	}

	turnLeft() {
		switch (this.direction) {
			case "n": this.direction = "w"; break
			case "e": this.direction = "n"; break
			case "s": this.direction = "e"; break
			case "w": this.direction = "s"; break
		}
	}

	turnRight() {
		switch (this.direction) {
			case "n": this.direction = "e"; break
			case "e": this.direction = "s"; break
			case "s": this.direction = "w"; break
			case "w": this.direction = "n"; break
		}
	}

	forAdjacent(x, y, callback) {
		for (var i = x - 1; i <= x + 1; i++)
			for (var j = y - 1; j <= y + 1; j++) {
				if (i == x && j == y)
					continue
				if (i < 0 || j < 0 || this.width <= i || this.height <= j) {
					callback("x")
				}
				else
					callback(this.board[i][j])
			}
	}

	start(interval = 1000, path, callback) {
		this.path = path
		if (this.intervalId)
			clearInterval(this.intervalId)
		this.progress = 0
		this.intervalId = setInterval(() => {
			if (this.progress >= path.length)
				return this.stop()
			this.move(path[this.progress])
			this.progress++
			callback()
		}, interval)
	}

	stop() {
		clearInterval(this.intervalId)
		this.intervalId = undefined
	}

	step(path) {
		this.path = path
		if (!this.progress)
			this.progress = 0
		if (this.progress >= this.path.length)
			return
		this.move(this.path[this.progress])
		this.progress++
	}

	getBoard(x, y) {
		if (this.position.x == x && this.position.y == y)
			return "player"
		if (this.diamonds.filter(e => e.x == x && e.y == y).length)
			return "diamond"
		return this.board[x][y]
	}
}

class GameDisplay {
	constructor(game, options = {}) {
		this.game = game
		this.cellSize = options.cellSize || 20
	}

	drawBoard() {
		context.fillStyle = "black"
		context.fillRect(0, 0, canvas.width, canvas.height)
		var colours = {
			x: "black", default: "white", g: "grey", diamond: "green", player: (c, i, j) => {
				c.fillStyle = "yellow"
				context.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize)
				c.fillStyle = "black"
				switch (game.direction) {
					case "n": context.fillRect(i * this.cellSize + this.cellSize/4, j * this.cellSize, this.cellSize/2, this.cellSize/2); break
					case "e": context.fillRect(i * this.cellSize + this.cellSize/2, j * this.cellSize + this.cellSize/4, this.cellSize/2, this.cellSize/2); break
					case "s": context.fillRect(i * this.cellSize + this.cellSize/4, j * this.cellSize + this.cellSize/2, this.cellSize/2, this.cellSize/2); break
					case "w": context.fillRect(i * this.cellSize, j * this.cellSize + this.cellSize/4, this.cellSize/2, this.cellSize/2); break
				}
			}
		}
		for (var i = 0; i < this.game.width; i++) {
			for (var j = 0; j < this.game.height; j++) {
				var style = colours[this.game.getBoard(i, j)] || colours.default
				if (typeof style === "string") {
					context.fillStyle = style
					context.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize)
				}
				else {
					style(context, i, j)
				}
			}
		}
	}
}

function reset() {
	game.stop()
	game = new Game({ board: getEl("map").value })
	display = new GameDisplay(game)
	autosize()
}

function autosize() {
	var width = canvas.width / game.width
	var height = canvas.height / game.height
	display.cellSize = Math.floor(Math.min(width, height))
	display.drawBoard()
}

function run() {
	var interval = +getEl("interval").value
	game.start(interval, getEl("path").value, () => { display.drawBoard() })
}

var game = new Game({ board: getEl("map").value })
var display = new GameDisplay(game)

window.onload = () => {
	autosize()
	display.drawBoard()
}