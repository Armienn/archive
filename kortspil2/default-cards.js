const defaultCards = {
	rules: `[
new Card({
	title: "Struktur",
	text: "Strukturer gør noget",
}),
new Card({
	title: "Væsen",
	text: "Væsner gør også noget",
}),
]`,
	structure: `[
new Card({
	title: "Hjem",
	type: "Hjem Struktur",
	text: "Udmat: Tilføj en kilde, hvis der er færre end 6 kilder.",
}),
new Card({
	title: "Koloni",
	type: "Hjem Struktur",
	text: "Udmat: Tilføj kilder indtil der er mindst 3.",
}),
new Card({
	title: "Universitet",
	type: "Hjem Struktur",
	text: "Udmat: Tilføj en dobbeltkilde, hvis der er færre end 3 kilder.",
}),
new Card({
	title: "Laputa",
	icon: "M.",
}),
new Card({
	title: "Hovedstaden",
	icon: "L.",
}),
new Card({
	title: "De Dødes By",
	icon: "D.",
}),
new Card({
	title: "Den Evige Morgens Tårn",
	icon: "M",
}),
new Card({
	title: "Barakkerne",
	icon: "L",
}),
new Card({
	title: "Kirkegård",
	icon: "D",
}),
new Card({
	title: "Kompasstenen",
	icon: "m",
}),
new Card({
	title: "Lund",
	icon: "l",
}),
new Card({
	title: "Gar, Metalørkenen",
	icon: "d",
}),
]`,
	creature: `[
new Card({
	title: "Drage",
	icon: "M.",
}),
new Card({
	title: "Troldmand",
	icon: "L.",
}),
new Card({
	title: "Lich",
	icon: "D.",
}),
new Card({
	title: "Fe",
	icon: "M",
}),
new Card({
	title: "Soldat",
	icon: "L",
}),
new Card({
	title: "Golem",
	icon: "D",
}),
new Card({
	title: "Elemental",
	icon: "m",
}),
new Card({
	title: "Elefant",
	icon: "l",
}),
new Card({
	title: "Zombie",
	icon: "d",
}),
]`,
	action: `[
new Card({
	title: "Magimissil",
	text: "Giv [Styrke] skade til et væsen.",
	icon: "M",
}),
new Card({
	title: "Magisk Meteor",
	text: "Giv [Styrke] skade til en struktur.",
	icon: "M",
}),
new Card({
	title: "Genoplivning",
	text: "Genopliv et væsen med op til en effekt med [Styrke] styrke.",
	icon: "M",
}),
new Card({
	title: "Udmattelse",
	text: "Udmat op til [Styrke] væsner eller strukturer.",
	icon: "M",
}),
new Card({
	title: "Annullér",
	type: "Fælde Handling",
	text: "Forhindr aktivering af et sæt på mindre end [Styrke] kort.",
	icon: "M",
}),
]`,
	passive: `[
new Card({
	title: "Feltudstyr",
	text: "Påvirkede får +1 Styrke",
	icon: "D",
}),
new Card({
	title: "Sværd",
	text: "Påvirkede får +2 Angreb",
	icon: "D",
}),
new Card({
	title: "Skjold",
	text: "Påvirkede får +2 Forsvar",
	icon: "D",
}),
new Card({
	title: "Falkeham",
	text: "Påvirkede bliver Flyvende",
	icon: "M",
}),
new Card({
	title: "Kampsans",
	text: "Påvirkede bliver Snild",
	icon: "L",
}),
]`,
	active: `[
new Card({
	title: "Pilesalve",
	text: "Aktivér: Giv 2 skade til et væsen.",
	icon: "D",
}),
new Card({
	title: "Katapultsalve",
	text: "Aktivér: Giv 2 skade til en struktur.",
	icon: "D",
}),
new Card({
	title: "Sensu-bønne",
	text: "Aktivér: Øg styrken på et væsen eller struktur med 1.",
	icon: "M",
}),
]`,
	meta: `[
new Card({
	title: "Gadgeteering",
	text: "Påvirkede effekter bliver Udstyr.",
}),
new Card({
	title: "asdf",
	text: "Påvirkede bliver instants.",
}),
]`,
	category: `[
new Card({
	title: "Magiske Væsner",
	text: "Effekter på denne påvirker alle magiske væsner.",
}),
new Card({
	title: "Magiske Strukturer",
	text: "Effekter på denne påvirker alle magiske strukturer.",
}),
new Card({
	title: "Magiske Effekter",
	text: "Meta Effekter på denne påvirker alle magiske effekter.",
}),
new Card({
	title: "Livlige Væsner",
	text: "Effekter på denne påvirker alle livlige væsner.",
}),
new Card({
	title: "Livlige Strukturer",
	text: "Effekter på denne påvirker alle livlige strukturer.",
}),
new Card({
	title: "Livlige Effekter",
	text: "Meta Effekter på denne påvirker alle livlige effekter.",
}),
new Card({
	title: "Livløse Væsner",
	text: "Effekter på denne påvirker alle livløse væsner.",
}),
new Card({
	title: "Livløse Strukturer",
	text: "Effekter på denne påvirker alle livløse strukturer.",
}),
new Card({
	title: "Livløse Effekter",
	text: "Meta Effekter på denne påvirker alle livløse effekter.",
}),
new Card({
	title: "Avancerede Væsner",
	text: "Effekter på denne påvirker alle avancerede væsner.",
}),
new Card({
	title: "Avancerede Strukturer",
	text: "Effekter på denne påvirker alle avancerede strukturer.",
}),
new Card({
	title: "Balancerede Væsner",
	text: "Effekter på denne påvirker alle balancerede væsner.",
}),
new Card({
	title: "Balancerede Strukturer",
	text: "Effekter på denne påvirker alle balancerede strukturer.",
}),
new Card({
	title: "Primitive Væsner",
	text: "Effekter på denne påvirker alle primitive væsner.",
}),
new Card({
	title: "Primitive Strukturer",
	text: "Effekter på denne påvirker alle primitive strukturer.",
}),
]`
}
