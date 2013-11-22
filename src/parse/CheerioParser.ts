///<reference path='../../typescript-def/cheerio.d.ts'/>
///<reference path='../../typescript-def/underscore.d.ts'/>
///<reference path='../../typescript-def/underscore.string.d.ts'/>

///<reference path='../Image/Image.ts'/>
///<reference path='../request/Request.ts'/>
///<reference path='Parser.ts'/>

import parser = require("Parser");
import image = require("../Image/Image");
import request = require("../request/Request");

import cheerio = require("cheerio");
import _ = require("underscore");
import _s = require("underscore.string");

var PUBLIC_DOMAIN = ["esa", "nasa", "wikipedia", "edu", "observatory", "gov"];

export class CheerioParser implements parser.ParserInterface {

	constructor() {}

	public parse(response: request.Response): image.APODImage {

		var $ = cheerio.load(response.body),
			$center = $('center');

		var title = $center.eq(1).find('b').eq(0).text(),
			lores = $center.eq(0).find('a').eq(1).children().attr('SRC'),
			hires = $center.eq(0).find('a').eq(1).attr('href'),
			desc  = $center.eq(1).next().html();

		if(!title || !desc) {
			console.warn('Cannot parse: ' + response.url);
			return null;
		}

		// If lores/hires are undefined, assume the content is a video
		// from youtube or vimeo and get its src instead
		if(!hires) {
			hires = $center.eq(0).find('iframe').attr('src');
		}

		desc = desc.substring(0, desc.indexOf('<p>'));

		var copyrights : image.copyright[] = [];

		var links: Cheerio = $('center').eq(1).find('a');

		links.each((index:any, element:any): any => {
			var name = $(element).text(),
				url = $(element).attr('href');

			if(!name || !url) {
				console.warn("Cannot parse copyrights of: " + response.url);
				return;
			}

			var publicDomain = this.isPublicDomain(name, url);

			// Skip over elements that refer to the APOD Copyright page
			if(name !== "Copyright") {
				copyrights.push({
					name: _s.trim(name),
					url: url,
					publicDomain: publicDomain
				});
			}
		});

		return {
			title: _s.capitalize(_s.trim(title)),
			description: _s.trim(_s.clean(desc)),
			copyrights: copyrights,
			url: response.url,
			date: response.date,
			image: {
				loRes: lores,
				hiRes: hires
			}
		};
	}

	private isPublicDomain(name: string, url: string) : boolean {
		name = name.toLowerCase();

		for(var i = 0; i < PUBLIC_DOMAIN.length; i++) {
			if( name.indexOf(PUBLIC_DOMAIN[i]) !== -1 || url.indexOf(PUBLIC_DOMAIN[i]) !== -1 ) {
				return true;
			}
		}

		return false;
	}
}