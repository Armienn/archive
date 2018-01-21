"use strict"

class Vector {
	constructor(x = 0, y = 0) {
		this.x = x
		this.y = y
	}

	add(vector) {
		this.x += vector.x
		this.y += vector.y
		return this
	}

	multiply(factor) {
		this.x = this.x * factor
		this.y = this.y * factor
		return this
	}

	rotate(angle) {
		var x = this.x
		this.x = x * Math.cos(angle) - this.y * Math.sin(angle)
		this.y = x * Math.sin(angle) + this.y * Math.cos(angle)
		return this
	}

	lengthSquared() {
		return this.x * this.x + this.y * this.y
	}

	unitVector() {
		var length = this.length()
		if (length !== 0) {
			this.x = this.x / length
			this.y = this.y / length
		}
		return this
	}

	length() {
		if (this.x === 0 && this.y === 0)
			return 0
		return Math.sqrt(this.lengthSquared())
	}

	copy() {
		return new Vector(this.x, this.y)
	}

	clip(minX, minY, maxX, maxY, wrap = false) {
		this.x = clip(this.x, minX, maxX, wrap)
		this.y = clip(this.y, minY, maxY, wrap)
		return this
	}

	set(x, y) {
		this.x = x
		this.y = y
	}
}




function clip(value, min, max, wrap = false) {
	if (max <= min)
		throw "Error"
	if (!wrap) {
		if (value < min)
			value = min
		else if (max <= value)
			value = max
		return value
	}
	while (value < min)
		value += max - min
	while (max <= value)
		value -= max - min
	return value
}



function getCorners(midX, midY, width, height) {
	return {
		topRight: new Vector(midX + width / 2, midY - height / 2),
		bottomRight: new Vector(midX + width / 2, midY + height / 2),
		bottomLeft: new Vector(midX - width / 2, midY + height / 2),
		topLeft: new Vector(midX - width / 2, midY - height / 2)
	}
}

function pointIsWithin(point, corners) {
	return corners.topLeft.x <= point.x && point.x <= corners.bottomRight.x &&
		corners.topLeft.y <= point.y && point.y <= corners.bottomRight.y
}

function collides(boxA, boxB) {
	return pointIsWithin(boxA.topRight, boxB) || pointIsWithin(boxA.bottomRight, boxB) || pointIsWithin(boxA.bottomLeft, boxB) || pointIsWithin(boxA.topLeft, boxB)
}

