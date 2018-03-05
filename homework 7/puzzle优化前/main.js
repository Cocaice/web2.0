var t, sumtime, sumstep, isbegin = false, ing = false;
var start, Restart, times, steps, statue;
var map = new Array
var blank = {
	row: 4,
	col: 4
};
window.onload = function() {
	init();
	start.onclick = function() {startgame();};
	Restart.onclick = function() {restartgame();};
}
function init() {
	start = document.getElementById('start-stop');
	Restart = document.getElementById('Restart');
	times = document.getElementById('time');
	statue = document.getElementById('process');
	steps = document.getElementById('step');
	puzzles = document.getElementById('puzzle-container');
	newGame();
}
function newGame() { //载入图片
	puzzles.innerHTML = "";
	isbegin = false;
	ing = false;
	blank.row = 4;
	blank.col = 4;
	for (var i = 0; i < 4; ++i)		//清除map的数据
		map[i] = [];
	var frag = document.createDocumentFragment();
	for (var i = 0; i < 4; i++) {
		var rowArr = [];
		for (var j = 0; j < 4; j++) {
			var imgDiv = document.createElement('div');
			imgDiv.className = "row-" + (i+1) + " col-" + (j+1) + " pic" + " b";
			imgDiv.id = "pic" + (i+1) + "-" +(j+1);
			imgDiv.onclick = (function(i) {
				return function () {
					move(this, getpos(this));
				}
			})(i);
			rowArr[j] = imgDiv;
			frag.appendChild(imgDiv);
		}
		map[i] = rowArr;
	}
	puzzles.appendChild(frag);

}
function getpos(id) {
	var name = id.className;
	var row = name[name.indexOf("row-") + 4];
	var col = name[name.indexOf("col-") + 4];
	return {
		row: parseInt(row),
		col: parseInt(col)
	}
}
function move(id, pos) {
	if (isbegin == false || ing == false) return;
	if ((pos.row + 1 == blank.row || pos.row - 1 == blank.row)&& pos.col == blank.col) {
		swapclassName(id, map[blank.row-1][blank.col-1]);
		swapPosinarr(pos, blank);
		blank.row = pos.row;
		blank.col = pos.col;
		sumstep++;
		steps.innerHTML = sumstep;
	} else if ((pos.col + 1 == blank.col || pos.col - 1 == blank.col)&& pos.row == blank.row) {
		swapclassName(id, map[blank.row-1][blank.col-1]);
		swapPosinarr(pos, blank);
		blank.row = pos.row;
		blank.col = pos.col;
		sumstep++;
		steps.innerHTML = sumstep;
	}
	if (check()) {
		start.innerHTML = "Start";
		Restart.className = "restart";
		statue.innerHTML = "You Win!";
		alert("You Win!\nThe time you cost is : " + steps.innerHTML + "s\nThe steps you cost is : " + steps.innerHTML);
		isbegin = false;
		ing = false;
		sumtime = 0;
		sumstep = 0;
		clearInterval(t);
	}

}
function swapclassName(a, b) {
	var tmp = a.className;
	a.className = b.className;
	b.className = tmp;
}
function swapPosinarr(a, b) {
	var tmp = map[a.row-1][a.col-1];
	map[a.row-1][a.col-1] = map[b.row-1][b.col-1];
	map[b.row-1][b.col-1] = tmp;
}

function check() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (map[i][j].id != ("pic" + (i+1) + "-" + (j+1))) return false;
		}
	}
	return true;
}
function startgame() {
	if (isbegin == false && ing == false) {
		sumtime = 0;
		sumstep = 0;
		times.innerHTML = "0";
		steps.innerHTML = "0";
		statue.innerHTML = "Playing";
		start.innerHTML = "Pause";
		isbegin = true;
		ing = true;
		t = setInterval(function() {
			sumtime++;
			times.innerHTML = sumtime;
		}, 1000);
		Restart.className = "recover";
		random();
	} else if (ing == true && isbegin == true) {
		statue.innerHTML = "Pause";
		clearInterval(t);
		start.innerHTML = "Continue";
		ing = false;
	} else if (ing == false && isbegin == true) {
		ing = true;
		statue.innerHTML = "Playing";
		start.innerHTML = "Pause";
		t = setInterval(function() {
			sumtime++;
			times.innerHTML = sumtime;
		}, 1000);
	}
}
function restartgame() {
	newGame()
	clearInterval(t);
	isbegin = false;
	ing = false;
	statue.innerHTML = "";
	steps.innerHTML = "";
	times.innerHTML = "";
	sumtime = sumstep = 0;
	start.innerHTML = "Start";
	Restart.className = "restart";
}
function random() {
	var dirRow = [0, -1, 0, 1];
	var dirCol = [1, 0, -1, 0];
	for (var i = 0; i < 60; i++) { // 开始打乱顺序
		while (true) {
			var randomNum = Math.floor(Math.random() * 4); // 用随机决定下一步的走法；
			var nextRow = blank.row + dirRow[randomNum]-1;
			var nextCol = blank.col + dirCol[randomNum]-1;
			if (nextRow < 0 || nextRow > 3 || nextCol < 0 || nextCol > 3) {
				continue;
			} else {
				var tmp = map[nextRow][nextCol];
				map[nextRow][nextCol] = map[blank.row-1][blank.col-1];
				map[blank.row-1][blank.col-1] = tmp;
				blank.col = nextCol+1;
				blank.row = nextRow+1;
				break;
			}
		}
	}
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			map[i][j].className = "row-" + (i + 1) + " col-" + (j + 1) + " pic" + " b";
		}
	}
}