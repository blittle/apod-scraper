///<reference path='../typescript-def/underscore.d.ts'/>

var DAY = 86400000;

import parse = require('parse/Parser');
import request = require('request/Request');
import Image = require('Image/Image');
import utils = require('utils/APODUtils');

import _ = require('underscore');

export interface ScraperOptions {
	cache?: boolean;
	url?: string;
	path?: string;
}

export class Scraper {

	constructor (
		private requester: request.RequesterInterface,
		private parser   : parse.ParserInterface,
		public  options  : ScraperOptions={}
		) {
		this.options = _.extend({
			cache: options && options.cache || true,
			url:   options && options.url   || "apod.nasa.gov",
			path:  options && options.path  || "/apod/ap"
		}, this.options);
	}

	scrape( depth: number, callback: Function ) : Image.APODImage[] {
		var date, dateString,
			parser = this.parser;

		while (depth--) {
			date = new Date();
			date = new Date(date.getTime() - ( DAY * depth) );

			dateString = utils.APODUtils.getDateString(date);
			this.requester.getPage(
				this.options.url,
				this.options.path + dateString + '.html',
				utils.APODUtils.getNormalizedDate(date),
				(data : request.Response) => {
					callback(parser.parse(data));
				}
			);
		}

		return [];
	}

	scrapeToday(callback: Function) : void {
		this.scrapeDate( new Date(), callback);
	}

	scrapeDate( date: Date, callback: Function) : void {
		var dateString = utils.APODUtils.getDateString(new Date()),
			parser = this.parser;

		this.requester.getPage(
			this.options.url,
			this.options.path + dateString + '.html',
			utils.APODUtils.getNormalizedDate(new Date()),
			(data : request.Response) => {
				callback(parser.parse(data));
			}
		);
	}
}