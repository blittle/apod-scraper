import image = module("../image/Image");

export interface ParserInterface {
    parse(data: string) : image.APODImageInterface;
}

export class GenericParser implements ParserInterface {
    constructor() {};

    public parse(data: string): image.APODImageInterface {
        return new image.APODImage("","","","");
    }
}
