var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({name: "Mountain Goat's Rest",image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"}
	, function(err, campground) {
	if(err){
		console.log(err);
	} else {
		console.log("New Campground");
		console.log(campground);
	}
});*/

/*var campgrounds = [
	{name: "Salmon Creek",image: "https://farm6.staticflickr.com/5532/14360459119_81d56363f2.jpg"},
	{name: "Salmon Creek",image: "https://farm6.staticflickr.com/5532/14360459119_81d56363f2.jpg"},
	{name: "Salmon Creek",image: "https://farm6.staticflickr.com/5532/14360459119_81d56363f2.jpg"},
	{name: "Salmon Creek",image: "https://farm6.staticflickr.com/5532/14360459119_81d56363f2.jpg"},
	{name: "Salmon Creek",image: "https://farm6.staticflickr.com/5532/14360459119_81d56363f2.jpg"},
	{name: "Granite Hill",image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	{name: "Mountain Goat's Rest",image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
	{name: "Granite Hill",image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	{name: "Mountain Goat's Rest",image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
	{name: "Granite Hill",image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	{name: "Mountain Goat's Rest",image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
	{name: "Granite Hill",image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	{name: "Mountain Goat's Rest",image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
	{name: "Granite Hill",image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
	{name: "Mountain Goat's Rest",image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
];*/

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	Campground.find(function(err, campgrounds){
		if (err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds:campgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var campground = {name: name, image: image};
	Campground.create(campground, function(err, newCampground){
		if(err){
			console.log("Error:");
			console.log(err);
		}
		res.redirect("/campgrounds");		
	});
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("Yelp camp Server has started");
});
