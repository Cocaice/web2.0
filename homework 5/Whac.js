var ing = false;
var begin = false;
var t
var times, proces, buttons, totaltime, score, ground, hitbutton, sum;
window.onload = function() {
	inite();
	buttons.onclick = function() {
		StartOrStop(proces);
	}
}
function inite() {
	proces = document.getElementById('process');
	buttons = document.getElementById('start');
	times = document.getElementById('time');
	score = document.getElementById('score');
	ground = document.getElementById('Whac-container');
	score.innerHTML = 0;
	times.innerHTML = 0;
	for (var i = 0; i < 60; i++) {
		var newButton = document.createElement("button");
		newButton.className = "hole";
		ground.appendChild(newButton);
	}
	hitbutton = document.getElementsByTagName("button");
}
function StartOrStop(obj1) {
	 if (begin == false) {
	 	begin = true;
	 	obj1.innerHTML = "Playing";
	 	sum = 0;
	 	score.innerHTML = sum;
	 	ing = true;
	 	totaltime = 30;
	 	times.innerHTML = totaltime;
	 	t = setInterval("timedCount()", 1000);
	 	var randomNumber = Math.floor(Math.random()*(hitbutton.length-1));
		hitbutton[randomNumber+1].className = "hithole";
		for (var i = 1; i < hitbutton.length; i++) {
			hitbutton[i].onclick = function() {
				judge(this);
			}
		}
	 } else {
	 	if (ing == false) {
	 		obj1.innerHTML = "Playing";
	 		ing = true;
	 		t = setInterval("timedCount()", 1000);
	 	} else {
	 		obj1.innerHTML = "Pause";
	 		ing = false;
	 		clearInterval(t);
	 	}
	 }
}
function end() {
	clearInterval(t);
	proces.innerHTML = "Game over";
	alert("Your score is: "+score.innerHTML);
	begin = false;
	ing = false;
	for (var i = 1; i < hitbutton.length; i++) {
		hitbutton[i].className = "hole";
	}
}
function judge(obj) {
	if (ing == false) {
		return;
	} else {
		if (obj.className == "hithole") {
			sum++;
			score.innerHTML = sum;
			obj.className = "hole";
			var randomNumber = Math.floor(Math.random()*(hitbutton.length-1));
			hitbutton[randomNumber+1].className = "hithole";
		} else if(obj.className == "hole"){
			sum--;
			score.innerHTML = sum;
		}
	}
}
function timedCount() {
	totaltime--;
	times.innerHTML = totaltime;
	if (totaltime == 0) {
		end();
	}
}
