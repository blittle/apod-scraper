///<reference path='../../typescript-def/cheerio.d.ts'/>
///<reference path='../../typescript-def/underscore.d.ts'/>

import parser = module("Parser");
import image = module("../image/Image");
import cheerio = module("cheerio");
import _ = module("underscore");
import request = module("../request/Request");

var PUBLIC_DOMAIN = ["esa", "nasa", "wikipedia", "edu"];

export class CheerioParser implements parser.ParserInterface {

    constructor() {};

    public parse(response: request.Response): image.APODImage {

        var $ = cheerio.load(response.body),
            $center = $('center');

        var title = $center.eq(1).find('b').eq(0).text(),
            lores = $center.eq(0).find('a').eq(1).children().attr('SRC'),
            hires = $center.eq(0).find('a').eq(1).attr('href'),
            desc  = $center.eq(1).next().html();

        var copyrights : image.copyright[] = [];

        $('center').eq(1).find('a').each((index, element) => {
            var name = $(element).text(),
                url = $(element).attr('href');

            var publicDomain = this.isPublicDomain(name, url);

            // Skip over elements that refer to the APOD Copyright page
            if(name !== "Copyright") {
                copyrights.push({
                    name: name,
                    url: url,
                    publicDomain: publicDomain
                });
            }
        });

        return {
            title: title,
            description: desc,
            copyrights: copyrights,
            url: response.url,
            image: {
                loRes: lores,
                hiRes: hires
            }
        };
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