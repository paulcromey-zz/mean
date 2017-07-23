var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res){

	var lon = parseFloat(req.query.lon);
	var lat = parseFloat(req.query.lat);
	
	var point = {
		type : "Point",
		coordinates : [lon, lat]
	};

	var geoOptions = {
		spherical : true,
		maxDistance : 20000,
		num : 5
	}

	Hotel.geoNear(point, geoOptions, function(err, results, stats){
		console.log("GEO " + err);
		res.status(200).json(results);
	});
};

module.exports.getHotels = function(req, res) {

	var maxCount = 10;

	if (req.query && req.query.lon & req.query.lat) {
		runGeoQuery(req, res);
		return;
	}

	if(isNaN(offset(req)) || isNaN(count(req))){
		res.status(400).json({
			"message" : "offset or count should be numbers"
		})
		return;
	}

	if(count(req) > maxCount){
		res.status(400).json({
			"message" : "count limit exceeded"
		})
		return;
	}
	
	Hotel.find().skip(offset(req)).limit(count(req)).exec(function(err, hotels) {
		if(err){
			res.status(500).json(err);
		} else {
			res.status(200).json(hotels);
		}
	});
		
};

module.exports.getHotel = function(req, res) {
	
	

	Hotel.findById(req.params.hotelId).exec(function(err, hotel) {
		var response = {
			status : 200,
			message : hotel
		};
		if (err) {  
			response.status = 500;
			response.message = err;
		} else if (!hotel) {
			response.status = 404;
			response.message = {
				"message" : "Hotel ID not found"
			};
		} 
		res.status(response.status).json(response.message);
	});
		
};

module.exports.addHotel = function(req, res) {
	console.log("POST new hotel");
	if (req.body && req.body.name && req.body.stars){
		console.log(req.body);
		var newHotel = req.body;
		newHotel.stars = parseInt(req.body.stars);
		callCollection('hotels').insertOne(newHotel, function(err, response){
			console.log(response.ops);
			res.status(201).json(response.ops);
		});
	} else {
		console.log("Data missing from body");
		res.status(400).json({ message : "Required data missing from body" });
	}
};

function callCollection(collection){
	return dbconn.get().collection(collection);
};

function offset(req) {
	if (req.query && req.query.offset) {
		return parseInt(req.query.offset, 10);
	} else {
		return 0; // default 0
	}
};

function count(req) {
	if (req.query && req.query.count) {
		return parseInt(req.query.count, 10);
	} else {
		return 5; // default 5
	}
};

