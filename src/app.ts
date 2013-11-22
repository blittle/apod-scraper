///<reference path='../typescript-def/restify.d.ts'/>

import Image = require('Image/Image');
import db = require('db/MongoDatabase');

import restify = require('restify');

var mdb = new db.MongoDatabase();

var date;

var URL_ROOT = "apod"

var server = restify.createServer({
	name: 'APOD Service',
	version: '0.8.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
//server.use(restify.bodyParser());

server.get(URL_ROOT + '/images/:count', (req, res, next) => {

	// Resitify currently has a bug which doesn't allow you to set default headers
	// This headers comply with CORS and allow us to server our response to any origin
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var count = req.params.count * 1;

	console.log(new Date() + ' : ' + ' Web service request: ' + req.path());

	mdb.getImages(count, (error: Error, images: Image.APODImage[]) => {
		if(error) {
			next(new restify.InternalError(error));
		} else {
			res.send(images);
			next();
		}
	});
});

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});

//apodScraper.scrape(365, saveImage);


