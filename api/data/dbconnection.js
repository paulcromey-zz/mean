var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanhotel';

var _connection = null;

var open = function() {
	MongoClient.connect(dburl, function(err, db) {
		if (err) {
			console.log("DB connection failed");
			return;
		}
		_connecton = db;
		console.log("DB connection open", db);
	});
};

var get = function() {
	return _connecton;
};

module.exports = {
		open : open,
		get : get
}