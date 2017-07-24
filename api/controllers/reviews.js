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

var _addReview = function(req, res, hotel) {
	hotel.reviews.push({
		name : req.body.name,
		rating : parseInt(req.body.rating, 10),
		review : req.body.review
	});
	
	hotel.save(function(err, hotelUpdated){
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(201).json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
		}
	});
};

module.exports.addReview = function(req, res) {
	console.log("POST new review");
	Hotel
		.findById(req.params.hotelId)
		.select('reviews')
		.exec(function(err, hotel) {
			var response = {
				status : 200,
				message : []
			};
			if (err) {
				response.status = 500;
				response.message = err;
			} else if (!hotel) {
				response.status = 404;
				response.message = {
					"message" : "Hotel ID not found " + req.params.hotelId
				};
			} 
			if (hotel) {
				_addReview(req, res, hotel);
			} else {
				res
					.status(resonse.status)
					.json(response.message);
			}
		});
};

var _offset = function(req) {
	if (req.query && req.query.offset) {
		return parseInt(req.query.offset, 10);
	} else {
		return 0; // default 0
	}
};

