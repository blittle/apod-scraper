var apod;
(function (apod) {
    (function (image) {
        var APODImageImpl = (function () {
            function APODImageImpl(title, description, url, thum) {
                this.title = title;
                this.description = description;
                this.url = url;
                this.thum = thum;
            }
            return APODImageImpl;
        })();
        image.APODImageImpl = APODImageImpl;        
    })(apod.image || (apod.image = {}));
    var image = apod.image;
})(apod || (apod = {}));
