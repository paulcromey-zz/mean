var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var FOUR_ZERO_FOUR_MESSAGE = "Not Found";

module.exports.getReviews = function(req, res) {
	
	Hotel.findById(req.params.hotelId).exec(function(err, hotel) {
		if(hotel.reviews){
			res.status(200).json(hotel.reviews);
		} else {
			res.status(404).json({
				"message" : FOUR_ZERO_FOUR_MESSAGE
			});
		}
	});
		
};

module.exports.getReview = function(req, res) {
	
	Hotel.findById(req.params.hotelId).exec(function(err, hotel) {
		if(hotel.reviews.id(req.params.reviewId)){
			res.status(200).json(hotel.reviews.id(req.params.reviewId));
		} else {
			res.status(404).json({
				"message" : FOUR_ZERO_FOUR_MESSAGE
			});
		}
	});
		
};

