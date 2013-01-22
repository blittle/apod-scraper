module apod.webRequest {

    export interface Page {
        url : string;
        code: number;
        body: string;
    }

    export interface Requester {
        getPage(host: string, path: string) : Page;
    }
}
