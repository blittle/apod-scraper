///<reference path='../typescript-def/underscore.d.ts'/>

var DAY = 86400000;

import parse = module('parse/Parser');
import request = module('request/Request');
import Image = module('image/Image');

import _ = module('underscore');

export interface ScraperOptions {
    cache?: bool;
    url?: string;
    path?: string;
}

export class Scraper {

    constructor (
        private requester: request.RequesterInterface,
        private parser   : parse.ParserInterface,
        public  options  : ScraperOptions={}
    ) {

        this.options = _.extend({
            cache: options && options.cache || true,
            url:   options && options.url   || "apod.nasa.gov",
            path:  options && options.path  || "/apod/ap"
        }, this.options);

        this.parser.parse("");
    }

    scrape( depth: number ) : Image.APODImageInterface[] {

        var scrapedImages : Image.APODImageInterface[] = [];

        var date, dateString,
            parser = this.parser;

        while (depth--) {
            date = new Date();
            date = new Date(date.getTime() - ( DAY * depth) );

            dateString = this.getDateString(date);
            this.requester.getPage(
                this.options.url,
                this.options.path + dateString + '.html',
                (body : string) => {
                    scrapedImages.push(parser.parse("body"));
                }
            );
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
