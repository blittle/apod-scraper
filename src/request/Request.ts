export interface Page {
    url : string;
    code: number;
    body: string;
}

export interface Requester {
    getPage(host: string, path: string, callback: Function) : void;
}

export class GenericRequester implements Requester {
    getPage(host: string, path: string, callback: Function) {

    }
}
