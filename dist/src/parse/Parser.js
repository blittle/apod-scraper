

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
