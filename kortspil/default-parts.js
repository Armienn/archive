const defaultParts = {
	triggerEffects: `[
{
	trigger: "når deres kort kommer i spil.",
},
{
	trigger: "når deres kort angriber.",
},
{
	trigger: "når deres kort forsvarer.",
},
{
	trigger: "når deres kort dør.",
},
{
	trigger: "når denne side får liv.",
	throne: true,
	cost: 2,
},
{
	trigger: "når en modstander tager skade.",
	throne: true,
	cost: 2,
},
{
	trigger: "når du trækker et kort.",
	throne: true,
	cost: 2,
},
]`,
	immediateEffects: `[
{
	text: "Giv 1 skade til et væsen eller en spiller.",
	cost: 1,
},
{
	text: "Giv 2 skade til et væsen eller en spiller.",
	cost: 2,
},
{
	text: "Giv 3 skade til et væsen eller en spiller.",
	cost: 3,
},
{
	text: "Giv 4 skade til et væsen eller en spiller.",
	cost: 4,
},
{
	text: "Giv 1 liv til en spiller.",
	cost: 1,
},
{
	text: "Giv 2 liv til en spiller.",
	cost: 2,
},
{
	text: "Giv 3 liv til en spiller.",
	cost: 3,
},
{
	text: "Giv 4 liv til en spiller.",
	cost: 4,
},
{
	text: "Få 1 energi",
	cost: 1,
},
{
	text: "Få 2 energi",
	cost: 3,
},
{
	text: "Dræb et væsen.",
	cost: 5,
},
{
	text: "Ødelæg en fortryllelse eller struktur.",
	cost: 4,
},
{
	text: "Træk et kort.",
	cost: 3,
},
]`,
	permanentEffects: `[
{
	text: "+1 Forsvar",
	helpText: "Når noget med Forsvar tager skade, trækkes mængden af forsvar fra skaden.",
	cost: 1,
},
{
	text: "+1 Angreb",
	helpText: "Når noget med Angreb giver skade, lægges mængden af angreb til skaden.",
	cost: 1,
},
{
	text: "-1 Forsvar",
	helpText: "Når noget med Forsvar tager skade, trækkes mængden af forsvar fra skaden.",
	cost: -1,
},
{
	text: "-1 Angreb",
	helpText: "Når noget med Angreb giver skade, lægges mængden af angreb til skaden.",
	cost: -1,
},
{
	text: "+1 Styrke",
	cost: 1,
	skipCreatures: true,
},
{
	text: "+2 Styrke",
	cost: 2,
	skipCreatures: true,
},
{
	text: "+3 Styrke",
	cost: 3,
	skipCreatures: true,
},
{
	text: "+4 Styrke",
	cost: 4,
	skipCreatures: true,
},
{
	text: "Plyndring",
	helpText: "Væsner med Plyndring kan angribe et område.",
	cost: 4,
},
{
	text: "Hærgen",
	helpText: "Væsner med Hærgen kan angribe en struktur eller fortryllelse.",
	cost: 3,
},
{
	text: "Udfordring",
	helpText: "Væsner med Udfordring kan angribe et væsen.",
	cost: 2,
},
{
	text: "Lifelink",
	helpText: "Når noget med Lifelink giver skade, giver det lige så meget liv til sin side.",
	cost: 1,
},
{
	text: "Haste",
	cost: 1,
},
{
	text: "Deathtouch",
	cost: 1,
},
{
	text: "Flying",
	cost: 2,
},
{
	text: "Reach",
	cost: 1,
},
{
	text: "Vigilance",
	cost: 1,
},
{
	text: "First Strike",
	cost: 1,
},
]`,
	offBattleFieldEffects: `[
{
	text: "Flash",
	cost: 1,
},
]`,
}

