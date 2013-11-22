export interface Response {
	url : string;
	code: number;
	body: string;
	date: Date;
}

export interface RequesterInterface {
	getPage(host: string, path: string, date: Date, callback: Function) : void;
}

export class GenericRequester implements RequesterInterface {
	getPage(host: string, path: string, date: Date, callback: Function) {

	}
}
