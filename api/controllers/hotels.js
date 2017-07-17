var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.getHotels = function(req, res) {
	
	Hotel.find().skip(offset(req)).limit(count(req)).exec(function(err, hotels) {
		res.json(hotels);
	});
		
};

module.exports.getHotel = function(req, res) {
	
	Hotel.findById(req.params.hotelId).exec(function(err, hotel) {
		res.status(200).json(hotel);
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

