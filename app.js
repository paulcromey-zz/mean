const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const routes = require('./api/routes');

const Console = require('console').Console;
const logger = new Console(fs.createWriteStream('./log/stdout.log'), fs.createWriteStream('./log/stderr.log'));

app.set('port', 3000);

app.use(function(req, res, next){
	logger.info(req.method, req.url);
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

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
	logger.info('Magic happens on port ' + port);
});  
