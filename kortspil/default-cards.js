const defaultCards = {
	rules: `[
	ruleCard("Område", "Områder gør noget"),
	ruleCard("Væsen", "Væsner gør også noget"),
]`,
	areas: `[
new Card({
	type: "Område",
	title: "asdf",
	text: "Evner i området, som aktiveres via udmattelse, aktiveres i stedet når deres kort kommer i spil.",
}),
new Card({
	type: "Område",
	title: "asdf",
	text: "Indbyggede evner i området, som aktiveres via udmattelse, aktiveres i stedet når deres kort kommer i spil.",
}),
new Card({
	type: "Område",
	title: "asdf",
	text: "Tilføjede evner i området, som aktiveres via udmattelse, aktiveres i stedet når deres kort kommer i spil.",
}),
new Card({
	type: "Område",
	title: "asdf",
	text: "Der kan kun være en permanent i dette område. Ting i området har noget voldsomt.",
}),
new Card({
	type: "Område",
	title: "asdf",
	text: "Der kan kun være en permanent i dette område. Indbyggede effekter i området aktiverer når denne side får liv.",
}),
new Card({
	type: "Område",
	title: "Dyster Skov",
	text: "Dette område giver +2 forsvar og øger priser med 1 energi.",
}),
new Card({
	type: "Område",
	title: "Valplads",
	text: "Det koster 1 energi ekstra at spille noget i dette område. Dette område giver +2 angreb.",
}),
new Card({
	type: "Område",
	title: "Frodig Lund",
	text: "Væsner i dette område har \"Tap: Få 1 energi\", og koster 1 energi ekstra.",
}),
new Card({
	type: "Område",
	title: "asdf",
	text: "Væsner i dette område har \"Tap: Giv 1 skade til et væsen eller en spiller.\", og koster 1 energi ekstra.",
}),
new Card({
	type: "Område",
	title: "Kæmpernes Land",
	text: "Væsner i dette område har dobbelt styrke, og koster dobbelt energi.",
}),
new Card({
	type: "Område",
	title: "asdf",
	text: "Væsner i dette område har Lifelink, og koster 1 energi ekstra.",
}),
new Card({
	type: "Område",
	title: "asdf",
	text: "Væsner i dette område har Deathtouch, og koster 2 energi ekstra.",
}),
]`,
	creatures: `[
new Card({
	type: "Væsen",
	title: "Soldat",
	cost: 1,
	strength: 1,
}),
new Card({
	type: "Væsen",
	title: "Soldat+",
	cost: 2,
	strength: 2,
}),
new Card({
	type: "Væsen",
	title: "Kaptajn",
	cost: 3,
	strength: 3,
}),
new Card({
	type: "Væsen",
	title: "General",
	cost: 4,
	strength: 4,
}),
new Card({
	type: "Væsen",
	title: "Helt",
	cost: 5,
	strength: 5,
}),
]`,
	spells: `[
new Card({
	type: "Besværgelse",
	title: "asdf",
	text: "Ødelæg en fortryllelse",
	cost: 2,
}),
new Card({
	type: "Besværgelse",
	title: "asdf",
	text: "Ødelæg en permanent",
	cost: 2,
}),
new Card({
	type: "Besværgelse",
	title: "Slynge",
	text: "Giv et væsen eller en spiller 1 skade",
	cost: 1,
}),
new Card({
	type: "Besværgelse",
	title: "Bue",
	text: "Giv et væsen eller en spiller 2 skade",
	cost: 2,
}),
new Card({
	type: "Besværgelse",
	title: "Noget bedre end en bue",
	text: "Giv et væsen eller en spiller 3 skade",
	cost: 3,
}),
new Card({
	type: "Besværgelse",
	title: "Ballista",
	text: "Giv et væsen eller en spiller 4 skade",
	cost: 4,
}),
new Card({
	type: "Besværgelse",
	title: "Super Ballista",
	text: "Giv et væsen eller en spiller 5 skade",
	cost: 5,
}),
new Card({
	type: "Besværgelse",
	title: "Avada Kedavra",
	text: "Giv et væsen 10 skade",
	cost: 5,
}),
]`,
	enchantments: `[
new Card({
	type: "Fortryllelse",
	title: "Lifelink",
	text: "asdf får Lifelink.\\n Når noget med Lifelink giver skade, giver det lige så meget liv til sin side.",
	cost: 1,
}),
new Card({
	type: "Fortryllelse",
	title: "Hast",
	text: "asdf får Hast.\\n Væsner med Hast kan tappes samme runde som det kommer i spil.",
	cost: 1,
}),
new Card({
	type: "Fortryllelse",
	title: "Plyndring",
	text: "asdf får Plyndring.\\n Væsner med Plyndring kan angribe et område.",
	cost: 1,
}),
new Card({
	type: "Fortryllelse",
	title: "Duelant",
	text: "asdf får Duelant.\\n Væsner med Duelant kan angribe et andet væsen.",
	cost: 1,
}),
new Card({
	type: "Fortryllelse",
	title: "Hærgen",
	text: "asdf får Hærgen.\\n Væsner med Hærgen kan angribe en permanent.",
	cost: 1,
}),
]`,
	artifacts: `[
new Card({
	type: "Permanent",
	title: "asdf",
	text: "Alle væsner i dette område får +1 styrke",
	cost: 3,
}),
new Card({
	type: "Permanent",
	title: "Ja det",
	text: "Alle væsner på denne side får +1 styrke",
	cost: 5,
}),
new Card({
	type: "Permanent",
	title: "Motor",
	text: "Tap: Få 1 energi",
	cost: 2,
}),
new Card({
	type: "Permanent",
	title: "asdf",
	text: "Slår hårdt",
	cost: 3,
}),
]`
}
