var GenericRequester = (function () {
    function GenericRequester() { }
    GenericRequester.prototype.getPage = function (host, path) {
        return {
            url: "",
            code: 0,
            body: ""
        };
    };
    return GenericRequester;
})();
exports.GenericRequester = GenericRequester;
