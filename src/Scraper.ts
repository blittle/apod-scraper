/// <references path="Image.ts"/>
export module apod {

    var DAY = 86400000;

    export interface options {
        cache : bool;
        url: string;
    }

    export class Scraper {
        constructor ( public options: options ) {

        }

        scrape( depth: number ) : image.APODImage[] {

            var scrapedImages : image.APODImage[] = [];

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