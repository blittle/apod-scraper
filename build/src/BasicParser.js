var apod;
(function (apod) {
    (function (parser) {
        var BasicParser = (function () {
            function BasicParser() { }
            BasicParser.prototype.parse = function () {
                return "";
            };
            return BasicParser;
        })();
        parser.BasicParser = BasicParser;        
    })(apod.parser || (apod.parser = {}));
    var parser = apod.parser;
})(apod || (apod = {}));
