(function(){
	$(function(){new Tablesorter();});
	function Tablesorter() {
		this.listenTodoClick();
		this.listenStaffClick();
	}
	var T = Tablesorter.prototype;
	T.listenTodoClick = function() {
		$('#todo th').click(function(){
			var tableNumber = $('#todo').children('thead').find('tr th').index($(this));
			if ($(this).hasClass('clickme') && !$(this).hasClass('de')) {
				$(this).addClass('de');
				$('img').attr("src", "descend.png");
				T.Descend(tableNumber,'#todo');
			} else {
				$('img').attr("src", "ascend.png");
				$(this).removeClass("de");
				T.Ascend(tableNumber, '#todo');
			}
			T.chagecolor(this, '#todo');
		});
	}
	T.listenStaffClick = function() {
		$('#staff th').click(function(){
			var tableNumber = $('#staff').children('thead').find('tr th').index($(this));
			if ($(this).hasClass('clickme') && !$(this).hasClass('de')) {
				$(this).addClass('de');
				$('img').attr("src", "descend.png");
				T.Descend(tableNumber,'#staff');
			} else {
				$('img').attr("src", "ascend.png");
				$(this).removeClass("de");
				T.Ascend(tableNumber, '#staff');
			}
			T.chagecolor(this, '#staff');
		});
	}
	T.Descend = function(num, id) {
		var value = $(id + ' tbody').children().sort(function(a, b) {
			return b.children[num].innerText.localeCompare(a.children[num].innerText);
		});
		$(id).children('tbody').empty().append(value);
	}
	T.Ascend = function(num, id) {
		var value = $(id + ' tbody').children().sort(function(a, b) {
			return a.children[num].innerText.localeCompare(b.children[num].innerText);
		});
		$(id).children('tbody').empty().append(value);
	}
	T.chagecolor = function(obj, id) {
		$(id + ' tr').removeClass('alternate');
		$("th").removeClass('clickme');
		$(obj).addClass('clickme');
		$(id + ' tbody tr:odd').addClass('alternate');
	}
})();