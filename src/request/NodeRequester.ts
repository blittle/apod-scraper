///<reference path='../../typescript-def/node.d.ts'/>

import http = module('http');
import request = module('Request');

export class NodeRequester implements request.Requester {

    getPage(host: string, path: string) {

        var options = {
            hostname: host,
            port: 80,
            path: path,
            method: 'GET'
        };
//
        var req = http.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });

        req.end();

        return {
            url : host+path,
            code: 400,
            body: ""
        }
    }
}

export class Bret {
    constructor () {

    }
}
