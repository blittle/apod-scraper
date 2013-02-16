///<reference path='../typescript-def/restify.d.ts'/>

import Image = module('image/Image');
import db = module('db/MongoDatabase');

import restify = module('restify');

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

server.get(URL_ROOT + '/images/:count', function (req, res, next) {
    var count = req.params.count * 1;
    console.log(count);
    res.send(req.params);
    return next();
});

//apodScraper.scrape(365, saveImage);


