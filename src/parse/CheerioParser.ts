///<reference path='../../typescript-def/cheerio.d.ts'/>
///<reference path='../../typescript-def/underscore.d.ts'/>

import parser = module("Parser");
import image = module("../image/Image");
import cheerio = module("cheerio");
import _ = module("underscore");

var PUBLIC_DOMAIN = ["esa", "nasa", "wikipedia", "edu"];

interface copyright {
    name: string;
    url: string;
    publicDomain: bool;
}

export class CheerioParser implements parser.ParserInterface {
    constructor() {};

    public parse(data: string): image.APODImageInterface {

        var $ = cheerio.load(data);

        var title : string = $('center').eq(1).find('b').eq(0).text();
        var copyrights : copyright[] = [];

        $('center').eq(1).find('a').each((index, element) => {
            //Skip the first element
            var name = $(element).text();
            var url = $(element).attr('href');
            var publicDomain = this.isPublicDomain(name, url);

            // Skip over elements that refer to the APOD Copyright page
            if(name !== "Copyright") {
                copyrights.push({
                    name: name,
                    url: url,
                    publicDomain: publicDomain
                });

                console.log(name, url, publicDomain);
            }
        });

        return new image.APODImage("","","","");
    }

    private isPublicDomain(name: string, url: string) : bool {
        name = name.toLowerCase();

        for(var i = 0; i < PUBLIC_DOMAIN.length; i++) {
            if( name.indexOf(PUBLIC_DOMAIN[i]) !== -1 || url.indexOf(PUBLIC_DOMAIN[i]) !== -1 ) {
                return true;
            }
        }

        return false;
    }
}