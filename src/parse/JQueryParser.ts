import parser = module("Parser");
import image = module("../image/Image");

export class JQueryParser implements parser.ParserInterface {
    constructor() {};

    public parse(data: string): image.APODImageInterface {
        return new image.APODImage("","","","");
    }
}