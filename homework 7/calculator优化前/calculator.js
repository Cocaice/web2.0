var sum = "";
var flag = false;
window.onload = function() {
	var buttons = document.getElementsByTagName('button');
	var screens = document.getElementById('screen');
	for (var i = 0; i < buttons.length; ++i) {
		buttons[i].onclick = function() {calculate(screens, this)};
	}
}
function calculate(scr, but) {
	if (but.innerHTML != "CE" && but.innerHTML != "←" && but.innerHTML != "=") {
		if (flag == true) {
			sum = "";
			sum += but.innerHTML;
			flag = false;
		} else {
			sum += but.innerHTML;
		}
	} else if (but.innerHTML == "CE") {
		sum = "";
	} else if (but.innerHTML == "←") {
		sum = sum.substr(0,sum.length-1);
	} else if (but.innerHTML == "=") {
		if (sum.length == 0) return;
		flag = true;
		try {
			var ans = parseFloat(eval(sum).toFixed(12));
		} catch(exception) {
			sum = "";
			scr.innerHTML = sum;
			alert('Wrong Input!');
			return;
		}
		sum = ans;
	}
	scr.innerHTML = sum;
}
