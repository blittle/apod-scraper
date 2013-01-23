export interface Page {
    url : string;
    code: number;
    body: string;
}

export interface Requester {
    getPage(host: string, path: string) : Page;
}

export class GenericRequester implements Requester {
    getPage(host: string, path: string) {
        return {
            url: "",
            code: 0,
            body: ""
        }
    }
}
