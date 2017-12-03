/*
The MIT License (MIT)

Copyright (c) 2017 Rafael Pedicini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var fscreen = (function () {
	const key = {
		fullscreenEnabled: 0,
		fullscreenElement: 1,
		requestFullscreen: 2,
		exitFullscreen: 3,
		fullscreenchange: 4,
		fullscreenerror: 5,
	}

	const webkit = [
		'webkitFullscreenEnabled',
		'webkitFullscreenElement',
		'webkitRequestFullscreen',
		'webkitExitFullscreen',
		'webkitfullscreenchange',
		'webkitfullscreenerror',
	]

	const moz = [
		'mozFullScreenEnabled',
		'mozFullScreenElement',
		'mozRequestFullScreen',
		'mozCancelFullScreen',
		'mozfullscreenchange',
		'mozfullscreenerror',
	]

	const ms = [
		'msFullscreenEnabled',
		'msFullscreenElement',
		'msRequestFullscreen',
		'msExitFullscreen',
		'MSFullscreenChange',
		'MSFullscreenError',
	]

	// so it doesn't throw if no window or document
	const document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {}

	const vendor = (
		('fullscreenEnabled' in document && Object.keys(key)) ||
		(webkit[0] in document && webkit) ||
		(moz[0] in document && moz) ||
		(ms[0] in document && ms) ||
		[]
	)

	return {
		requestFullscreen: element => element[vendor[key.requestFullscreen]](),
		requestFullscreenFunction: element => element[vendor[key.requestFullscreen]],
		get exitFullscreen() { return document[vendor[key.exitFullscreen]].bind(document) },
		addEventListener: (type, handler, options) => document.addEventListener(vendor[key[type]], handler, options),
		removeEventListener: (type, handler, options) => document.removeEventListener(vendor[key[type]], handler, options),
		get fullscreenEnabled() { return Boolean(document[vendor[key.fullscreenEnabled]]); },
		set fullscreenEnabled(val) { },
		get fullscreenElement() { return document[vendor[key.fullscreenElement]] },
		set fullscreenElement(val) { },
		get onfullscreenchange() { return document[`on${vendor[key.fullscreenchange]}`.toLowerCase()] },
		set onfullscreenchange(handler) { return document[`on${vendor[key.fullscreenchange]}`.toLowerCase()] = handler },
		get onfullscreenerror() { return document[`on${vendor[key.fullscreenerror]}`.toLowerCase()] },
		set onfullscreenerror(handler) { return document[`on${vendor[key.fullscreenerror]}`.toLowerCase()] = handler },
		// blub
		toggleFullscreen: function (element) {
			if (!document[vendor[key.fullscreenElement]])
				element[vendor[key.requestFullscreen]]()
			else
				document[vendor[key.exitFullscreen]].bind(document)()
		}
	}
})()
