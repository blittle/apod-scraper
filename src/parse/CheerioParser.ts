///<reference path='../../typescript-def/cheerio.d.ts'/>

import parser = module("Parser");
import image = module("../image/Image");
import cheerio = module("cheerio");

export class CheerioParser implements parser.ParserInterface {
    constructor() {};

    public parse(data: string): image.APODImageInterface {

        cheerio.load(data);

        return new image.APODImage("","","","");
    }
}