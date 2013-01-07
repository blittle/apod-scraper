/// <references path="Image.ts"/>
module apod {

    export interface ParserInterface {
        parse(data: string) : apod.APODImage;
    }

    export class Parser implements ParserInterface {
        constructor() {};

        public parse(data: string): apod.APODImage {
            return new apod.APODImageImpl("","","","");
        }
    }
}