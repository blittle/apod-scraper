/// <references path="Image.ts"/>
module apod {

    var DAY = 86400000;

    export interface ScraperOptions {
        cache : bool;
        url: string;
    }

    export class Scraper {
        constructor ( public options: ScraperOptions ) {

        }

        scrape( depth: number ) : apod.image.APODImage[] {

            var scrapedImages : apod.image.APODImage[] = [];

            var date;

            while (depth--) {
                date = new Date();
                date = new Date(date.getTime() - ( DAY * depth) );

                //Date format YYMMDD - 130105
                console.log(date.getYear() + "" + (date.getMonth()+1) + "" + date.getDate() );
            }

            return scrapedImages;
        }
    }
}