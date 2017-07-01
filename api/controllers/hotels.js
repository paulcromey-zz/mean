var hotelData = require('../data/hotel-data.json');

module.exports.getHotels = function(req, res) {
	console.log("GET the hotels");
	
	var offset = 0;
	var count = 5;
	
	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}
	
	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}
	
	res.status(200).json(hotelData.slice(offset, offset+count));
};

module.exports.getHotel = function(req, res) {
	console.log("GET the hotel", req.params.hotelId);
	res.status(200).json(hotelData[req.params.hotelId]);
};

module.exports.addHotel = function(req, res) {
	console.log("POST new hotel");
	console.log(req.body);
	res.status(200).json(req.body);
};