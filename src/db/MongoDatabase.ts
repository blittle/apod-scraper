///<reference path='../../typescript-def/mongodb.d.ts'/>
///<reference path='../../typescript-def/underscore.d.ts'/>
var mongo = require("mongojs");


import database = module("Database");
import image = module("../image/Image");

export class MongoDatabase implements database.DatabaseInterface {

    connected = false;
    collection = "images";
    db = null;

    constructor(
        private url : string = "localhost",
        private dbPath  : string = "apod",
        private user: string = "",
        private pass: string = ""
    ) {};

    saveImage (image: image.APODImage) : void {

        this.connect(() => {
            console.log(image);
//            this.db['images'].save(image, function(err, saved) {
//                if( err || !saved ) console.log("Image not saved");
//            });
        });
    }

    getImage (id: string) : image.APODImage {
        this.connect();
        return null;
    }

    getImages (total: number) : image.APODImage[] {
        this.connect();
        return null;
    }

    getImagesRange (start: Date, end?: Date) : image.APODImage[] {
        this.connect();

        if(end) {

        } else {

        }

        return null;
    }

    private connect(callback?: Function): void {
        if(this.connected) {
            if(callback) callback.call(this);
            return;
        }

        var scope = this;

        console.log("Connecting to db ", this.url);

        this.db = mongo.connect(this.dbPath, [this.collection], function(err) {
            if(err) {
                scope.connected = false;
                console.error("Cannot connect: " + err);
            }
        });

        scope.connected = true;
        if(callback) callback.call(scope);
    }
}