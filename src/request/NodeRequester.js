///<reference path='../../typescript-def/node.d.ts'/>
var http = require('http');


var NodeRequester = (function () {
    function NodeRequester() {
    }
    NodeRequester.prototype.getPage = function (host, path, date, callback) {
        console.log(new Date() + ' : ' + 'Retrieving url: ' + path);

        var options = {
            hostname: host,
            port: 80,
            path: path,
            method: 'GET'
        };

        //
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
                    date: date,
                    body: body
                });
            });
        });

        req.end();
    };
    return NodeRequester;
})();
exports.NodeRequester = NodeRequester;

//# sourceMappingURL=NodeRequester.js.map
