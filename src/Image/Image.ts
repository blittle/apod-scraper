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

    image : {
        loRes: string;
        hiRes: string;
    };
}