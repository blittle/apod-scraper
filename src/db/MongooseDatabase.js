


var MongooseDatabase = (function () {
    function MongooseDatabase(url, dbPath, user, pass) {
        if (typeof url === "undefined") { url = "localhost"; }
        if (typeof dbPath === "undefined") { dbPath = "apod"; }
        if (typeof user === "undefined") { user = ""; }
        if (typeof pass === "undefined") { pass = ""; }
        this.url = url;
        this.dbPath = dbPath;
        this.user = user;
        this.pass = pass;
    }
    MongooseDatabase.prototype.saveImage = function (image) {
        return null;
    };

    MongooseDatabase.prototype.getImage = function (date, callback) {
        return this;
    };

    MongooseDatabase.prototype.getImages = function (total, callback) {
        return this;
    };

    MongooseDatabase.prototype.getImagesRange = function (start, end, callback) {
        if (end) {
        } else {
        }

        return this;
    };
    return MongooseDatabase;
})();
exports.MongooseDatabase = MongooseDatabase;

