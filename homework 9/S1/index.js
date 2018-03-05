var sum = 0;

$(document).ready(function() {
	NewBegin();
	$('#control-ring').children('li').click(function() {
		var $buttons = $(this);
		if ($buttons.hasClass("button") && $buttons.children('span').html() == "") {
			ShowPoint($buttons);
			ChangeOther($buttons);
			var ajaxobj = $.get("http://localhost:3000/S1/", function(data, status) {
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

});

function NewBegin() {
	sum = 0;
	flag = false;
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
		if ($(this).html() == "") {
			flag = false;
			return false;
		}
	});
	if (flag) {
		$('#info-bar').css("background-color", "rgba(48, 63, 159, 1)");
	}
	return flag;
}