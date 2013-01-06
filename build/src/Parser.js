var apod;
(function (apod) {
    (function (parser) {
        var Parser = (function () {
            function Parser() { }
            Parser.prototype.parse = function () {
                return null;
            };
            return Parser;
        })();
        parser.Parser = Parser;        
    })(apod.parser || (apod.parser = {}));
    var parser = apod.parser;
})(apod || (apod = {}));
