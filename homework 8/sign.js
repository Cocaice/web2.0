$(document).ready(function() {
	var tip = $("#tip");
	$("#registercontainer p").hide();
	tip.hide();
	$("#registerform").submit(function() {
		$("input").removeClass("danger");
		tip.hide();
		$("#registercontainer p").hide();
		var message = $("#registercontainer input");
		var warnning = $("#registercontainer p");
		return check(message, warnning);
	});
	$("#reset").click(function() {
		tip.hide();
		$("#registercontainer p").hide();
	});
	if (tip.html() != "tips") {
		tip.show();
	}
});

function check(input, warnning) {
	var flag = true;
	if (!checkUsername($(input[0]).val())) {
		$(warnning[0]).show();
		$("#username").addClass("danger");
		flag = false;
	}
	if (!checkStudentnum($(input[1]).val())) {
		$(warnning[1]).show();
		$("#studentnum").addClass("danger");
		flag = false;
	}
	if (!checkTele($(input[2]).val())) {
		$(warnning[2]).show();
		$("#tele").addClass("danger");
		flag = false;
	}
	if (!checkEmail($(input[3]).val())) {
		$(warnning[3]).show();
		$("#mailbox").addClass("danger");
		flag = false;
	}
	return flag;
	console.log(flag);
}
function checkUsername(username) {
	return username.match(/^[a-zA-Z]{1}[a-zA-Z0-9_]{5,17}$/) != null;
}
function checkStudentnum(studentnum) {
	return studentnum.match(/^[1-9]{1}[0-9]{7}$/) != null;
}
function checkTele(tele) {
	return tele.match(/(^[1-9]{1}[0-9]{10}$)/) != null;
}
function checkEmail(mail) {
	return mail.match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/) != null;
}