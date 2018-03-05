(function(){
	$(function(){new Caculator();});
	function Caculator() {
		this.listenButtonsClick();
	}
	var C = Caculator.prototype;
	C.sum = "";
	C.listenButtonsClick = function() {
		$('button').click(function(){
			if (this.innerHTML == "CE") {
				$('#screen').html(C.sum = "");
			} else if (this.innerHTML == "←") {
				C.delete();
			} else if (this.innerHTML == "=") {
				 C.equal();
			} else {
				$('#screen').html(C.sum += this.innerHTML);
			}
		});
	}
	C.equal = function() {
		if ($('#screen').html() == "") return;
		try {
			if (parseFloat(eval(C.sum).toFixed(12)) == "Infinity") throw SyntaxError;
			$('#screen').html(parseFloat(eval(C.sum).toFixed(12)));
			C.sum = "";
		} catch(SyntaxError) {
			$('#screen').html(C.sum = "");
			alert("Wrong Input!");
			return;
		}
	}
	C.delete = function() {
		C.sum = C.sum.substr(0, (C.sum.length)-1);
		$('#screen').html(C.sum);
	}
})();