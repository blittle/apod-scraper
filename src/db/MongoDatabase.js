var mongo = require("mongojs");



var utils = require("../utils/APODUtils");

var MongoDatabase = (function() {
	function MongoDatabase(url, dbPath, user, pass) {
		if (typeof url === "undefined") {
			url = "localhost";
		}
		if (typeof dbPath === "undefined") {
			dbPath = "apod";
		}
		if (typeof user === "undefined") {
			user = "";
		}
		if (typeof pass === "undefined") {
			pass = "";
		}
		this.url = url;
		this.dbPath = dbPath;
		this.user = user;
		this.pass = pass;
		this.connected = false;
		this.collection = "images";
		this.db = null;
	}
	MongoDatabase.prototype.saveImage = function(image) {
		var _this = this;
		var logPath = image.url;

		this.connect(function() {
			_this.db.images.find({
				url: logPath
			}, function(err, images) {
				if (!err && (!images || !images.length)) {
					_this.db.images.save(image, function(err, saved) {
						if (err || !saved) {
							console.log(new Date() + ' : ' + "Image not saved: " + logPath);
						} else {
							console.log(new Date() + ' : ' + 'Saving to db: ' + logPath);
						}
					});
				} else {
					console.log('Image already in db');
				}
			});
		});

		return this;
	};

	MongoDatabase.prototype.getImage = function(date, callback) {
		var _this = this;
		date = utils.APODUtils.getNormalizedDate(date);

		this.connect(function() {
			_this.db.images.find({
				date: date
			}, callback);
		});

		return this;
	};

	MongoDatabase.prototype.getImages = function(page, callback) {
		var total = 50;
		var index = (page - 1) * 50;

		return this.getImagesRange(index, total,
			callback
		);
	};

	MongoDatabase.prototype.getImagesRange = function(skip, total, callback) {
		var _this = this;

		this.connect(function() {
			_this.db.images
				.find({})
				.skip(skip)
				.limit(total)
				.toArray(function(err, images) {
					callback(err, images);
				});
		});

		return this;
	};

	MongoDatabase.prototype.connect = function(callback) {
		if (this.connected) {
			if (callback)
				callback.call(this);
			return;
		}

		var scope = this;

		console.log("Connecting to db ", this.url);

		this.db = mongo.connect(this.dbPath, [this.collection], function(err) {
			if (err) {
				scope.connected = false;
				console.error("Cannot connect: " + err);
			}
		});

		scope.connected = true;
		if (callback)
			callback.call(scope);
	};
	return MongoDatabase;
})();
exports.MongoDatabase = MongoDatabase;
