var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

var campgrounds = [
	{name: "Salmon Creek",image: "http://www.photosforclass.com/download/321487195"},
	{name: "Granite Hill",image: "http://www.photosforclass.com/download/5623797406"},
	{name: "Mountain Goat's Rest",image: "http://www.photosforclass.com/download/7121867321"}
];

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	campgrounds.push({name: name, image: image});
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Yelp camp Server has started");
});
