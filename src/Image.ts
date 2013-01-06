export module apod.image {

    export interface APODImage {
        title: string;
        description: string;
        url: string;
        thum: string;
    }

    export class APODImageImpl implements APODImage {

        constructor (
            public title: string,
            public description: string,
            public url: string,
            public thum: string
        ) {

        }
    }
}