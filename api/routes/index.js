var express = require('express');
var router = express.Router();

var hotels = require('../controllers/hotels.js');

router.route('/hotels').get(hotels.getAllHotels);

module.exports = router;