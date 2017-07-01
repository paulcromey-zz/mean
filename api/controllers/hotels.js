var hotelData = require('../data/hotel-data.json');

module.exports.getHotels = function(req, res) {
	console.log("GET the hotels");
	res.status(200).json(hotelData);
};

module.exports.getHotel = function(req, res) {
	console.log("GET the hotel", req.params.hotelId);
	res.status(200).json(hotelData[req.params.hotelId]);
};