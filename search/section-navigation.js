import { SearchSite } from "./search-site.js"
import { Component, l } from "../arf/arf.js"

export class SectionNavigation extends Component {
	constructor(main) {
		super()
		this.main = main
		this.navigationEntries = [
			new SingleLineNavGroup(new NavEntry("nav 1", undefined, () => false), new NavEntry("nav 2")),
			new NavGroup("blubl", new NavEntry("nav 1"), new NavEntry("nav 2"))]
	}

	renderThis() {
		return l("nav",
			l("ul",
				...this.navigationEntries
			)
		)
	}

	static styleThis() {
		return {
			nav: {
				backgroundColor: SearchSite.styling.headerBackground,
				color: SearchSite.styling.headerText,
				height: "100%",
				overflowY: "auto",
				fontWeight: "bold"
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
