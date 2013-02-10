///<reference path='../../typescript-def/mongodb.d.ts'/>
///<reference path='../../typescript-def/underscore.d.ts'/>
var mongo = require("mongojs");


import database = module("Database");
import image = module("../image/Image");
import utils = module("../utils/APODUtils");

/**
 * Should be a unique index on the date attribute,
 * because there is always only one image per day.
 * The code also assumes this to prevent duplicates
 *
 * @todo - remove this index dependency (or at least have it auto indexed)
 * Mongo Query: db.images.ensureIndex( {"date": 1}, {unique: true})
 *
 */

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

    saveImage (image: image.APODImage) : MongoDatabase {
        this.connect(() => {
            this.db['images'].save(image, function(err, saved) {
                if( err || !saved ) console.log("Image not saved");
            });
        });

        return this;
    }

    getImage (date: Date, callback: Function) : MongoDatabase {

        date = utils.APODUtils.getNormalizedDate(date);

        this.connect(() => {
           this.db.images.find({date: date}, callback);
        });

        return this;
    }

    getImages (total: number, callback: Function) : MongoDatabase {
        this.connect();
        return this;
    }

    getImagesRange (start: Date, end: any, callback?: Function) : MongoDatabase {

        if(!callback) {
            callback = end;
            end = utils.APODUtils.getNormalizedDate(new Date());
        }

        this.connect();

        return this;
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