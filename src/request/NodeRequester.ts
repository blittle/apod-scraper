///<reference path='../../typescript-def/node.d.ts'/>

import http = module('http');
import request = module('Request');

export class NodeRequester implements request.RequesterInterface {

    getPage(host: string, path: string, callback: Function) : void {

        var options = {
            hostname: host,
            port: 80,
            path: path,
            method: 'GET'
        };
//
        var req = http.request(options, function(res) {
            var body = "";
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function() {
                callback({
                    url : host+path,
                    code: 400,
                    body: body
                });
            });
        });

        req.end();
    }
}