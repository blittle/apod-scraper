/// <references path="Image.ts"/>
/// <references path="Parser.ts"/>
/// <references path="Requester.ts"/>
/// <references path="NodeRequester.ts"/>
module apod {

    var DAY = 86400000;

    export interface ScraperOptions {
        cache : bool;
        url: string;
        path: string;
    }

    export class Scraper {

        private parser : apod.Parser;
        private webRequester: apod.webRequest.Requester;

        constructor ( public options: ScraperOptions ) {
            this.options = this.options || {
                cache: options && options.cache || true,
                url:   options && options.url   || "http://apod.nasa.gov",
                path:  options && options.path  || "/apod/ap"
            };

            this.webRequester = new apod.webRequest.NodeRequester();

            this.parser = new apod.Parser();
        }

        scrape( depth: number ) : apod.APODImage[] {

            if(!depth) return null;

            var scrapedImages : apod.APODImage[] = [];
            var date, dateString, requestResult;

            while (depth--) {
                date = new Date();
                date = new Date(date.getTime() - ( DAY * depth) );

                dateString = this.getDateString(date);
                requestResult = this.webRequester.getPage(this.options.url, this.options.path + dateString + '.html');
                scrapedImages.push(this.parser.parse(""));
            }

            return scrapedImages;
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
}