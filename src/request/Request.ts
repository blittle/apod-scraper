import request = module('Page');

export interface Requester {
    getPage(host: string, path: string) : request.Page;
}

