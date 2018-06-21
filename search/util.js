/** Returns either the parameter itself, or if it is a function, then the result of calling it */
export default function callOrReturn(thing) {
	return typeof thing === "function" ? thing() : thing
}
