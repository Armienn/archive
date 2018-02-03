"use strict"

function randomFromList(list, weightFunction) {
	weightFunction = weightFunction || (() => 1)
	var weights = list.map(weightFunction)
	var sum = 0
	for (var i in weights)
		sum += weights[i]
	var randomNumber = Math.random() * sum
	sum = 0
	for (var i in weights) {
		sum += weights[i]
		if (randomNumber < sum)
			return list[i]
	}
	return list[list.lenght - 1]
}

class Sound {
	constructor(representation, point, manner, vocalisation, syllabic) {
		this.representation = representation
		this.point = point
		this.manner = manner
		this.vocalisation = vocalisation
		this.syllabic = syllabic
	}
}

class Language {
	constructor(sounds, weights) {
		this.sounds = sounds
		this.weights = weights
	}

	randomSyllable() {
		var vocals = this.sounds.filter(e => e.syllabic)
		var consonants = this.sounds.filter(e => !e.syllabic)
		var syllable = this.weightedRandomFrom(vocals, "nucleus")
		if (Math.random() < 0.5)
			syllable = this.weightedRandomFrom(consonants, "onset") + syllable
		if (Math.random() < 0.5)
			syllable += this.weightedRandomFrom(consonants, "coda")
		return syllable
	}

	randomWord(max, min) {
		max = max || 4
		min = min || 2
		var word = ""
		var syllables = Math.floor(Math.random() * (max + 1 - min)) + min
		for (var i = 0; i < syllables; i++)
			word += this.randomSyllable()
		return word
	}

	weightedRandomFrom(list, placement) {
		placement = placement || "any"
		return randomFromList(list, (e) => {
			var modifier = 1
			for (var i in this.weights)
				if (this.weightFits(this.weights[i], e, placement))
					modifier *= this.weights[i].weight
			return modifier
		}).representation
	}

	weightFits(weight, sound, placement) {
		if (weight.placement != placement && weight.placement != "any" && placement != "any")
			return false
		for (var i in weight.selection) {
			if (sound[i] != weight.selection[i])
				return false
		}
		return true
	}
}

var language = new Language(
	[
		new Sound("p", "labial", "stop", "voiced", false),
		new Sound("b", "labial", "stop", "unvoiced", false),
		new Sound("t", "alveolar", "stop", "voiced", false),
		new Sound("d", "alveolar", "stop", "unvoiced", false),
		new Sound("k", "velar", "stop", "voiced", false),
		new Sound("g", "velar", "stop", "unvoiced", false),
		new Sound("v", "labiodental", "fricative", "voiced", false),
		new Sound("f", "labiodental", "fricative", "unvoiced", false),
		new Sound("s", "alveolar", "fricative", "voiced", false),
		new Sound("z", "alveolar", "fricative", "unvoiced", false),
		new Sound("ð", "alveolar", "fricative", "voiced", false),
		new Sound("þ", "alveolar", "fricative", "unvoiced", false),
		new Sound("x", "velar", "fricative", "voiced", false),
		new Sound("h", "velar", "fricative", "unvoiced", false),
		new Sound("m", "labial", "nasal", "voiced", false),
		new Sound("n", "alveolar", "nasal", "voiced", false),
		new Sound("ŋ", "velar", "nasal", "voiced", false),
		new Sound("r", "velar", "trill", "voiced", false),
		new Sound("i", "alveolar", "close", "voiced", true),
		new Sound("e", "alveolar", "mid", "voiced", true),
		new Sound("a", "palatal", "open", "voiced", true),
		new Sound("o", "velar", "close", "voiced", true),
		new Sound("u", "velar", "mid", "voiced", true),
	], [
		{ placement: "any", selection: { representation: "a" }, weight: 4 },
		{ placement: "any", selection: { representation: "e" }, weight: 2 },
		{ placement: "any", selection: { representation: "i" }, weight: 2 },
		{ placement: "any", selection: { manner: "nasal" }, weight: 2 },
		{ placement: "any", selection: { point: "alveolar", manner: "stop" }, weight: 3 },
		{ placement: "any", selection: { vocalisation: "unvoiced" }, weight: 2 },
		{ placement: "coda", selection: { point: "alveolar" }, weight: 0.3 },
		{ placement: "coda", selection: { point: "velar" }, weight: 0.3 }
	]
)
