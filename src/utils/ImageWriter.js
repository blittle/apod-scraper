var gm = require('gm'),
	http = require('http-get'),
	mkdirp = require('mkdirp');

var THUM_W = 300,
	THUM_H = 300,
	QUALITY = 80,
	IMAGES_BASE = "images";

mkdirp(IMAGES_BASE + '/thum');
mkdirp(IMAGES_BASE + '/full');
mkdirp(IMAGES_BASE + '/med');

function createThumb(source, thumPath, medPath, callback) {
	gm(source)
		.thumb(THUM_W, THUM_H, thumPath, QUALITY, function(err) {
			if(err) return callback(err);
			gm(source)
				.thumb(THUM_W * 2, THUM_H * 2, medPath, QUALITY, callback);
		});
}

exports.saveImage = function(path, callback) {
	var fileName = path.substring(path.lastIndexOf('/') + 1);
	var fullPath = IMAGES_BASE + '/full/' + fileName;
	var thumPath = IMAGES_BASE + '/thum/' + fileName;
	var medPath = IMAGES_BASE + '/med/' + fileName;

	http.get('http://apod.nasa.gov/apod/' + path, fullPath, function(err) {
		if(err) {
			console.log(err);
			callback(err);
		}
		else {
			console.log('Image downloaded: ' + fullPath);
			createThumb(fullPath, thumPath, medPath, function(err) {
				if(err) {
					console.log("cannot create thum, is graphicsmagick installed?");
					console.log(err);
					callback(err);
				}
				else {
					console.log('Thumbnail crated: ' + thumPath);
					callback(null, {
						fullPath: fullPath,
						thumPath: thumPath,
						medPath: medPath
					});
				}
			})
		}
	});
}
