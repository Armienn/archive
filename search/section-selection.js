import { Component, l, update } from "../arf/arf.js"
import { SearchSite } from "./search-site.js"
import iconButton, { grabIcon, crossIcon } from "./icons.js"

export class SectionSelection extends Component {
	constructor(main) {
		super()
		this.main = main
		this.content = null
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
			l("div.position-box",
				{
					style: {
						top: this.content ? (this.top ? this.top + "px" : "-50vh") : "0"
					}
				},
				l("div.selection-box" + (this.content ? ".show" : ""),
					this.grabBar(),
					l("div.content",
						{
							style: {
								height: this.top ? -this.top - 24 + "px" : "calc(50vh - 24px)"
							}
						}, this.content ? this.content() : "")
				)
			)
		)
	}

	static styleThis() {
		return {
			section: {
				position: "relative",
			},
			"div.position-box": {
				position: "absolute",
				width: "100%",
				minHeight: "100vh"
			},
			"div.selection-box": {
				position: "absolute",
				top: "100%",
				width: "100%",
				height: "100%",
				backgroundColor: SearchSite.styling.mainBackground,
				borderTop: "1px solid rgba(130,130,130,0.5)",
				transition: "0.3s ease"
			},
			"div.selection-box.show": {
				top: "0",
				transition: "0.3s ease"
			},
			"div.content": {
				position: "absolute",
				overflowY: "auto",
				width: "100%",
				height: "100%",
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
			iconButton(crossIcon(this.dark ? { filter: "invert(1)" } : {}), () => this.clearSelection(), ".close-button"))
	}

	clearSelection() {
		this.content = null
		if (this.clear)
			this.clear()
		update()
	}
}
