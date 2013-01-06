/// <references path="Image.ts"/>
module apod.parser {

    export interface ParserInterface {
        parse() : apod.image.APODImage;
    }

    export class Parser implements ParserInterface {
        public parse(): apod.image.APODImage {
            return null;
        }
    }
}