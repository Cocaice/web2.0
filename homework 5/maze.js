var road = 6;
var begin = false;
var Lose = false;
var Finish = false;
window.onload = function() {
	var screens = document.getElementById('show');
	document.getElementById('start').onmouseover = function() {
		start(screens);
	}
	document.getElementById('end').onmouseover = function() {
		judge(screens);
	}
	var walls = document.getElementsByClassName('wall');
	for (var i = 0; i < walls.length; ++i) {
		walls[i].onmouseover = function() {
			losegame(screens, this);
		};
		walls[i].onmouseout = function() {
			recover(this);
		};
	}
	var chans = document.getElementsByClassName('chan');
	for (var i = 0; i < chans.length; ++i) {
		chans[i].onmouseover = function() {
			record();
		};
	}
}
function start(src) {
	src.innerHTML = "";
	begin = true;
	road = 0;
	Finish = false;
	Lose = false;
}
function record() {
	road++;
}
function losegame(scr, obj) {
	if (begin == true && Finish == false) {
		obj.style.backgroundColor = "red";
		scr.innerHTML = "You Lose!";
		Lose = true;
		begin = false;
		Finish = true;
	}
}
function recover(obj) {
	if (Lose == true) {
		obj.style.backgroundColor = "grey";
	}
}
function judge(scr) {
	if (begin == true && road == 6 && Lose == false && Finish == false) {
		scr.innerHTML = "You Win!";
		Finish = true;
	} else if (record != 6 && Lose == false && Finish == false) {
		Finish = true;
		scr.innerHTML = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
	}
}