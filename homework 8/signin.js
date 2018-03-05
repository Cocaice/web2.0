var http = require("http");
var fs = require("fs");
var querystring = require("querystring");
var url = require("url");
var Filename = "file.json";

http.createServer(function(request,response){
	if (request.method == 'GET') {
		getMethod(request,response);
		//console.log("GET METHOD");
	} else if (request.method == 'POST') {
		postMethod(request, response);
		//console.log("POST METHOD");
	}
}).listen(8000);

console.log("Server listening at 8000");

function getMethod(request, response) {
	var pathname = url.parse(request.url).pathname;
	if (pathname.match(/.css|.jpg|.js/) != null) {
		writeCSSOrJSorJPG(pathname, response);
	} else {
		var tmp = querystring.parse(url.parse(request.url).query);
		ShowPage(response, tmp);
	}
}
function writeCSSOrJSorJPG(pathname, response) {
	if (pathname.match(/.jpg/) != null) {
		fs.readFile("./src/background.jpg", "binary", function(error, data) {
			if (error) throw error;
			else {
				response.writeHead(200,{'Content-Type': 'image/jpeg'});
				response.write(data, "binary");
				response.end();
			}
		});
	} else {
		fs.readFile("."+pathname, "binary", function(error, data) {
			if (error) throw error;
			if (pathname.match(/.css/) != null) {
				response.writeHead(200, {"Content-Type": "text/css; charset = utf-8"});
			} else if (pathname.match(/.js/) != null) {
				response.writeHead(200, {"Content-Type": "text/javascript; charset = utf-8"});
			}
			response.end(data);
		});
	}
}

function ShowPage(response, page) {
	if (page.username != undefined) {
		fs.readFile(Filename, function(error, data) {
			if (error) throw error;
			if (data == undefined || data.length == 0 || data == null) {
				data += "[]";
			}
			var users = JSON.parse(data);
			var ChosenUser = findUser(users, page.username);
			if (ChosenUser == null) {
				SignInPage(response);
			} else {
				ListMessage(ChosenUser, response);
			}
		});
	} else {
		SignInPage(response);
	}
}

function SignInPage(response, wrongtips) {
	response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
	fs.readFile("index.html", function(error, data) {
		if (error) throw error;
		if (wrongtips == undefined || wrongtips == null) {
			response.write(data);
		} else {
			var pages = data.toString();
			pages = pages.replace("tips", wrongtips);
			response.write(pages);
			//console.log(pages);
		}
		response.end();
	});
}

function postMethod(request, response) {
	var data = "";
	request.addListener("data", function(chunk) {
		if (chunk != undefined) {
			data += chunk;
		}
		console.log(chunk.toString());
	});
	request.addListener("end", function() {
		var NewUser = querystring.parse(data);
		console.log("Weclome new user:\n");
		console.log(NewUser);
		createUser(response, NewUser);
	});
}

function createUser(response, NewUser) {
	fs.readFile(Filename, function(error, data) {
		if (error) throw error;
		var users = JSON.parse(data);
		var wrongtips = IsValid(users, NewUser);
		if (wrongtips == null) {
			users.push(NewUser);
			var userstirng = JSON.stringify(users);
			fs.writeFileSync(Filename, userstirng);
			ListMessage(NewUser, response);
		} else {
			console.log(wrongtips);
			SignInPage(response, wrongtips);
		}
	})
}

function ListMessage(NewUser, response) {
	response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
	fs.readFile("upload.html", function(error, data) {
		if (error) throw error;
		var pagestring = data.toString();
		pagestring = pagestring.replace("UserName", NewUser.username);
		pagestring = pagestring.replace("StudentNum", NewUser.studentnum);
		pagestring = pagestring.replace("Tele", NewUser.tele);
		pagestring = pagestring.replace("Email", NewUser.mailbox);
		response.write(pagestring);
		response.end();
	});
}

function IsValid(users, NewUser) {
	for (var i = 0; i < users.length; i++) {
		if (users[i].username == NewUser.username) return "用户名已被使用";
		else if (users[i].studentnum == NewUser.studentnum) return "学号已被使用";
		else if (users[i].tele == NewUser.tele) return "电话已被使用";
		else if (users[i].mailbox == NewUser.mailbox) return "邮箱已被使用";
	}
	return null;
}

function findUser(users, name) {
	for (var i = 0; i < users.length; i++) {
		if (users[i].username == name) return users[i];
	}
	return null;
}