///<reference path='../typescript-def/underscore.d.ts'/>

var DAY = 86400000;

import parse = module('parse/Parser');
import nodeRequest = module('request/NodeRequester');
import request = module('request/Request');
import Image = module('image/Image');

import _ = module('underscore');

export interface ScraperOptions {
    cache?: bool;
    url?: string;
    path?: string;
}

export class Scraper {

    private parser : parse.Parser;
    private webRequester: request.Requester;

    constructor ( public options: ScraperOptions={} ) {

        this.options = _.extend({
            cache: options && options.cache || true,
            url:   options && options.url   || "http://apod.nasa.gov",
            path:  options && options.path  || "/apod/ap"
        }, this.options);

        this.webRequester = new nodeRequest.NodeRequester();
        this.parser = new parse.Parser();
    }

    scrape( depth: number ) : Image.APODImage[] {

        var scrapedImages : Image.APODImage[] = [];

        var date, dateString, requestResult;

        while (depth--) {
            date = new Date();
            date = new Date(date.getTime() - ( DAY * depth) );

            dateString = this.getDateString(date);
            requestResult = this.webRequester.getPage(this.options.url, this.options.path + dateString + '.html');
            scrapedImages.push(this.parser.parse(""));
        }

        return [];
    }

    /**
     * Output a date into the format YYMMDD - 130105
     * @param date
     */
    private getDateString ( date: Date ) : string {
        var dateString = (date.getFullYear() + "").substring(2);

        if(date.getMonth() < 9) {
            dateString += "0" + (date.getMonth()+1);
        } else {
            dateString += (date.getMonth()+1);
        }

        if(date.getDate() < 10) {
            dateString += "0" + date.getDate();
        } else {
            dateString += date.getDate();
        }

        return dateString;
    }
}
