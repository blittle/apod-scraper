import image = module('../image/Image');

export interface DatabaseInterface {
    saveImage (image: image.APODImage) : void;
    getImage (id: string) : image.APODImage;
    getImages (total: number) : image.APODImage[];
    getImagesRange (start: Date, end: Date) : image.APODImage[];
    getImagesRange (start: Date) : image.APODImage[];
}

export class DatabaseImpl {

}