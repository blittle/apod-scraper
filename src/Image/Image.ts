export interface APODImageInterface {
    title: string;
    description: string;
    url: string;
    thum: string;
}

export class APODImage implements APODImageInterface {

    constructor (
        public title: string,
        public description: string,
        public url: string,
        public thum: string
    ) {

    }
}
