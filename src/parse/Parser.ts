import image = module("../image/Image");
import request = module("../request/Request");

export interface ParserInterface {
    parse(response: request.Response) : image.APODImage;
}

export class GenericParser implements ParserInterface {
    constructor() {};

    public parse(response: request.Response): image.APODImage {
        return {
            title: "",
            description: "",
            url: "",
            copyrights: [],
            image: {
                loRes: "",
                hiRes: ""
            }
        };
    }
}
