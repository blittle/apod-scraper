
var db = require("./db/MongoDatabase");

var restify = require('restify');

var mdb = new db.MongoDatabase();

var date;

var URL_ROOT = "apod";

var server = restify.createServer({
    name: 'APOD Service',
    version: '0.8.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());

server.get(URL_ROOT + '/images/:count', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var count = req.params.count * 1;

    console.log(new Date() + ' : ' + ' Web service request: ' + req.path());

    mdb.getImages(count, function (error, images) {
        if (error) {
            next(new restify.InternalError(error));
        } else {
            res.send(images);
            next();
        }
    });
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

