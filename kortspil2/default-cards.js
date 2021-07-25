const defaultSetup = {
	"cardTypes": {
		"Regler": {
			"type": "Regel",
			"image": ""
		},
		"Strukturer": {
			"type": "Struktur",
			"image": "cards/tårn.jpg"
		},
		"Væsener": {
			"type": "Væsen",
			"image": "cards/soldat.jpg"
		},
		"Handlinger": {
			"type": "Handling",
			"image": "cards/pilesalve.jpg"
		},
		"Effekter": {
			"type": "Effekt",
			"image": "default.jpg"
		},
		"Egenskaber": {
			"type": "Egenskab",
			"image": "default.jpg"
		}
	},
	"cards": {
		"Regler": [
			{
				"type": "Regler",
				"title": "Runde",
				"text": "En runde består de følgende faser:\n\nOpfriskning - Udmattede kort opfriskes, og kilder øges.\n\nKorttræk - Læg et valgfrit antal kort fra hånden ned i bunden af dækket, og træk 1 kort mere end der blev lagt ned."
			},
			{
				"type": "Regler",
				"title": "Opsætning"
			},
			{
				"type": "Grundkort",
				"title": "Væsen",
				"text": "Væsner bliver i hjemmet indtil slutningen af turen.\n\nUdmat: Aktivér påvirkende handlinger, og angrib en modstander."
			},
			{
				"type": "Grundkort",
				"title": "Struktur",
				"text": "Strukturer bliver i hjemmet indtil slutningen af turen. Effekter på denne påvirker alle dine væsner af samme type.\n\nUdmat: Aktivér en påvirkende handling, eller øg en kilde med 1."
			},
			{
				"type": "Grundkort",
				"title": "Handling",
				"text": "Handlinger går til graven efter de har forladt hjemmet"
			},
			{
				"type": "Grundkort",
				"title": "Effekt",
				"text": "Effekter går til graven efter de har forladt hjemmet."
			},
			{
				"type": "Grundkort",
				"title": "Egenskab",
				"text": "Egenskaber koster (3) ekstra energi at spille, og effekter på en egenskab koster dobbelt."
			}
		],
		"Strukturer": [
			{
				"type": "Struktur - Hjem",
				"title": "Hjem",
				"text": "Udmat: Tilføj to kilder, hvis der er færre end 6.",
				"image": "cards/hjem.jpg"
			},
			{
				"type": "Struktur - Hjem",
				"title": "Koloni",
				"text": "Udmat: Tilføj kilder indtil der er mindst 4.",
				"image": "cards/koloni.jpg"
			},
			{
				"type": "Struktur - Hjem",
				"title": "Universitet",
				"text": "Udmat: Tilføj en dobbeltkilde, hvis der er færre end 3.",
				"image": "cards/universitet.jpg"
			},
			{
				"title": "Himmelby",
				"icon": "am",
				"image": "cards/svæveby.jpg"
			},
			{
				"title": "Dværgeværksted",
				"icon": "al",
				"image": "cards/dværgeværksted.jpg"
			},
			{
				"title": "Nekropolis",
				"icon": "ad",
				"image": "cards/nekropolis.jpg"
			},
			{
				"title": "Morgentårn",
				"icon": "bm",
				"image": "cards/morgentårn.jpg"
			},
			{
				"title": "Barakkerne",
				"icon": "bl",
				"image": "cards/barakker.jpg"
			},
			{
				"title": "Kirkegård",
				"icon": "bd",
				"image": "cards/kirkegård.jpg"
			},
			{
				"title": "Kompasstenen",
				"icon": "pm",
				"image": "cards/kompassten.jpg"
			},
			{
				"title": "Lund",
				"icon": "pl",
				"image": "cards/skov.jpg"
			},
			{
				"title": "Kratermine",
				"icon": "pd",
				"image": "cards/krater.jpg"
			}
		],
		"Væsener": [
			{
				"title": "Drage",
				"icon": "am",
				"image": "cards/drage.jpg"
			},
			{
				"title": "Heks",
				"icon": "m",
				"image": "cards/troldmand.jpg"
			},
			{
				"title": "Engel/Dværg?",
				"icon": "al"
			},
			{
				"title": "Høj-Elver",
				"icon": "al"
			},
			{
				"title": "Lich",
				"icon": "ad"
			},
			{
				"title": "Vampyr",
				"icon": "ad"
			},
			{
				"title": "Fe",
				"icon": "bm"
			},
			{
				"title": "Kelpie",
				"icon": "bm"
			},
			{
				"title": "Soldat",
				"icon": "bl",
				"image": "cards/soldat.jpg"
			},
			{
				"title": "Havvagt",
				"icon": "bl",
				"image": "cards/havfrue.jpg"
			},
			{
				"title": "Golem",
				"icon": "bd",
				"image": "cards/golem.jpg"
			},
			{
				"title": "Spider Construct",
				"icon": "bd"
			},
			{
				"title": "Lue",
				"icon": "pm",
				"image": "cards/lue.jpg"
			},
			{
				"title": "Djævel",
				"icon": "pm"
			},
			{
				"title": "Elefant",
				"icon": "pl",
				"image": "cards/elefant.jpg"
			},
			{
				"title": "Tiger",
				"icon": "pl",
				"image": "cards/tiger.jpg"
			},
			{
				"title": "Zombie",
				"icon": "pd"
			},
			{
				"title": "Poltergeist",
				"icon": "pd"
			}
		],
		"Handlinger": [
			{
				"title": "Magimissil",
				"text": "Giv (S) skade til et væsen.",
				"image": "cards/magimissil.jpg"
			},
			{
				"title": "Hærgen",
				"text": "Giv (S) skade til et væsen.",
				"icon": "l"
			},
			{
				"title": "Pletskud",
				"text": "Giv (S) skade til et væsen.",
				"icon": "d",
				"image": "cards/pletskud.jpg"
			},
			{
				"title": "Magisk Meteor",
				"text": "Giv (S) skade til en struktur.",
				"icon": "m",
				"image": "cards/meteor.jpg"
			},
			{
				"title": "Plyndring",
				"text": "Giv (S) skade til en struktur.",
				"icon": "l"
			},
			{
				"title": "Katapultering",
				"text": "Giv (S) skade til en struktur.",
				"icon": "d",
				"image": "cards/katapult.jpg"
			},
			{
				"title": "Genoplivning",
				"text": "Tag et væsen og op til en effekt fra graven og læg det i spil sammen med (S) styrke.",
				"icon": "m"
			},
			{
				"title": "Medicin",
				"text": "Tag et væsen og op til en effekt fra graven og læg det i spil sammen med (S) styrke.",
				"icon": "l"
			},
			{
				"title": "Frankensteins Procedure",
				"text": "Tag et væsen og op til en effekt fra graven og læg det i spil sammen med (S) styrke.",
				"icon": "d"
			},
			{
				"title": "M Udmattelse",
				"text": "Udmat op til (S) væsner eller strukturer.",
				"icon": "m"
			},
			{
				"title": "L Udmattelse",
				"text": "Udmat op til (S) væsner eller strukturer.",
				"icon": "l"
			},
			{
				"title": "D Udmattelse",
				"text": "Udmat op til (S) væsner eller strukturer.",
				"icon": "d"
			},
			{
				"title": "M Genopbygning",
				"text": "Øg et hjems liv med 2 * (S).",
				"icon": "m"
			},
			{
				"title": "L Genopbygning",
				"text": "Øg et hjems liv med 2 * (S).",
				"icon": "l"
			},
			{
				"title": "D Genopbygning",
				"text": "Øg et hjems liv med 2 * (S).",
				"icon": "d"
			},
			{
				"title": "Sensu-bønne",
				"text": "Øg styrken på et væsen eller struktur med (S).",
				"icon": "m"
			},
			{
				"title": "L Sensu-bønne",
				"text": "Øg styrken på et væsen eller struktur med (S).",
				"icon": "l"
			},
			{
				"title": "D Sensu-bønne",
				"text": "Øg styrken på et væsen eller struktur med (S).",
				"icon": "d"
			},
			{
				"title": "M Power Surge",
				"text": "Giv et væsen eller struktur + 2 * (S) styrke indtil slutningen af turen.",
				"icon": "m"
			},
			{
				"title": "L Power Surge",
				"text": "Giv et væsen eller struktur + 2 * (S) styrke indtil slutningen af turen.",
				"icon": "l"
			},
			{
				"title": "D Power Surge",
				"text": "Giv et væsen eller struktur + 2 * (S) styrke indtil slutningen af turen.",
				"icon": "d"
			},
			{
				"title": "M Annullér",
				"text": "Læg et sæt i modstanderens hjem på mindre end (S) kort i graven.",
				"icon": "m"
			},
			{
				"title": "L Annullér",
				"text": "Læg et sæt i modstanderens hjem på mindre end (S) kort i graven.",
				"icon": "l"
			},
			{
				"title": "D Annullér",
				"text": "Læg et sæt i modstanderens hjem på mindre end (S) kort i graven.",
				"icon": "d"
			}
		],
		"Effekter": [
			{
				"title": "M Feltudstyr",
				"text": "Påvirkede får +1 Styrke",
				"icon": "m"
			},
			{
				"title": "L Feltudstyr",
				"text": "Påvirkede får +1 Styrke",
				"icon": "l"
			},
			{
				"title": "Feltudstyr",
				"text": "Påvirkede får +1 Styrke",
				"icon": "d",
				"image": "cards/feltudstyr.jpg"
			},
			{
				"title": "M Sværd",
				"text": "Påvirkede får +2 Angreb",
				"icon": "m"
			},
			{
				"title": "L Sværd",
				"text": "Påvirkede får +2 Angreb",
				"icon": "l"
			},
			{
				"title": "Sværd",
				"text": "Påvirkede får +2 Angreb",
				"icon": "d",
				"image": "cards/sværd.jpg"
			},
			{
				"title": "M Skjold",
				"text": "Påvirkede får +2 Forsvar",
				"icon": "m"
			},
			{
				"title": "L Skjold",
				"text": "Påvirkede får +2 Forsvar",
				"icon": "l"
			},
			{
				"title": "Skjold",
				"text": "Påvirkede får +2 Forsvar",
				"icon": "d",
				"image": "cards/skjold.jpg"
			},
			{
				"title": "M Falkeham",
				"text": "Påvirkede bliver Flyvende",
				"icon": "m"
			},
			{
				"title": "Falkeham",
				"text": "Påvirkede bliver Flyvende",
				"icon": "l",
				"image": "cards/falkeham.jpg"
			},
			{
				"title": "D Falkeham",
				"text": "Påvirkede bliver Flyvende",
				"icon": "d"
			},
			{
				"title": "M Kampsans",
				"text": "Påvirkede bliver Snild",
				"icon": "m"
			},
			{
				"title": "Kampsans",
				"text": "Påvirkede bliver Snild",
				"icon": "l"
			},
			{
				"title": "D Kampsans",
				"text": "Påvirkede bliver Snild",
				"icon": "d"
			}
		],
		"Egenskaber": [
			{
				"title": "Magiske Væsner",
				"text": "Effekter på denne påvirker alle magiske væsner.",
				"image": "cards/s-m.jpg"
			},
			{
				"title": "Magiske Strukturer",
				"text": "Effekter på denne påvirker alle magiske strukturer.",
				"image": "cards/s-m.jpg"
			},
			{
				"title": "Livlige Væsner",
				"text": "Effekter på denne påvirker alle livlige væsner.",
				"image": "cards/s-l.jpg"
			},
			{
				"title": "Livlige Strukturer",
				"text": "Effekter på denne påvirker alle livlige strukturer.",
				"image": "cards/s-l.jpg"
			},
			{
				"title": "Livløse Væsner",
				"text": "Effekter på denne påvirker alle livløse væsner.",
				"image": "cards/s-d.jpg"
			},
			{
				"title": "Livløse Strukturer",
				"text": "Effekter på denne påvirker alle livløse strukturer.",
				"image": "cards/s-d.jpg"
			},
			{
				"title": "Avancerede Væsner",
				"text": "Effekter på denne påvirker alle avancerede væsner.",
				"image": "cards/s-a.jpg"
			},
			{
				"title": "Avancerede Strukturer",
				"text": "Effekter på denne påvirker alle avancerede strukturer.",
				"image": "cards/s-a.jpg"
			},
			{
				"title": "Balancerede Væsner",
				"text": "Effekter på denne påvirker alle balancerede væsner.",
				"image": "cards/s-b.jpg"
			},
			{
				"title": "Balancerede Strukturer",
				"text": "Effekter på denne påvirker alle balancerede strukturer.",
				"image": "cards/s-b.jpg"
			},
			{
				"title": "Primitive Væsner",
				"text": "Effekter på denne påvirker alle primitive væsner.",
				"image": "cards/s-p.jpg"
			},
			{
				"title": "Primitive Strukturer",
				"text": "Effekter på denne påvirker alle primitive strukturer.",
				"image": "cards/s-p.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Magiskes Egenskab",
				"text": "Effekter, som ikke trækker kort, aktiveres ikke normalt af Magiske væsner og strukturer, men i stedet når du trækker et kort.",
				"image": "cards/s-m.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Livliges Egenskab",
				"text": "Effekter, som ikke giver liv, aktiveres ikke normalt af Livlige væsner og strukturer, men i stedet når dit hjem får liv.",
				"image": "cards/s-l.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Livløses Egenskab",
				"text": "Effekter, som ikke giver skade, aktiveres ikke normalt af Livløse væsner og strukturer, men i stedet når dit hjem tager skade.",
				"image": "cards/s-d.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Avanceredes Egenskab",
				"text": "Prisen på avancerede væsner og strukturer ignorerer den første effekt.",
				"image": "cards/s-a.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Balanceredes Egenskab",
				"text": "Balancerede væsner og strukturer forlader hjemmet med det samme.",
				"image": "cards/s-b.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Primitives Egenskab",
				"text": "Primitive væsner og strukturer øger deres Styrke med 1, når de forlader hjemmet.",
				"image": "cards/s-p.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Fortryllelsesting",
				"text": "Magiske Effekter kan ikke tilføjes normalt, men til eksisterende væsner eller strukturer for (2)",
				"image": "cards/s-m.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Kulturting",
				"text": "Livlige Effekter kan ikke tilføjes normalt, men spilles som en handling og har \"Denne effekt påvirker op til (S) væsner eller strukturer indtil slutningen af turen.\"",
				"image": "cards/s-l.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Udstyrsting",
				"text": "Livløse Effekter kan ikke tilføjes normalt, men spilles som et separat kort for (2), og har \"(1): Tilføj til et væsen eller struktur.\"",
				"image": "cards/s-d.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Fortryllelsesting 2",
				"text": "Magiske Handlinger kan ikke aktiveres normalt, men kan tilføjes som effekter til eksisterende væsner eller strukturer for (2), og har en Styrke på 1",
				"image": "cards/s-m.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Kulturting 2",
				"text": "Livlige Handlinger kan ikke aktiveres normalt, men kan tilføjes som effekter, og har en Styrke på 1",
				"image": "cards/s-l.jpg"
			},
			{
				"type": "Egenskab - Lukket",
				"title": "Udstyrsting 2",
				"text": "Livløse Handlinger kan ikke aktiveres normalt, men spilles som et separat kort for (2). De har en Styrke på 1 og \"(1): Tilføj til et væsen eller struktur.\"",
				"image": "cards/s-d.jpg"
			}
		]
	}
}