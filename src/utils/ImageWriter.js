var gm = require('gm'),
	http = require('http-get'),
	mkdirp = require('mkdirp');

var THUM_W = 300,
	THUM_H = 300,
	QUALITY = 80,
	IMAGES_BASE = "images";

mkdirp(IMAGES_BASE + '/thum');
mkdirp(IMAGES_BASE + '/full');

function createThumb(source, dest, callback) {
	gm(source)
		.thumb(THUM_W, THUM_H, dest, QUALITY, callback);
}

exports.saveImage = function(path, callback) {
	var fileName = path.substring(path.lastIndexOf('/'));
	var fullPath = IMAGES_BASE + '/full/' + fileName;
	var thumPath = IMAGES_BASE + '/thum/' + fileName;

	http.get('http://apod.nasa.gov/apod/' + path, fullPath, function(err) {
		if(err) {
			console.log(err);
			callback(err);
		}
		else {
			console.log('Image downloaded: ' + fullPath);
			createThumb(fullPath, thumPath, function(err) {
				if(err) {
					console.log(err);
					callback(err);
				}
				else {
					console.log('Thumbnail crated: ' + thumPath);
					callback(null, {
						fullPath: fullPath,
						thumPath: thumPath
					});
				}
			})
		}
	});
}