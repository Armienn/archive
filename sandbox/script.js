var output, input
// output functions
var print = function (text) {
	output.innerHTML += encodeHTML(text)
}
var printJSON = function (obj) {
	output.innerHTML += encodeHTML(formattedJSON(obj))
}
var clearOutput = function () {
	output.innerHTML = ""
}
//
var formattedJSON = function (obj, level) {
	if (!level)
		level = 0
	var result = obj instanceof Array ? "[\n" : "{\n"
	if (Object.keys(obj).length == 0)
		return obj instanceof Array ? "[]" : "{}"
	for (var key in obj) {
		var line = ""
		for (var i = 0; i < level + 1; i++)
			line += "\t"
		if (!(obj instanceof Array))
			line += "\"" + key + "\": "
		if (obj[key] === undefined)
			line += ""
		else if (typeof obj[key] == "string")
			line += JSON.stringify(obj[key])
		else if (Object.keys(obj[key]).length)
			line += formattedJSON(obj[key], level + 1)
		else
			line += JSON.stringify(obj[key])
		result += line + ",\n"
	}
	result = result.substr(0, result.length - 2) + "\n"
	for (var i = 0; i < level; i++)
		result += "\t"
	return result + (obj instanceof Array ? "]" : "}")
}
//
var parseCSVTable = function (data, separator, ignoreSeparatorWithinQuotes) {
	if (ignoreSeparatorWithinQuotes) {
		var split = data.split('"')
		for (var i = 1; i < split.length; i += 2) {
			split[i] = split[i].split(separator).join("🐐")
		}
		data = split.join("")
	}
	var rows = data.split("\n")
	for (var i in rows) {
		var list = rows[i].split(separator)
		rows[i] = list
	}
	if (ignoreSeparatorWithinQuotes) {
		for (var i in rows)
			rows[i] = rows[i].map(e => e.split("🐐").join(separator))
	}

	var headers = rows[0]
	var result = []
	for (var i = 1; i < rows.length; i++) {
		var entry = {}
		for (var j in headers) {
			entry[headers[j]] = rows[i][j]
		}
		result.push(entry)
	}
	return result
}
// function to encode in html
var encodeHTML = (function () {
	var encodeHTMLmap = { "&": "&amp;", "'": "&#39;", '"': "&quot;", "<": "&lt;", ">": "&gt;" }
	function encodeHTMLmapper(ch) { return encodeHTMLmap[ch] }
	return function (text) { return text.replace(/[&"'<>]/g, encodeHTMLmapper) }
})()

var newLink = function (text) {
	return "armienn.github.io/archive/sandbox/#" + LZString.compressToEncodedURIComponent(text)
}

window.onload = () => {
	output = document.getElementById("output")
	input = document.getElementById("input")
	createLoadButtons()
	if (window.location.hash && window.location.hash.substr(1))
		input.innerHTML = LZString.decompressFromEncodedURIComponent(window.location.hash.substr(1))
	// let tab work in textareas
	var textareas = document.getElementsByTagName("textarea")
	var count = textareas.length
	for (var i = 0; i < count; i++) {
		textareas[i].onkeydown = function (e) {
			if (e.keyCode == 9 || e.which == 9) {
				e.preventDefault()
				var s = this.selectionStart
				this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd)
				this.selectionEnd = s + 1
			}
		}
	}
}

function save(title, content) {
	localStorage[title] = content
	createLoadButtons()
}

function deleteSaved(title) {
	delete localStorage[title]
	createLoadButtons()
}

function createLoadButtons() {
	var holder = document.getElementById("button-holder")
	holder.innerHTML = ""
	var keys = Object.keys(localStorage)
	for (let i in keys) {
		let key = keys[i]
		var element = document.createElement("button")
		element.style.padding = "0.5rem"
		element.style.marginRight = "1px"
		element.innerHTML = key
		element.onclick = () => {
			input.value = localStorage[key]
			document.getElementById('title-input').value = key
		}
		holder.appendChild(element)
	}
}

var wMap = (characters)=>{var v=characters.split("-")[0];var c="-"+characters.split("-")[1];return (n)=>w(n,v,c)}
var w = (n,v="aeiouy",c="-bdfghjklmnprstvwxz")=>{var f=(t,l)=>{var i=t.n%l.length;t.n=(t.n-i)/l.length;t.t=l[i]+t.t};var s=(t)=>{f(t,v);f(t,c);f(t,c);t.t=t.t.replace("--","");t.t=t.t[0]=="-"?t.t.replace("-",""):t.t};var t={n:n,t:""};for(;t.n;s(t));t.t=c.includes(t.t[0]) && c.includes(t.t[1])?t.t.substr(1)+t.t[0]:t.t;t.t=t.t[0]=="-"?t.t.replace("-",""):t.t;return t.t}
var n = (w,v="aeiouy",c="-bdfghjklmnprstvwxz")=>{var n=0;w=c.includes(w[w.length-1])&&v.includes(w[0])?"-"+w:w;w=c.includes(w[w.length-1])?(w[w.length-1]+w).substr(0,w.length):w;var s=[];var last=-1;for(var i=0;i<w.length;i++)if(v.includes(w[i])){var ss=w.substring(last+1,i+1);while(ss.length<3)ss="-"+ss;s.unshift(ss);last=i;}for(var i in s)n+=(v.indexOf(s[i][2])+c.indexOf(s[i][1])*v.length+c.indexOf(s[i][0])*v.length*c.length)*Math.pow(v.length*c.length*c.length,+i);return n}
var inter
var startWordGen = ()=> {inter = setInterval(()=>{var num=Math.floor(Math.random()*10);for(;Math.random()<0.9;num=Math.floor(num*Math.random()*10));console.log(num+": "+w(num))},500)}

var toWord = (number, v = "aeiouy", c = "-bdfghjklmnprstvwxz") => {
	number = new Tal(number)
	var f = (thing, l) => {
		var result = thing.number.divideBy(l.length)
		//var i = thing.number % l.length
		thing.number = result.division // (thing.number - i) / l.length
		thing.text = l[result.remainder] + thing.text
	}
	var syllable = (thing) => {
		f(thing, v)
		f(thing, c)
		f(thing, c)
		thing.text = thing.text.replace("--", "")
		thing.text = thing.text[0] == "-" ? thing.text.replace("-", "") : thing.text
	};
	var thing = { number: number, text: "" }
	for (; !thing.number.isZero(); syllable(thing))
	thing.text = c.includes(thing.text[0]) && c.includes(thing.text[1]) ? thing.text.substr(1) + thing.text[0] : thing.text
	thing.text = thing.text[0] == "-" ? thing.text.replace("-", "") : thing.text
	return thing.text
}

var toNumber = (w, v = "aeiouy", c = "-bdfghjklmnprstvwxz") => {
	var n = 0
	w = c.includes(w[w.length - 1]) && v.includes(w[0]) ? "-" + w : w
	w = c.includes(w[w.length - 1]) ? (w[w.length - 1] + w).substr(0, w.length) : w
	var s = []
	var last = -1
	for (var i = 0; i < w.length; i++)
		if (v.includes(w[i])) {
			var ss = w.substring(last + 1, i + 1)
			while (ss.length < 3) ss = "-" + ss
			s.unshift(ss)
			last = i
		}
	for (var i in s)
		n += (v.indexOf(s[i][2]) + c.indexOf(s[i][1]) * v.length + c.indexOf(s[i][0]) * v.length * c.length) * Math.pow(v.length * c.length * c.length, +i)
	return n
}

class Tal {
	constructor(source) {
		this.digitsPerPart = 6
		this.factorPerPart = 1000000
		this.parts = [0]
		if (!source)
			return
		this.parts = []
		source = source.toString()
		for (var part = source.substr(-this.digitsPerPart); part.length > 0; part = source.substr(-this.digitsPerPart)) {
			this.parts.unshift(+part)
			source = source.substr(0, source.length - this.digitsPerPart)
		}
		this.removeLeadingZeros()
	}

	divideBy(number) {
		var result = new Tal()
		var remainder = 0
		for (var i in this.parts) {
			var currentPart = remainder * this.factorPerPart + this.parts[i]
			if (number > currentPart) {
				remainder = currentPart
				if (result.parts.length != 0)
					result.parts.push(0)
				continue
			}
			remainder = currentPart % number
			result.parts.push(Math.floor(currentPart / number))
		}
		result.removeLeadingZeros()
		return { division: result, remainder: remainder }
	}

	removeLeadingZeros(){
		while(this.parts[0] === 0){
			this.parts.shift(0)
		}
		if(this.parts.length == 0)
			this.parts.push(0)
	}

	isZero(){
		return this.parts.length == 1 && this.parts[0] === 0
	}

	toString() {
		var text = ""
		for (var i in this.parts)
			text += this.parts[i]
		return text
	}
}