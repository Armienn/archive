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
	type: "Struktur - Hjem",
	text: "Udmat: Tilføj en kilde, hvis der er færre end 6 kilder.",
	image: "cards/hjem.jpg",
}),
new Card({
	title: "Koloni",
	type: "Struktur - Hjem",
	text: "Udmat: Tilføj kilder indtil der er mindst 3.",
}),
new Card({
	title: "Universitet",
	type: "Struktur - Hjem",
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
	image: "cards/barakker.jpg",
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
	title: "Engel",
	icon: "M.",
}),
new Card({
	title: "Troldmand",
	icon: "L.",
}),
new Card({
	title: "Høj-Elver",
	icon: "L.",
}),
new Card({
	title: "Lich",
	icon: "D.",
}),
new Card({
	title: "Vampyr",
	icon: "D.",
}),
new Card({
	title: "Fe",
	icon: "M",
}),
new Card({
	title: "Kelpie",
	icon: "M",
}),
new Card({
	title: "Soldat",
	icon: "L",
	image: "cards/soldat.jpg",
}),
new Card({
	title: "Havfrue",
	icon: "L",
}),
new Card({
	title: "Golem",
	icon: "D",
}),
new Card({
	title: "Spider Construct",
	icon: "D",
}),
new Card({
	title: "Elemental",
	icon: "m",
}),
new Card({
	title: "Djævel",
	icon: "m",
}),
new Card({
	title: "Elefant",
	icon: "l",
	image: "cards/elefant.jpg",
}),
new Card({
	title: "Tiger",
	icon: "l",
}),
new Card({
	title: "Zombie",
	icon: "d",
}),
new Card({
	title: "Poltergeist",
	icon: "d",
}),
]`,
	action: `[
new Card({
	title: "Magimissil",
	text: "Giv (S) skade til et væsen.",
	icon: "M",
}),
new Card({
	title: "Hærgen",
	text: "Giv (S) skade til et væsen.",
	icon: "L",
}),
new Card({
	title: "Pletskud",
	text: "Giv (S) skade til et væsen.",
	icon: "D",
}),
new Card({
	title: "Magisk Meteor",
	text: "Giv (S) skade til en struktur.",
	icon: "M",
	image: "cards/meteor.jpg",
}),
new Card({
	title: "Plyndring",
	text: "Giv (S) skade til en struktur.",
	icon: "L",
}),
new Card({
	title: "Katapultering",
	text: "Giv (S) skade til en struktur.",
	icon: "D",
}),
new Card({
	title: "Genoplivning",
	text: "Tag et væsen og op til en effekt fra kirkegården og læg det i spil sammen med (S) styrke.",
	icon: "M",
}),
new Card({
	title: "Medicin",
	text: "Tag et væsen og op til en effekt fra kirkegården og læg det i spil sammen med (S) styrke.",
	icon: "L",
}),
new Card({
	title: "Frankensteins Procedure",
	text: "Tag et væsen og op til en effekt fra kirkegården og læg det i spil sammen med (S) styrke.",
	icon: "D",
}),
new Card({
	title: "M Udmattelse",
	text: "Udmat op til (S) væsner eller strukturer.",
	icon: "M",
}),
new Card({
	title: "L Udmattelse",
	text: "Udmat op til (S) væsner eller strukturer.",
	icon: "L",
}),
new Card({
	title: "D Udmattelse",
	text: "Udmat op til (S) væsner eller strukturer.",
	icon: "D",
}),
new Card({
	title: "M Genopbygning",
	text: "Øg et hjems liv med 2 * (S).",
	icon: "M",
}),
new Card({
	title: "L Genopbygning",
	text: "Øg et hjems liv med 2 * (S).",
	icon: "L",
}),
new Card({
	title: "D Genopbygning",
	text: "Øg et hjems liv med 2 * (S).",
	icon: "D",
}),
new Card({
	title: "M Power Surge",
	text: "Giv et væsen eller struktur + 2 * (S) styrke indtil slutningen af turen.",
	icon: "M",
}),
new Card({
	title: "L Power Surge",
	text: "Giv et væsen eller struktur + 2 * (S) styrke indtil slutningen af turen.",
	icon: "L",
}),
new Card({
	title: "D Power Surge",
	text: "Giv et væsen eller struktur + 2 * (S) styrke indtil slutningen af turen.",
	icon: "D",
}),
new Card({
	title: "M Annullér",
	type: "Handling - Fælde",
	text: "Forhindr aktivering af et sæt på mindre end (S) kort.",
	icon: "M",
}),
new Card({
	title: "L Annullér",
	type: "Handling - Fælde",
	text: "Forhindr aktivering af et sæt på mindre end (S) kort.",
	icon: "L",
}),
new Card({
	title: "D Annullér",
	type: "Handling - Fælde",
	text: "Forhindr aktivering af et sæt på mindre end (S) kort.",
	icon: "D",
}),
]`,
	passive: `[
new Card({
	title: "M Feltudstyr",
	text: "Påvirkede får +1 Styrke",
	icon: "M",
}),
new Card({
	title: "L Feltudstyr",
	text: "Påvirkede får +1 Styrke",
	icon: "L",
}),
new Card({
	title: "Feltudstyr",
	text: "Påvirkede får +1 Styrke",
	icon: "D",
}),
new Card({
	title: "M Sværd",
	text: "Påvirkede får +2 Angreb",
	icon: "M",
}),
new Card({
	title: "L Sværd",
	text: "Påvirkede får +2 Angreb",
	icon: "L",
}),
new Card({
	title: "Sværd",
	text: "Påvirkede får +2 Angreb",
	icon: "D",
}),
new Card({
	title: "M Skjold",
	text: "Påvirkede får +2 Forsvar",
	icon: "M",
}),
new Card({
	title: "L Skjold",
	text: "Påvirkede får +2 Forsvar",
	icon: "L",
}),
new Card({
	title: "Skjold",
	text: "Påvirkede får +2 Forsvar",
	icon: "D",
}),
new Card({
	title: "M Falkeham",
	text: "Påvirkede bliver Flyvende",
	icon: "M",
	image: "cards/falkeham.jpg",
}),
new Card({
	title: "Falkeham",
	text: "Påvirkede bliver Flyvende",
	icon: "L",
	image: "cards/falkeham.jpg",
}),
new Card({
	title: "D Falkeham",
	text: "Påvirkede bliver Flyvende",
	icon: "D",
	image: "cards/falkeham.jpg",
}),
new Card({
	title: "M Kampsans",
	text: "Påvirkede bliver Snild",
	icon: "M",
}),
new Card({
	title: "Kampsans",
	text: "Påvirkede bliver Snild",
	icon: "L",
}),
new Card({
	title: "D Kampsans",
	text: "Påvirkede bliver Snild",
	icon: "D",
}),
new Card({
	title: "M Øjeblikkelighed",
	text: "Påvirkede får Flash",
	icon: "M",
}),
new Card({
	title: "Øjeblikkelighed",
	text: "Påvirkede får Flash",
	icon: "L",
}),
new Card({
	title: "D Øjeblikkelighed",
	text: "Påvirkede får Flash",
	icon: "D",
}),
]`,
	active: `[
new Card({
	title: "M Pilesalve",
	text: "Aktivér: Giv 2 skade til et væsen.",
	icon: "M",
	image: "cards/pilesalve.jpg",
}),
new Card({
	title: "L Pilesalve",
	text: "Aktivér: Giv 2 skade til et væsen.",
	icon: "L",
	image: "cards/pilesalve.jpg",
}),
new Card({
	title: "Pilesalve",
	text: "Aktivér: Giv 2 skade til et væsen.",
	icon: "D",
	image: "cards/pilesalve.jpg",
}),
new Card({
	title: "M Katapultsalve",
	text: "Aktivér: Giv 2 skade til en struktur.",
	icon: "M",
}),
new Card({
	title: "L Katapultsalve",
	text: "Aktivér: Giv 2 skade til en struktur.",
	icon: "L",
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
new Card({
	title: "L Sensu-bønne",
	text: "Aktivér: Øg styrken på et væsen eller struktur med 1.",
	icon: "L",
}),
new Card({
	title: "D Sensu-bønne",
	text: "Aktivér: Øg styrken på et væsen eller struktur med 1.",
	icon: "D",
}),
new Card({
	title: "Magikilde",
	text: "Aktivér: Øg en kilde med 1.",
	icon: "M",
}),
new Card({
	title: "Livskilde",
	text: "Aktivér: Øg en kilde med 1.",
	icon: "L",
}),
new Card({
	title: "Energikilde",
	text: "Aktivér: Øg en kilde med 1.",
	icon: "D",
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
	title: "Livlige Væsner",
	text: "Effekter på denne påvirker alle livlige væsner.",
}),
new Card({
	title: "Livlige Strukturer",
	text: "Effekter på denne påvirker alle livlige strukturer.",
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
new Card({
	title: "Magiskes Egenskab",
	type: "Egenskab - Lukket",
	text: "Effekter, som ikke trækker kort, aktiveres ikke normalt af Magiske væsner og strukturer, men i stedet når du trækker et kort.",
}),
new Card({
	title: "Livliges Egenskab",
	type: "Egenskab - Lukket",
	text: "Effekter, som ikke giver liv, aktiveres ikke normalt af Livlige væsner og strukturer, men i stedet når dit hjem får liv.",
}),
new Card({
	title: "Livløses Egenskab",
	type: "Egenskab - Lukket",
	text: "Effekter, som ikke giver skade, aktiveres ikke normalt af Livløse væsner og strukturer, men i stedet når dit hjem tager skade.",
}),
new Card({
	title: "Avanceredes Egenskab",
	type: "Egenskab - Lukket",
	text: "Prisen på avancerede væsner og strukturer ignorerer den første effekt.",
}),
new Card({
	title: "Balanceredes Egenskab",
	type: "Egenskab - Lukket",
	text: "Balancerede væsner og strukturer forlader startzonen med det samme.",
}),
new Card({
	title: "Primitives Egenskab",
	type: "Egenskab - Lukket",
	text: "Primitive væsner og strukturer øger deres Styrke med 1, når de forlader startzonen.",
}),
new Card({
	title: "Fortryllelsesting",
	type: "Kategori - Lukket",
	text: "Magiske Effekter kan ikke tilføjes normalt, men til eksisterende væsner eller strukturer for (2)",
}),
new Card({
	title: "Kulturting",
	type: "Kategori - Lukket",
	text: "Livlige Effekter kan ikke tilføjes normalt, men spilles som et separat kort for (4), og har \\"Denne effekt påvirker alle dine væsner og strukturer.\\"",
}),
new Card({
	title: "Udstyrsting",
	type: "Kategori - Lukket",
	text: "Livløse Effekter kan ikke tilføjes normalt, men spilles som et separat kort for (2), og har \\"(1): Tilføj til et væsen eller struktur.\\"",
}),
]`
}
