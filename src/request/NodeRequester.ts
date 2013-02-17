///<reference path='../../typescript-def/node.d.ts'/>

import http = module('http');
import request = module('Request');

export class NodeRequester implements request.RequesterInterface {

    constructor() {}

    getPage(host: string, path: string, date: Date, callback: Function) : void {

        console.log(new Date() + ' : ' + 'Retrieving url: ' + path);

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
                    date: date,
                    body: body
                });
            });
        });

        req.end();
    }
}