import { Component, l, update } from "../arf/arf.js"
import { SearchSite } from "./search-site.js"
import iconButton, { grabIcon, crossIcon } from "./icons.js"
import { capitalise } from "./util.js"

export class SectionSelection extends Component {
	constructor(main) {
		super()
		this.main = main
		this.selection = null
		this.dataEntries = []
		this.top = 0
		this.dark = true
		this.grabbing = false
		window.addEventListener("touchmove", (event) => {
			if (this.grabbing) {
				this.top = -(window.innerHeight - event.targetTouches[0].clientY) - 10
				if (this.top < -window.innerHeight)
					this.top = -window.innerHeight
				if (this.top > -24)
					this.top = -24
				update()
			}
		})
		window.addEventListener("touchend", () => {
			this.grabbing = false
		})
		window.addEventListener("mousemove", (event) => {
			if (this.grabbing) {
				this.top = -(window.innerHeight - event.clientY) - 10
				if (this.top < -window.innerHeight)
					this.top = -window.innerHeight
				if (this.top > -24)
					this.top = -24
				update()
			}
		})
		window.addEventListener("mouseup", () => {
			this.grabbing = false
		})
	}

	renderThis() {
		return l("section" + (this.dark ? ".light-text" : ".dark-text"),
			l("div.selection-box",
				{
					style: {
						top: this.selection ? (this.top ? this.top + "px" : "-50vh") : "0"
					}
				},
				this.grabBar(),
				this.selectionInfo()
			)
		)
	}

	static styleThis() {
		return {
			section: {
				position: "relative",
			},
			"div.selection-box": {
				position: "absolute",
				width: "100%",
				minHeight: "100vh",
				backgroundColor: SearchSite.styling.mainBackground,
				borderTop: "1px solid rgba(130,130,130,0.5)"
			},
			"div.grab": {
				width: "100%",
				height: "1.5rem",
				cursor: "n-resize"
			},
			".close-button": {
				position: "absolute",
				right: "0",
				opacity: "0.5",
				transition: "0.3s ease"
			},
			".close-button:hover": {
				opacity: "1",
				transition: "0.3s ease"
			}
		}
	}

	grabBar() {
		return l("div.grab",
			{
				onmousedown: () => {
					this.grabbing = true
				},
				ontouchstart: () => {
					this.grabbing = true
				}
			},
			grabIcon(this.dark ? { filter: "invert(1)" } : {}),
			iconButton(crossIcon(this.dark ? { filter: "invert(1)" } : {}), () => {
				this.selection = null
				update()
			}, ".close-button"))
	}

	selectionInfo() {
		if (!this.selection)
			return ""
		if (!this.dataEntries.length)
			this.setDataEntriesFromExample(this.selection)
		return l("div", ...this.dataEntries.map(e => e(this.selection)))
	}

	setDataEntriesFromExample(source) {
		this.dataEntries = []
		for (let key in source)
			this.dataEntries.push((model) => {
				return l("div", { style: { padding: "0.5rem" } }, capitalise(key) + ": " + model[key])
			})
	}
}
