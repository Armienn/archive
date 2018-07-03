var styling = {
	headerBackground: "#c00",
	headerText: "#eee",
	headerIconFilter: "invert(1)",
	mainBackground: "#222",
	mainText: "#eee",
	mainIconFilter: "invert(1)",
	inactiveText: "rgba(0,0,0,0.4)",
	hoverBackground: "rgba(255, 255, 255, 0.35)"
}

export class Styling {
	static get styling(){
		return styling
	}

	static set styling(value){
		styling = value
	}
}
