var hotelData = require('../data/hotel-data.json');

module.exports.getAllHotels = function(req, res) {
	console.log("GET the hotel data");
	res.status(200).json(hotelData);
};