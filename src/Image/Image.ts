export interface copyright {
    name: string;
    url: string;
    publicDomain: bool;
}

export interface APODImage {
    title: string;
    description: string;
    url: string;
    copyrights: copyright[];
    date: Date;
    _id ?: any;

    image : {
        loRes: string;
        hiRes: string;
    };
}