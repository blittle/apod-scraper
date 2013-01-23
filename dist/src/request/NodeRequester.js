var http = require('http')
var request = require("./Request")
var NodeRequester = (function () {
    function NodeRequester() { }
    NodeRequester.prototype.getPage = function (host, path) {
        var options = {
            hostname: host,
            port: 80,
            path: path,
            method: 'GET'
        };
        var req = http.request(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });
        req.end();
        return {
            url: host + path,
            code: 400,
            body: ""
        };
    };
    return NodeRequester;
})();
exports.NodeRequester = NodeRequester;
var Bret = (function () {
    function Bret() {
    }
    return Bret;
})();
exports.Bret = Bret;
