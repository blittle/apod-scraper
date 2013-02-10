var database = require("./Database")

var MongooseDatabase = (function () {
    function MongooseDatabase(url, user, pass) {
        if (typeof url === "undefined") { url = "localhost"; }
        if (typeof user === "undefined") { user = ""; }
        if (typeof pass === "undefined") { pass = ""; }
        this.url = url;
        this.user = user;
        this.pass = pass;
    }
    MongooseDatabase.prototype.saveImage = function (image) {
    };
    MongooseDatabase.prototype.getImage = function (id) {
        return null;
    };
    MongooseDatabase.prototype.getImages = function (total) {
        return null;
    };
    MongooseDatabase.prototype.getImagesRange = function (start, end) {
        if(end) {
        } else {
        }
        return null;
    };
    return MongooseDatabase;
})();
exports.MongooseDatabase = MongooseDatabase;
