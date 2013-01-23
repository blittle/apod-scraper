import image = module("../image/Image");

export interface ParserInterface {
    parse(data: string) : image.APODImage;
}

export class Parser implements ParserInterface {
    constructor() {};

    public parse(data: string): image.APODImage {
        return new image.APODImageImpl("","","","");
    }
}
