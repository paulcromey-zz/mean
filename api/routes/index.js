var express = require('express');
var router = express.Router();

var hotels = require('../controllers/hotels.js');

router.route('/hotels').get(hotels.getHotels);

router.route('/hotels/:hotelId').get(hotels.getHotel);

module.exports = router;