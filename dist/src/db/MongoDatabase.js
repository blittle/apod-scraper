var mongo = require("mongojs");
var database = require("./Database")

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
        this.connect(function () {
            console.log(image);
        });
    };
    MongoDatabase.prototype.getImage = function (id) {
        this.connect();
        return null;
    };
    MongoDatabase.prototype.getImages = function (total) {
        this.connect();
        return null;
    };
    MongoDatabase.prototype.getImagesRange = function (start, end) {
        this.connect();
        if(end) {
        } else {
        }
        return null;
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
