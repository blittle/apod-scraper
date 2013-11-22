///<reference path='../Image/Image.ts'/>
///<reference path='../request/Request.ts'/>



var GenericParser = (function () {
    function GenericParser() {
    }
    GenericParser.prototype.parse = function (response) {
        return {
            title: "",
            description: "",
            url: "",
            date: new Date(),
            copyrights: [],
            image: {
                loRes: "",
                hiRes: ""
            }
        };
    };
    return GenericParser;
})();
exports.GenericParser = GenericParser;

//# sourceMappingURL=Parser.js.map
