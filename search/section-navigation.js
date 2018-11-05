import { Component, l, update } from "../arf/arf.js"
import iconButton, { arrowLeftIcon } from "./icons.js"
import { Styling } from "./styling.js"

export class SectionNavigation extends Component {
	constructor(main) {
		super()
		this.main = main
		this.shown = false
		// ()=>{[headerTitle]: {[groupTitle]: {[entryTitle]: {action: string | ()=>void, selected: boolean}}}}
		this.navigationSetup
		this.setup = {}
		this.navigationEntries = () => [""]
	}

	renderThis() {
		return l("nav" + (this.shown ? "" : ".mobile-hidden"),
			l("ul",
				...this.navigationEntries(),
				...(this.navigationSetup ? this.getSetupEntries() : [])
			),
			l("footer",
				l("a", { href: "https://github.com/Armienn" }, "Design and code © Armienn, 2017-2018.")
			),
			iconButton(arrowLeftIcon({ filter: Styling.styling.headerIconFilter }),
				() => { this.shown = false; update() }, ".mobile-menu-button")
		)
	}

	getSetupEntries() {
		const setup = this.navigationSetup()
		const entries = []
		for (let headerTitle in setup) {
			entries.push(l("li.header", headerTitle))
			for (let groupTitle in setup[headerTitle]) {
				if (groupTitle)
					entries.push(l("li.group", groupTitle))
				for (let entryTitle in setup[headerTitle][groupTitle]) {
					const entry = setup[headerTitle][groupTitle][entryTitle]
					entries.push(l("li.entry" + (entry.selected === true ? ".selected" : entry.selected === false ? ".unselected" : "") + (entry.action ? "" : ".unclickable"),
						typeof entry.action === "string" ? {} : { onclick: entry.action || (() => { }) },
						typeof entry.action === "string" ? l("a", { href: entry.action }, entryTitle) : entryTitle))
				}
			}
		}
		return entries
	}

	static styleThis() {
		return {
			nav: {
				position: "relative",
				backgroundColor: Styling.styling.headerBackground,
				color: Styling.styling.headerText,
				height: "100%",
				fontWeight: "bold",
				zIndex: "1"
			},
			footer: {
				position: "absolute",
				fontWeight: "normal",
				bottom: "0",
				height: "3rem",
				width: "12rem",
				padding: "0.5rem",
				textAlign: "center",
				fontSize: "0.8rem",
				backgroundColor: Styling.styling.headerBackground,
			},
			ul: {
				height: "calc(100% - 3rem)",
				overflowY: "auto"
			},
			"li": {
				width: "100%"
			},
			"li.header": {
				padding: "1rem 0.25rem 0.25rem 0.25rem",
				fontSize: "1.2rem"
			},
			"li.group": {
				fontSize: "1rem",
				padding: "0.25rem",
				backgroundColor: "rgba(0,0,0,0.3)"
			},
			"li.entry": {
				cursor: "pointer",
				padding: "0 0.25rem",
				height: "2em",
				lineHeight: "2em",
				transition: "0.3s ease"
			},
			"li.entry:hover": {
				backgroundColor: "rgba(255,255,255,0.3)"
			},
			"li.entry.unselected:hover": {
				backgroundColor: "rgba(255,255,255,0.3)",
				opacity: "0.7"
			},
			".selected": {
				backgroundColor: "rgba(255,255,255,0.3)"
			},
			".unselected": {
				opacity: "0.5"
			},
			"li.entry.unclickable": {
				cursor: "unset"
			},
			".mobile-menu-button": {
				position: "absolute",
				fontSize: "1.5rem",
				left: "0",
				top: "0",
				opacity: "0.5",
				transition: "0.3s ease"
			},
			".menu-button:hover": {
				opacity: "1",
				transition: "0.3s ease"
			}
		}
	}
}

export class NavGroup extends Component {
	constructor(title, ...entries) {
		super()
		this.title = title
		this.entries = entries
	}

	renderThis() {
		return l("ul", l("li.title", this.title),
			...this.entries.filter(e => e).map(this.entryElement))
	}

	entryElement(e) {
		return l("li.entry" + (e.selected() ? "" : ".inactive"), { onclick: e.onclick }, e.content)
	}

	static styleThis() {
		return {
			ul: {
				width: "100%",
				paddingBottom: "0.5rem"
			},
			"li.title": {
				padding: "0.25rem",
				width: "100%",
				fontSize: "1rem",
				backgroundColor: "rgba(0,0,0,0.3)"
			},
			"li.entry": {
				cursor: "pointer",
				padding: "0 0.25rem",
				width: "100%",
				height: "2em",
				lineHeight: "2em",
				transition: "0.3s ease"
			},
			"li.entry:hover": {
				backgroundColor: "rgba(255,255,255,0.3)"
			}
		}
	}
}

export class SingleLineNavGroup extends Component {
	constructor(...entries) {
		super()
		this.entries = entries
	}

	renderThis() {
		return l("ul", ...this.entries.map(this.entryElement))
	}

	entryElement(e) {
		return l("li.entry" + (e.selected() ? "" : ".unselected"), { onclick: e.onclick }, e.content)
	}

	static styleThis() {
		return {
			ul: {
				width: "100%"
			},
			"li.entry": {
				cursor: "pointer",
				padding: "0.25rem",
				display: "inline-block",
				transition: "0.5s ease"
			},
			"li.entry:hover": {
				color: "rgba(255,255,255,0.4)",
			},
			".unselected": {
				color: Styling.styling.inactiveText,
			}
		}
	}
}

export class NavEntry {
	constructor(content, onclick, selected = () => true) {
		this.selected = selected
		this.onclick = onclick
		this.content = content
	}
}
