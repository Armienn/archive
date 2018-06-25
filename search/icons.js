import { l } from "../arf/arf.js"

export default function iconButton(icon, onclick, className = "", properties = {}) {
	properties.onclick = onclick
	return l("button.icon" + className, properties, icon)
}

export function sortIcon(style = {}) {
	return l("span.icon", {
		style: style, innerHTML: `
	<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
		<path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
		<path d="M0 0h24v24H0z" fill="none"/>
	</svg>
`})
}

export function crossIcon(style = {}) {
	return l("span.icon", {
		style: style, innerHTML: `
	<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
		<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
		<path d="M0 0h24v24H0z" fill="none"/>
	</svg>
`})
}

export function plusIcon(style = {}) {
	return l("span.icon", {
		style: style, innerHTML: `
	<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
		<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
		<path d="M0 0h24v24H0z" fill="none"/>
	</svg>
`})
}

export function gearIcon(style = {}) {
	return l("span.icon", {
		style: style, innerHTML: `
	<svg width="1.5em" height="1.5em" viewBox="-1 -1 23 23">
		<path fill="none" d="M0 0h20v20H0V0z"/>
		<path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
	</svg>
`})
}

export function arrowUpIcon(style = {}) {
	return l("span.icon", {
		style: style, innerHTML: `
	<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
		<path fill="none" d="M0 0h24v24H0V0z"/>
		<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
	</svg>
`})
}

export function arrowDownIcon(style = {}) {
	return l("span.icon", {
		style: style, innerHTML: `
	<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
		<path fill="none" d="M0 0h24v24H0V0z"/>
		<path fill="#010101" d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
	</svg>
`})
}

export function arrowLeftIcon(style = {}) {
	return l("span.icon", {
		style: style, innerHTML: `
	<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
		<path d="M15.41,16.59L10.83,12l4.58-4.59L14,6l-6,6l6,6L15.41,16.59z"/>
		<path fill="none" d="M0,0h24v24H0V0z"/>
	</svg>
`})
}

export function arrowRightIcon(style = {}) {
	return l("span.icon", {
		style: style, innerHTML: `
	<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
		<path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"/>
		<path fill="none" d="M0,0h24v24H0V0z"/>
	</svg>
`})
}

export function barsIcon(style = {}) {
	return l("span.icon", {
		style: style, innerHTML: `
	<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
		<path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"/>
		<path fill="none" d="M0 0h24v24H0V0z"/>
	</svg>
`})
}

export function gridIcon(style = {}) {
	return l("span.icon", {
		style: style, innerHTML: `
	<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
	</svg>
`})
}

export function grabIcon(style = {}) {
	return l("span.icon", {
		style: style, innerHTML: `
	<svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
		<defs>
			<path id="a" d="M0 0h24v24H0V0z"/>
		</defs>
		<clipPath id="b">
			<use xlink:href="#a" overflow="visible"/>
		</clipPath>
		<path clip-path="url(#b)" d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/>
	</svg>
`})
}
