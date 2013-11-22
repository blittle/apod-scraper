///<reference path='../Image/Image.ts'/>
///<reference path='../request/Request.ts'/>

import image = require("../Image/Image");
import request = require("../request/Request");

export interface ParserInterface {
	parse(response: request.Response) : image.APODImage;
}

export class GenericParser implements ParserInterface {
	constructor() {}

	public parse(response: request.Response): image.APODImage {
		return {
			title: "",
			description: "",
			url: "",
			date: new Date(),
			copyrights: [],
			image: {
				loRes: "",
				hiRes: ""
			}
		};
	}
}