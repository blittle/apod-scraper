import database = require("Database");
import image = require("../Image/Image");

export class MongooseDatabase implements database.DatabaseInterface {

	constructor(
		private url : string = "localhost",
		private dbPath  : string = "apod",
		private user: string = "",
		private pass: string = ""
	) {}

	saveImage (image: image.APODImage) : MongooseDatabase {
		return null;
	}

	getImage (date: Date, callback: Function) : MongooseDatabase {
		return this;
	}

	getImages (total: number, callback: Function) : MongooseDatabase {
		return this;
	}

	getImagesRange (start: Date, end: any, callback?: Function) : MongooseDatabase {

		if(end) {

		} else {

		}

		return this;
	}
}