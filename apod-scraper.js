/**
 *
 * APODScraper.js
 *
 * A module for scraping the Astronomy Picture of the Day website
 *
 *
 **/

(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals (root is window)
        root.apod = factory(root.jQuery);
    }
}(this, function ($) {

    "use strict";

    var URL_BASE = "http://apod.nasa.gov/apod/ap";

    function getPage( dateString, callback ) {
        return $.get(URL_BASE + dateString + ".html", callback);
    }

    return {
        getToday: function() {
            return this.getDays(1);
        },

        getWeek: function() {
            return this.getDays(7);
        },

        getDays: function( count ) {
            return getPage("130104");
        }
    };
}));