"use strict"

class Game {
	constructor() {
		this.settings = {
			gridSizeX: 100,
			gridSizeY: 100,
		}
		this.state = {
			buildings: [],
			terrain: []
		}

		this.setupMap()
	}

	setupMap() {
		this.state.terrain = []
		for (var i = 0; i < this.settings.gridSizeX; i++) {
			this.state.terrain.push([])
			for (var j = 0; j < this.settings.gridSizeY; j++) {
				this.state.terrain[i][j] = this.generateTerrain(i, j)
			}
		}
	}

	generateTerrain(x, y) {
		return "grass"
	}

	addBuilding(building, x, y) {
		building.forCell((i, j) => {
			if (!this.state.buildings[i])
				this.state.buildings[i] = []
			this.state.buildings[i][j] = building
		}, x, y)
		building.setPosition(x, y)
	}

	getBuilding(x, y) {
		if (!this.state.buildings[i])
			return
		return this.state.buildings[i][j]
	}

	removeBuilding(building) {
		building.forCell((i, j) => {
			if (!this.state.buildings[i])
				return
			delete this.state.buildings[i][j]
		})
	}
}

var game = new Game()

class BuildingType {
	constructor() {
		this.name = "proto"
		this.setupSimpleCells(1, 1)
	}

	setupSimpleCells(width, height) {
		this.cells = []
		for (var i = 0; i < width; i++)
			for (var j = 0; j < height; j++)
				this.cells.push({ x: i, y: j })
	}
}

class BuildingEntity {
	constructor(base) {
		this.base = base
		this.x = 0
		this.y = 0
	}

	forCell(callback, i, j) {
		if (i === undefined)
			i = x
		if (j === undefined)
			j = y
		for (var n in this.base.cells) {
			callback(this.base.cells[n].x + i, this.base.cells[n].y + j)
		}
	}

	setPosition(x, y) {
		this.x = x
		this.y = y
	}
}
