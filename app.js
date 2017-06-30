const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const Console = require('console').Console;

const logger = new Console(fs.createWriteStream('./stdout.log'));

app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/json', function(req, res) {
	logger.time('INFO : method json');
	res.status(200).json( {"jsonData" : false});
	logger.timeEnd('INFO : method json');
});

app.get('/file', function(req, res) {
	logger.time('INFO : method file');
	const code = 200;
	logger.error('ERROR :', code);
	logger.info('INFO :', code);
	res.status(200).sendFile(path.join(__dirname, 'app.js'));
	logger.timeEnd('INFO : method file');
});

const server = app.listen(app.get('port'), function() {
	var port = server.address().port;
	console.info('Magic happens on port ' + port);
});  
