const defaultCards = {
	rules: `[
new Card({
	title: "Runde",
	type: "Regler",
	text: "En runde består de følgende faser:\\nOpfriskning - Udmattede kort opfriskes, og kilder øges.\\nKorttræk - Læg et valgfrit antal kort fra hånden ned i bunden af dækket, og træk 1 kort mere end der blev lagt ned.",
	image: "",
}),
new Card({
	title: "Opsætning",
	type: "Regler",
	text: "",
	image: "",
}),
new Card({
	title: "Væsen",
	type: "Grundkort",
	text: "Væsner bliver i hjemmet indtil slutningen af turen.\\n\\nUdmat: Aktivér påvirkende handlinger, og angrib en modstander.",
	image: "",
}),
new Card({
	title: "Struktur",
	type: "Grundkort",
	text: "Strukturer bliver i hjemmet indtil slutningen af turen. Effekter på denne påvirker alle dine væsner af samme type.\\n\\nUdmat: Aktivér en påvirkende handling, eller øg en kilde med 1.",
	image: "",
}),
new Card({
	title: "Handling",
	type: "Grundkort",
	text: "Handlinger går til graven efter de har forladt hjemmet",
	image: "",
}),
new Card({
	title: "Effekt",
	type: "Grundkort",
	text: "Effekter går til graven efter de har forladt hjemmet.",
	image: "",
}),
new Card({
	title: "Egenskab",
	type: "Grundkort",
	text: "Egenskaber koster (3) ekstra energi at spille, og effekter på en egenskab koster dobbelt.",
	image: "",
}),
]`,
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
	icon: "am",
	image: "cards/svæveby.jpg",
}),
new Card({
	title: "Dværgeværksted",
	icon: "al",
	image: "cards/dværgeværksted.jpg",
}),
new Card({
	title: "Nekropolis",
	icon: "ad",
	image: "cards/nekropolis.jpg",
}),
new Card({
	title: "Morgentårn",
	icon: "bm",
	image: "cards/morgentårn.jpg",
}),
new Card({
	title: "Barakkerne",
	icon: "bl",
	image: "cards/barakker.jpg",
}),
new Card({
	title: "Kirkegård",
	icon: "bd",
	image: "cards/kirkegård.jpg",
}),
new Card({
	title: "Kompasstenen",
	icon: "pm",
	image: "cards/kompassten.jpg",
}),
new Card({
	title: "Lund",
	icon: "pl",
	image: "cards/skov.jpg",
}),
new Card({
	title: "Kratermine",
	icon: "pd",
	image: "cards/krater.jpg",
}),
]`,
	creature: `[
new Card({
	title: "Drage",
	icon: "am",
	image: "cards/drage.jpg",
}),
new Card({
	title: "Heks",
	icon: "m",
	image: "cards/troldmand.jpg",
}),
new Card({
	title: "Engel/Dværg?",
	icon: "al",
}),
new Card({
	title: "Høj-Elver",
	icon: "al",
}),
new Card({
	title: "Lich",
	icon: "ad",
}),
new Card({
	title: "Vampyr",
	icon: "ad",
}),
new Card({
	title: "Fe",
	icon: "bm",
}),
new Card({
	title: "Kelpie",
	icon: "bm",
}),
new Card({
	title: "Soldat",
	icon: "bl",
	image: "cards/soldat.jpg",
}),
new Card({
	title: "Havvagt",
	icon: "bl",
	image: "cards/havfrue.jpg",
}),
new Card({
	title: "Golem",
	icon: "bd",
	image: "cards/golem.jpg",
}),
new Card({
	title: "Spider Construct",
	icon: "bd",
}),
new Card({
	title: "Lue",
	icon: "pm",
	image: "cards/lue.jpg",
}),
new Card({
	title: "Djævel",
	icon: "pm",
}),
new Card({
	title: "Elefant",
	icon: "pl",
	image: "cards/elefant.jpg",
}),
new Card({
	title: "Tiger",
	icon: "pl",
	image: "cards/tiger.jpg",
}),
new Card({
	title: "Zombie",
	icon: "pd",
}),
new Card({
	title: "Poltergeist",
	icon: "pd",
}),
]`,
	action: `[
new Card({
	title: "Magimissil",
	text: "Giv (S) skade til et væsen.",
	icon: "m",
	image: "cards/magimissil.jpg",
}),
new Card({
	title: "Hærgen",
	text: "Giv (S) skade til et væsen.",
	icon: "l",
}),
new Card({
	title: "Pletskud",
	text: "Giv (S) skade til et væsen.",
	icon: "d",
	image: "cards/pletskud.jpg",
}),
new Card({
	title: "Magisk Meteor",
	text: "Giv (S) skade til en struktur.",
	icon: "m",
	image: "cards/meteor.jpg",
}),
new Card({
	title: "Plyndring",
	text: "Giv (S) skade til en struktur.",
	icon: "l",
}),
new Card({
	title: "Katapultering",
	text: "Giv (S) skade til en struktur.",
	icon: "d",
	image: "cards/katapult.jpg",
}),
new Card({
	title: "Genoplivning",
	text: "Tag et væsen og op til en effekt fra graven og læg det i spil sammen med (S) styrke.",
	icon: "m",
}),
new Card({
	title: "Medicin",
	text: "Tag et væsen og op til en effekt fra graven og læg det i spil sammen med (S) styrke.",
	icon: "l",
}),
new Card({
	title: "Frankensteins Procedure",
	text: "Tag et væsen og op til en effekt fra graven og læg det i spil sammen med (S) styrke.",
	icon: "d",
}),
new Card({
	title: "M Udmattelse",
	text: "Udmat op til (S) væsner eller strukturer.",
	icon: "m",
}),
new Card({
	title: "L Udmattelse",
	text: "Udmat op til (S) væsner eller strukturer.",
	icon: "l",
}),
new Card({
	title: "D Udmattelse",
	text: "Udmat op til (S) væsner eller strukturer.",
	icon: "d",
}),
new Card({
	title: "M Genopbygning",
	text: "Øg et hjems liv med 2 * (S).",
	icon: "m",
}),
new Card({
	title: "L Genopbygning",
	text: "Øg et hjems liv med 2 * (S).",
	icon: "l",
}),
new Card({
	title: "D Genopbygning",
	text: "Øg et hjems liv med 2 * (S).",
	icon: "d",
}),
new Card({
	title: "Sensu-bønne",
	text: "Øg styrken på et væsen eller struktur med (S).",
	icon: "m",
}),
new Card({
	title: "L Sensu-bønne",
	text: "Øg styrken på et væsen eller struktur med (S).",
	icon: "l",
}),
new Card({
	title: "D Sensu-bønne",
	text: "Øg styrken på et væsen eller struktur med (S).",
	icon: "d",
}),
new Card({
	title: "M Power Surge",
	text: "Giv et væsen eller struktur + 2 * (S) styrke indtil slutningen af turen.",
	icon: "m",
}),
new Card({
	title: "L Power Surge",
	text: "Giv et væsen eller struktur + 2 * (S) styrke indtil slutningen af turen.",
	icon: "l",
}),
new Card({
	title: "D Power Surge",
	text: "Giv et væsen eller struktur + 2 * (S) styrke indtil slutningen af turen.",
	icon: "d",
}),
new Card({
	title: "M Annullér",
	text: "Læg et sæt i modstanderens hjem på mindre end (S) kort i graven.",
	icon: "m",
}),
new Card({
	title: "L Annullér",
	text: "Læg et sæt i modstanderens hjem på mindre end (S) kort i graven.",
	icon: "l",
}),
new Card({
	title: "D Annullér",
	text: "Læg et sæt i modstanderens hjem på mindre end (S) kort i graven.",
	icon: "d",
}),
]`,
	passive: `[
new Card({
	title: "M Feltudstyr",
	text: "Påvirkede får +1 Styrke",
	icon: "m",
}),
new Card({
	title: "L Feltudstyr",
	text: "Påvirkede får +1 Styrke",
	icon: "l",
}),
new Card({
	title: "Feltudstyr",
	text: "Påvirkede får +1 Styrke",
	icon: "d",
	image: "cards/feltudstyr.jpg",
}),
new Card({
	title: "M Sværd",
	text: "Påvirkede får +2 Angreb",
	icon: "m",
}),
new Card({
	title: "L Sværd",
	text: "Påvirkede får +2 Angreb",
	icon: "l",
}),
new Card({
	title: "Sværd",
	text: "Påvirkede får +2 Angreb",
	icon: "d",
	image: "cards/sværd.jpg",
}),
new Card({
	title: "M Skjold",
	text: "Påvirkede får +2 Forsvar",
	icon: "m",
}),
new Card({
	title: "L Skjold",
	text: "Påvirkede får +2 Forsvar",
	icon: "l",
}),
new Card({
	title: "Skjold",
	text: "Påvirkede får +2 Forsvar",
	icon: "d",
	image: "cards/skjold.jpg",
}),
new Card({
	title: "M Falkeham",
	text: "Påvirkede bliver Flyvende",
	icon: "m",
}),
new Card({
	title: "Falkeham",
	text: "Påvirkede bliver Flyvende",
	icon: "l",
	image: "cards/falkeham.jpg",
}),
new Card({
	title: "D Falkeham",
	text: "Påvirkede bliver Flyvende",
	icon: "d",
}),
new Card({
	title: "M Kampsans",
	text: "Påvirkede bliver Snild",
	icon: "m",
}),
new Card({
	title: "Kampsans",
	text: "Påvirkede bliver Snild",
	icon: "l",
}),
new Card({
	title: "D Kampsans",
	text: "Påvirkede bliver Snild",
	icon: "d",
}),
]`,
	category: `[
new Card({
	title: "Magiske Væsner",
	text: "Effekter på denne påvirker alle magiske væsner.",
	image: "cards/s-m.jpg",
}),
new Card({
	title: "Magiske Strukturer",
	text: "Effekter på denne påvirker alle magiske strukturer.",
	image: "cards/s-m.jpg",
}),
new Card({
	title: "Livlige Væsner",
	text: "Effekter på denne påvirker alle livlige væsner.",
	image: "cards/s-l.jpg",
}),
new Card({
	title: "Livlige Strukturer",
	text: "Effekter på denne påvirker alle livlige strukturer.",
	image: "cards/s-l.jpg",
}),
new Card({
	title: "Livløse Væsner",
	text: "Effekter på denne påvirker alle livløse væsner.",
	image: "cards/s-d.jpg",
}),
new Card({
	title: "Livløse Strukturer",
	text: "Effekter på denne påvirker alle livløse strukturer.",
	image: "cards/s-d.jpg",
}),
new Card({
	title: "Avancerede Væsner",
	text: "Effekter på denne påvirker alle avancerede væsner.",
	image: "cards/s-a.jpg",
}),
new Card({
	title: "Avancerede Strukturer",
	text: "Effekter på denne påvirker alle avancerede strukturer.",
	image: "cards/s-a.jpg",
}),
new Card({
	title: "Balancerede Væsner",
	text: "Effekter på denne påvirker alle balancerede væsner.",
	image: "cards/s-b.jpg",
}),
new Card({
	title: "Balancerede Strukturer",
	text: "Effekter på denne påvirker alle balancerede strukturer.",
	image: "cards/s-b.jpg",
}),
new Card({
	title: "Primitive Væsner",
	text: "Effekter på denne påvirker alle primitive væsner.",
	image: "cards/s-p.jpg",
}),
new Card({
	title: "Primitive Strukturer",
	text: "Effekter på denne påvirker alle primitive strukturer.",
	image: "cards/s-p.jpg",
}),
new Card({
	title: "Magiskes Egenskab",
	type: "Egenskab - Lukket",
	text: "Effekter, som ikke trækker kort, aktiveres ikke normalt af Magiske væsner og strukturer, men i stedet når du trækker et kort.",
	image: "cards/s-m.jpg",
}),
new Card({
	title: "Livliges Egenskab",
	type: "Egenskab - Lukket",
	text: "Effekter, som ikke giver liv, aktiveres ikke normalt af Livlige væsner og strukturer, men i stedet når dit hjem får liv.",
	image: "cards/s-l.jpg",
}),
new Card({
	title: "Livløses Egenskab",
	type: "Egenskab - Lukket",
	text: "Effekter, som ikke giver skade, aktiveres ikke normalt af Livløse væsner og strukturer, men i stedet når dit hjem tager skade.",
	image: "cards/s-d.jpg",
}),
new Card({
	title: "Avanceredes Egenskab",
	type: "Egenskab - Lukket",
	text: "Prisen på avancerede væsner og strukturer ignorerer den første effekt.",
	image: "cards/s-a.jpg",
}),
new Card({
	title: "Balanceredes Egenskab",
	type: "Egenskab - Lukket",
	text: "Balancerede væsner og strukturer forlader hjemmet med det samme.",
	image: "cards/s-b.jpg",
}),
new Card({
	title: "Primitives Egenskab",
	type: "Egenskab - Lukket",
	text: "Primitive væsner og strukturer øger deres Styrke med 1, når de forlader hjemmet.",
	image: "cards/s-p.jpg",
}),
new Card({
	title: "Fortryllelsesting",
	type: "Egenskab - Lukket",
	text: "Magiske Effekter kan ikke tilføjes normalt, men til eksisterende væsner eller strukturer for (2)",
	image: "cards/s-m.jpg",
}),
new Card({
	title: "Kulturting",
	type: "Egenskab - Lukket",
	text: "Livlige Effekter kan ikke tilføjes normalt, men spilles som en handling og har \\"Denne effekt påvirker op til (S) væsner eller strukturer indtil slutningen af turen.\\"",
	image: "cards/s-l.jpg",
}),
new Card({
	title: "Udstyrsting",
	type: "Egenskab - Lukket",
	text: "Livløse Effekter kan ikke tilføjes normalt, men spilles som et separat kort for (2), og har \\"(1): Tilføj til et væsen eller struktur.\\"",
	image: "cards/s-d.jpg",
}),
new Card({
	title: "Fortryllelsesting 2",
	type: "Egenskab - Lukket",
	text: "Magiske Handlinger kan ikke aktiveres normalt, men kan tilføjes som effekter til eksisterende væsner eller strukturer for (2), og har en Styrke på 1",
	image: "cards/s-m.jpg",
}),
new Card({
	title: "Kulturting 2",
	type: "Egenskab - Lukket",
	text: "Livlige Handlinger kan ikke aktiveres normalt, men kan tilføjes som effekter, og har en Styrke på 1",
	image: "cards/s-l.jpg",
}),
new Card({
	title: "Udstyrsting 2",
	type: "Egenskab - Lukket",
	text: "Livløse Handlinger kan ikke aktiveres normalt, men spilles som et separat kort for (2). De har en Styrke på 1 og \\"(1): Tilføj til et væsen eller struktur.\\"",
	image: "cards/s-d.jpg",
}),
]`
}
