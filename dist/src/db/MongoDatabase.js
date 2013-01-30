var database = require("./Database")

var MongoDatabase = (function () {
    function MongoDatabase() {
    }
    MongoDatabase.prototype.saveImage = function (image) {
    };
    MongoDatabase.prototype.getImage = function (id) {
        return null;
    };
    MongoDatabase.prototype.getImages = function (total) {
        return null;
    };
    MongoDatabase.prototype.getImagesRange = function (start, end) {
        if(end) {
        } else {
        }
        return null;
    };
    return MongoDatabase;
})();
exports.MongoDatabase = MongoDatabase;
