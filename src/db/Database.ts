import image = require('../Image/Image');

export interface DatabaseInterface {
	saveImage (image: image.APODImage) : DatabaseInterface;

	getImage (
		date: Date,
		callback: (error: Error, image: image.APODImage) => any
		) : DatabaseInterface;

	getImages (
		total: number,
		callback: (error: Error, image: image.APODImage[]) => any
		) : DatabaseInterface;

	getImagesRange (
		start: Date,
		callback: (error: Error, images: image.APODImage[]) => any
		) : DatabaseInterface;

	getImagesRange (
		start: Date,
		end: Date,
		callback: (error: Error, images: image.APODImage[]) => any
		) : DatabaseInterface;
}

export class DatabaseImpl {

}