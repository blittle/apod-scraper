

var GenericParser = (function () {
    function GenericParser() {
    }
    GenericParser.prototype.parse = function (response) {
        return {
            title: "",
            description: "",
            url: "",
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
