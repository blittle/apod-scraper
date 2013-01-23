export interface Page {
    url : string;
    code: number;
    body: string;
}

export interface RequesterInterface {
    getPage(host: string, path: string, callback: Function) : void;
}

export class GenericRequester implements RequesterInterface {
    getPage(host: string, path: string, callback: Function) {

    }
}
