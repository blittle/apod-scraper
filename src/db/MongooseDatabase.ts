import database = module("Database");
import image = module("../image/Image");

export class MongooseDatabase implements database.DatabaseInterface {

    constructor(
        private url: string = "localhost",
        private user: string = "",
        private pass: string = ""
    ) {};

    saveImage (image: image.APODImage) : void {

    }

    getImage (id: string) : image.APODImage {
        return null;
    }

    getImages (total: number) : image.APODImage[] {
        return null;
    }

    getImagesRange (start: Date, end?: Date) : image.APODImage[] {

        if(end) {

        } else {

        }

        return null;
    }
}