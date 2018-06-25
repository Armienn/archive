import { SearchSite } from "./search-site.js"
import { Component, l, update } from "../arf/arf.js"
import iconButton, { arrowLeftIcon } from "./icons.js"

export class SectionNavigation extends Component {
	constructor(main) {
		super()
		this.main = main
		this.shown = false
		this.dark = true
		this.navigationEntries = [
			new NavGroup("blubl", new NavEntry("nav 1"), new NavEntry("nav 2")),
			new SingleLineNavGroup(new NavEntry("nav 1", undefined, () => false), new NavEntry("nav 2"))]
	}

	renderThis() {
		return l("nav" + (this.shown ? ".mobile-nav" : ""),
			l("ul",
				...this.navigationEntries
			),
			l("footer",
				l("a", { href: "https://github.com/Armienn" }, "Design and code © Armienn, 2017-2018.")
			),
			iconButton(arrowLeftIcon(this.dark ? { filter: "invert(1)" } : {}),
				() => {this.shown = false; update()}, ".mobile-menu-button")
		)
	}

	static styleThis() {
		return {
			nav: {
				position: "relative",
				backgroundColor: SearchSite.styling.headerBackground,
				color: SearchSite.styling.headerText,
				height: "100%",
				overflowY: "auto",
				fontWeight: "bold"
			},
			footer: {
				position: "absolute",
				fontWeight: "normal",
				top: "calc(100% - 3rem)",
				padding: "0.5rem",
				textAlign: "center",
				fontSize: "0.8rem",
				backgroundColor: SearchSite.styling.headerBackground,
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
			...this.entries.map(this.entryElement))
	}

	entryElement(e) {
		return l("li.entry" + (e.selected() ? "" : ".unselected"), { onclick: e.onclick }, e.content)
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
				backgroundColor: "rgba(0,0,0,0.3)"
			},
			"li.entry": {
				cursor: "pointer",
				padding: "0.25rem",
				width: "100%",
				transition: "0.5s ease"
			},
			"li.entry:hover": {
				color: "rgba(255,255,255,0.4)",
			},
			".unselected": {
				color: SearchSite.styling.inactiveText,
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
				color: SearchSite.styling.inactiveText,
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
