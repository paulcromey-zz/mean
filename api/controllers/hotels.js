var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;

module.exports.getHotels = function(req, res) {
	callCollection('hotels').find().skip(offset(req)).limit(count(req)).toArray(function(err, hotels) {
		if (err) {
			const message = "DB call failed";
			console.log(message, err);
			res.status(500).json(message);
		}
		if (hotels) {
			console.log("Found hotels", hotels);
			res.status(200).json(hotels);
		} else {
			res.status(200).json({});
		}
		
	});
};

module.exports.getHotel = function(req, res) {
	callCollection('hotels').findOne({ _id : ObjectId(req.params.hotelId) }, function(err, hotel) {
		if (err) {
			const message = "DB call failed";
			console.log(message, err);
			res.status(500).json(message);
		}
		if (hotel) {
			console.log("Found hotel", hotel);
			res.status(200).json(hotel);
		} else {
			res.status(200).json({});
		}
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

