var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.get("/results", function(req, res) {
	var term = req.query.term;
	var url = "http://www.omdbapi.com/?i=tt3896198&apikey=c8dd9579&s="+term;
	request(url, function(error, respose, body){
		if (!error && res.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("results", {data: data});
		}
	});
});

app.get("/", function(req, res) {
	res.render("search");
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Server is up");
});
