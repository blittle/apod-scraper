var http = require('http')
var request = require("./Request")
var NodeRequester = (function () {
    function NodeRequester() {
    }
    NodeRequester.prototype.getPage = function (host, path, callback) {
        var options = {
            hostname: host,
            port: 80,
            path: path,
            method: 'GET'
        };
        var req = http.request(options, function (res) {
            var body = "";
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                callback({
                    url: host + path,
                    code: 400,
                    body: body
                });
            });
        });
        req.end();
    };
    return NodeRequester;
})();
exports.NodeRequester = NodeRequester;
