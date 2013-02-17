var mongo = require("mongojs");
var database = require("./Database")

var utils = require("../utils/APODUtils")
var MongoDatabase = (function () {
    function MongoDatabase(url, dbPath, user, pass) {
        if (typeof url === "undefined") { url = "localhost"; }
        if (typeof dbPath === "undefined") { dbPath = "apod"; }
        if (typeof user === "undefined") { user = ""; }
        if (typeof pass === "undefined") { pass = ""; }
        this.url = url;
        this.dbPath = dbPath;
        this.user = user;
        this.pass = pass;
        this.connected = false;
        this.collection = "images";
        this.db = null;
    }
    MongoDatabase.prototype.saveImage = function (image) {
        var _this = this;
        console.log(new Date() + ' : ' + 'Saving to db: ' + this.url + '/' + this.dbPath);
        this.connect(function () {
            _this.db.images.save(image, function (err, saved) {
                if(err || !saved) {
                    console.log("Image not saved");
                }
            });
        });
        return this;
    };
    MongoDatabase.prototype.getImage = function (date, callback) {
        var _this = this;
        date = utils.APODUtils.getNormalizedDate(date);
        this.connect(function () {
            _this.db.images.find({
                date: date
            }, callback);
        });
        return this;
    };
    MongoDatabase.prototype.getImages = function (total, callback) {
        var date = new Date();
        return this.getImagesRange(new Date(date.getTime() - (total * 86400000)), date, callback);
    };
    MongoDatabase.prototype.getImagesRange = function (start, end, callback) {
        var _this = this;
        console.log(new Date() + ' : ' + 'Pulling from db: ' + this.url + '/' + this.dbPath);
        if(!callback) {
            callback = end;
            end = utils.APODUtils.getNormalizedDate(new Date());
        }
        this.connect(function () {
            _this.db.images.find({
                date: {
                    "$gte": start,
                    "$lt": end
                }
            }, callback);
        });
        return this;
    };
    MongoDatabase.prototype.connect = function (callback) {
        if(this.connected) {
            if(callback) {
                callback.call(this);
            }
            return;
        }
        var scope = this;
        console.log("Connecting to db ", this.url);
        this.db = mongo.connect(this.dbPath, [
            this.collection
        ], function (err) {
            if(err) {
                scope.connected = false;
                console.error("Cannot connect: " + err);
            }
        });
        scope.connected = true;
        if(callback) {
            callback.call(scope);
        }
    };
    return MongoDatabase;
})();
exports.MongoDatabase = MongoDatabase;
