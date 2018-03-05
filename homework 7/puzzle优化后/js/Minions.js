(function(){
	$(function(){new Minions();});
	function Minions() {
		this.createNewgame();
		this.listenButtonsClicks();
		this.lsitenPuzzleClicks();
	}
	var M = Minions.prototype;
	M.vargroup = {
		t: 0,
		isbegin: false,
		ing: false,
		sumtime: 0,
		sumstep: 0,
		blank: {row: 4, col: 4},
		map: new Array,
	}
	M.createNewgame = function() {
		M.init();
		for (var i = 0; i < 4; i++) {
			M.vargroup.map[i] = [];
			for (var j = 0; j < 4; j++) {
				$('#puzzle-container').append('<div></div>');
				M.vargroup.map[i][j] = $('#puzzle-container div:last');
				$('#puzzle-container div:last').addClass("row-"+(i+1)+" col-"+(j+1)+" pic"+" b").attr('id', "pic"+(i+1)+"-"+(j+1));
			}
		}
	}
	M.init = function() {
		$('#puzzle-container').html("");
		M.vargroup.isbegin = false;
		M.vargroup.ing = false;
		M.vargroup.blank.row = M.vargroup.blank.col = 4;
	}
	M.listenButtonsClicks = function() {
		$('#start-stop').click(function(event){
			if (M.vargroup.isbegin == false && M.vargroup.ing == false) {
				M.firstinit();
			} else if (M.vargroup.isbegin == true && M.vargroup.ing == true) {
				M.secondinit();
			} else if (M.vargroup.isbegin == true && M.vargroup.ing == false) {
				M.thirdinit();
			}
		});
		$('#Restart').click(function(event){
			location.reload();
		});
	}
	M.firstinit = function() {
		M.vargroup.sumstep = M.vargroup.sumtime = 0;
		M.vargroup.isbegin = M.vargroup.ing = true;
		$('#time').html("0");
		$('#step').html("0");
		$('#process').html("Playing");
		$('#start-stop').html("Pause");
		$('#Restart').removeClass().addClass('recover');
		M.counttime();
		M.random();
	}
	M.counttime = function() {
		M.vargroup.t = setInterval(function() {
			M.vargroup.sumtime++;
			$('#time').html(M.vargroup.sumtime);
		}, 1000);
	}
	M.secondinit = function() {
		$('#start-stop').html("Continute");
		$('#process').html("Pause");
		M.vargroup.ing = false;
		clearInterval(M.vargroup.t);
	}
	M.thirdinit = function() {
		M.vargroup.ing = true;
		$('#process').html("Playing");
		$('#start-stop').html("Pause");
		M.counttime();
	}
	M.lsitenPuzzleClicks = function() {
		$('#puzzle-container div').click(function(event) {
			if (M.vargroup.isbegin && M.vargroup.ing && M.canMove(this)) {
				M.vargroup.sumstep++;
				$('#step').html(M.vargroup.sumstep);
				M.Move(this);
				M.check();
			}
		});
	}
	M.canMove = function(id) {
		return (M.vargroup.blank.row == id.className[4] && Math.abs(M.vargroup.blank.col - id.className[10]) == 1) ||
				(M.vargroup.blank.col == id.className[10] && Math.abs(M.vargroup.blank.row - id.className[4]) == 1) 
	}
	M.Move = function(id) {
		var tmp = {
			row: M.vargroup.blank.row,
			col: M.vargroup.blank.col,
		}
		M.vargroup.blank.row = id.className[4];
		M.vargroup.blank.col = id.className[10];
		$(id).removeClass().addClass("row-"+ tmp.row + " col-" + tmp.col +" pic b");
		$('#pic4-4').removeClass().addClass("row-" +M.vargroup.blank.row+' col-' + M.vargroup.blank.col+" pic b");
	}
	M.check = function() {
		if (M.isSucess()) {
			alert("You win!\nThe time you cost is : " + $('#time').html() +"\nThe steps you cost is : "+$('#step').html());
			location.reload();
		}
	}
	M.isSucess = function() {
		var name = $('#puzzle-container').children();
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (name[i*4+j].className != ("row-"+(i+1)+" col-"+(j+1)+" pic b")) {
					return false;
				}
			}
		}
		return true;
	}
	M.random = function() {
		for (var i = 0; i < 20; i++) {
			var name = $('#puzzle-container').children();
			var num = _.random(0,15)
			var tmp = {
				row: M.vargroup.blank.row,
				col: M.vargroup.blank.col,
			}
			M.vargroup.blank.row = name[num].className[4];
			M.vargroup.blank.col = name[num].className[10];
			$(name[num]).removeClass().addClass("row-"+ tmp.row + " col-" + tmp.col +" pic b");
			$('#pic4-4').removeClass().addClass("row-" +M.vargroup.blank.row+' col-' + M.vargroup.blank.col+" pic b");
		}
	}
})();