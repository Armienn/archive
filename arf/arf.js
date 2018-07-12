/* global virtualDom */
// Armienn's Framework - ARF

var vtree
var rootNode
var render
export function update() {
	if (!render)
		return console.error("render has not yet been set")
	currentRender = Date.now()
	if (!vtree) {
		vtree = render()
		rootNode = virtualDom.create(vtree)
		document.body.innerHTML = ""
		document.body.appendChild(rootNode)
		return
	}
	var newTree = render()
	var patches = virtualDom.diff(vtree, newTree)
	rootNode = virtualDom.patch(rootNode, patches)
	vtree = newTree
}

export function l(tag, options, ...children) {
	if (!(typeof options === "object" &&
		!(typeof options === "string" ||
			isArfElement(options)))
	) {
		children.unshift(options)
		options = {}
	}
	for (let i in children)
		if (children[i] instanceof Array)
			children.splice(i, 1, ...children[i])
	children = children.filter(e => e !== undefined && e !== null)
		.map(e => {
			if (typeof e === "string" || isArfElement(e))
				return e
			else
				return "" + e
		})
	for (let i in children)
		if (children[i] instanceof Component) {
			var node = children[i].render()
			node.component = children[i]
			children[i] = node
		}
	return virtualDom.h(tag, options, children)
}

export function isArfElement(element) {
	return element instanceof virtualDom.VNode ||
		element instanceof virtualDom.VText ||
		element instanceof Component
}

export function elementFunction(tag) {
	return (options, ...children) => {
		return l(tag, options, ...children)
	}
}

function renderNewTree(component) {
	component.tree = component.renderThis()
	component._components = []
	markTree(component, component.tree)
}

function markTree(component, tree) {
	traverseTree(tree, (node, path) => {
		if (node.component) {
			if (!path.length)
				throw new Error("Component must be within some other element")
			component._components.push({ component: node.component, tree: node.component.render() })
			return true
		}

		if (node.properties.attributes) {
			for (var i in node.properties.attributes)
				if (i.startsWith("site-"))
					return true
		}
		else {
			node.properties.attributes = {}
		}
		node.properties.attributes[component.designation] = ""
	})
}

function subcomponentsHaveChanged(component) {
	var changes = false
	for (var i in component._components) {
		var subcomponent = component._components[i]
		var tree = subcomponent.component.render()
		if (tree != subcomponent.tree) {
			subcomponent.tree = tree
			changes = true
		}
	}
	return changes
}

function traverseTree(tree, callback, path) {
	if (!(tree instanceof virtualDom.VNode))
		return
	if (!path)
		path = []
	var stop = callback(tree, path)
	if (stop)
		return
	for (var i in tree.children)
		traverseTree(tree.children[i], callback, path.concat([i]))
}

function modifySelector(selector, designation) {
	selector = selector.split(" ").join("[" + designation + "] ") + "[" + designation + "] "
	selector = selector.split(",").join("[" + designation + "],")
	return selector
}

function insertRule(sheet, key, rule) {
	if (typeof rule == "string") {
		if (rule.trim()[0] != "{")
			rule = "{" + rule + "}"
		sheet.insertRule(key + rule)
		return
	}
	var index = sheet.insertRule(key + "{}")
	for (var i in rule)
		sheet.cssRules[index].style[i] = rule[i]
}

export function clearStylesheets() {
	for (var key in stylesheets)
		document.head.removeChild(stylesheets[key])
	stylesheets = {}
}

var stylesheets = {}
var currentRender

export class Component {
	constructor() {
		this.designation = getDesignation(this)
	}

	render() {
		if (!this.renderThis)
			throw new Error("Component is missing renderThis()")
		if (this.lastRender == currentRender)
			return this.tree
		if (!stylesheets[this.designation] || this.constructor.styleHasChanged())
			this.style()
		if (!this.tree || this.renderHasChanged() || subcomponentsHaveChanged(this))
			renderNewTree(this)
		this.lastRender = currentRender
		return this.tree
	}

	renderHasChanged() {
		return true
	}

	style() {
		if (!this.constructor.styleThis)
			return
		var styles = this.constructor.styleThis()
		if (!stylesheets[this.designation]) {
			stylesheets[this.designation] = document.createElement("style")
			document.head.appendChild(stylesheets[this.designation])
		}
		else {
			while (stylesheets[this.designation].sheet.cssRules.length)
				stylesheets[this.designation].sheet.removeRule(0)
		}
		for (var i in styles)
			insertRule(stylesheets[this.designation].sheet, modifySelector(i, this.designation), styles[i])
	}

	static styleHasChanged() {
		return false
	}
}

function getDesignation(component) {
	return "site-" + component.constructor.name
}

export function setRenderFunction(r) {
	render = r
}
