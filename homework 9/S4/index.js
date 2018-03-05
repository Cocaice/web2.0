var sum = 0;
var button = {};
var Time;
var array = [];
var word = ['A', 'B', 'C', 'D', 'E'];

$(document).ready(function() {
	NewBegin();
	button = $('#control-ring').children('li');
	$('#control-ring').children('li').click(function() {
		var $buttons = $(this);
		if ($buttons.hasClass("button") && $buttons.children('span').html() == "") {
			ShowPoint($buttons);
			ChangeOther($buttons);
			var ajaxobj = $.get("http://localhost:3000/S2/", function(data, status) {
				$buttons.children('span').html(data.toString());
				recover($buttons);
				sum += parseInt(data);
				isValid();
  			});
		}

	});
	$('#info-bar').click(function () {
		if (isValid()) {
			$('.sum').html(sum);
			$('#info-bar').css("background-color", "#7E7E7E");
		}
	});
	$('#button').hover(function(){
		NewBegin();
	});
	$('.apb').click(function() {
		ShowList();
		auto($(button[array[Time]]));
	});
});

function auto($button) {
		ShowPoint($button);
		ChangeOther($button);
		var ajaxobj = $.get("http://localhost:3000/S2/", function(data, status) {
			$button.children('span').html(data.toString());
			recover($button);
			sum += parseInt(data);
			if (Time < 5) {
				Time++;
				auto($(button[array[Time]]));
				if (isValid()) {
					$('.sum').html(sum);
					$('#info-bar').css("background-color", "#7E7E7E");
				}
			} 
  		});
}

function NewBegin() {
	for (var i = 0; i < 5; i++) {
		array[i] = i;
	}
	array.sort(function() {
		return Math.random()>0.5?-1:1;
	});
	$('#showlist').html("")
	sum = 0;
	flag = false;
	Time = 0;
	$('.unread').hide();
	$('.unread').html("");
	$('.button-disabled').removeClass("button-disabled").addClass("button");
	$('#info-bar').css("background-color", "#7E7E7E");
	$('.sum').html("");
}

function ShowPoint($buttons) {
	$buttons.find('.unread').show();
	$buttons.children('span').html("...");
}

function ChangeOther($buttons) {
	$('li').not($buttons).removeClass('button').addClass('button-disabled');
}

function recover($buttons) {
	$buttons.removeClass('button').addClass('button-disabled');
	$('.unread').each(function() {
		if ($(this).html() == '') {
			$(this).parent().removeClass('button-disabled').addClass('button');
		}
	});
}

function isValid() {
	var flag = true;
	$('.unread').each(function() {
		if ($(this).html() == "" || $(this).html() == "...") {
			flag = false;
			return false;
		}
	});
	if (flag) {
		$('#info-bar').css("background-color", "rgba(48, 63, 159, 1)");
	}
	return flag;
}

function ShowList() {
	var string = "";
	for (var i = 0; i < 5; i++) {
		string += word[array[i]];
	}
	$('#showlist').html(string.toString());
}