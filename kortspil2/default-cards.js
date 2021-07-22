const defaultCards = {
	rules: `[]`,
	structure: `[
new Card({
	title: "Hjem",
	type: "Struktur - Hjem",
	text: "Udmat: Tilføj to kilder, hvis der er færre end 6.",
	image: "cards/hjem.jpg",
}),
new Card({
	title: "Koloni",
	type: "Struktur - Hjem",
	text: "Udmat: Tilføj kilder indtil der er mindst 4.",
	image: "cards/koloni.jpg",
}),
new Card({
	title: "Universitet",
	type: "Struktur - Hjem",
	text: "Udmat: Tilføj en dobbeltkilde, hvis der er færre end 3.",
	image: "cards/universitet.jpg",
}),
new Card({
	title: "Himmelby",
	icon: "M.",
	image: "cards/svæveby.jpg",
}),
new Card({
	title: "Dværgeværksted",
	icon: "L.",
	image: "cards/dværgeværksted.jpg",
}),
new Card({
	title: "Nekropolis",
	icon: "D.",
	image: "cards/nekropolis.jpg",
}),
new Card({
	title: "Morgentårn",
	icon: "M",
	image: "cards/morgentårn.jpg",
}),
new Card({
	title: "Barakkerne",
	icon: "L",
	image: "cards/barakker.jpg",
}),
new Card({
	title: "Kirkegård",
	icon: "D",
	image: "cards/kirkegård.jpg",
}),
new Card({
	title: "Kompasstenen",
	icon: "m",
	image: "cards/kompassten.jpg",
}),
new Card({
	title: "Lund",
	icon: "l",
	image: "cards/skov.jpg",
}),
new Card({
	title: "Kratermine",
	icon: "d",
	image: "cards/krater.jpg",
}),
]`,
	creature: `[
new Card({
	title: "Drage",
	icon: "M.",
	image: "cards/drage.jpg",
}),
new Card({
	title: "Troldmand",
	icon: "M.",
	image: "cards/troldmand.jpg",
}),
new Card({
	title: "Engel/Dværg?",
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
	image: "cards/havfrue.jpg",
}),
new Card({
	title: "Golem",
	icon: "D",
	image: "cards/golem.jpg",
}),
new Card({
	title: "Spider Construct",
	icon: "D",
}),
new Card({
	title: "Lue",
	icon: "m",
	image: "cards/lue.jpg",
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
	image: "cards/tiger.jpg",
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
	image: "cards/magimissil.jpg",
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
	image: "cards/pletskud.jpg",
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
	image: "cards/katapult.jpg",
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
	text: "Forhindr aktivering af et sæt på mindre end (S) kort.",
	icon: "M",
}),
new Card({
	title: "L Annullér",
	text: "Forhindr aktivering af et sæt på mindre end (S) kort.",
	icon: "L",
}),
new Card({
	title: "D Annullér",
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
	image: "cards/feltudstyr.jpg",
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
	image: "cards/sværd.jpg",
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
	image: "cards/skjold.jpg",
}),
new Card({
	title: "M Falkeham",
	text: "Påvirkede bliver Flyvende",
	icon: "M",
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
]`,
	active: `[
new Card({
	title: "M Pilesalve",
	text: "Aktivér: Giv 2 skade til et væsen.",
	icon: "M",
}),
new Card({
	title: "L Pilesalve",
	text: "Aktivér: Giv 2 skade til et væsen.",
	icon: "L",
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
	text: "Livlige Effekter kan ikke tilføjes normalt, men spilles som et separat kort for (5), og har \\"Denne effekt påvirker alle dine væsner og strukturer.\\"",
}),
new Card({
	title: "Udstyrsting",
	type: "Kategori - Lukket",
	text: "Livløse Effekter kan ikke tilføjes normalt, men spilles som et separat kort for (2), og har \\"(1): Tilføj til et væsen eller struktur.\\"",
}),
]`
}
