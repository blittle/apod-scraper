var APODUtils = (function () {
    function APODUtils() {
    }
    APODUtils.getDateString = function (date) {
        var dateString = (date.getFullYear() + "").substring(2);

        if (date.getMonth() < 9) {
            dateString += "0" + (date.getMonth() + 1);
        } else {
            dateString += (date.getMonth() + 1);
        }

        if (date.getDate() < 10) {
            dateString += "0" + date.getDate();
        } else {
            dateString += date.getDate();
        }

        return dateString;
    };

    APODUtils.getNormalizedDate = function (date) {
        return new Date(date.getTime() - (date.getHours() * 3600 * 1000) - (date.getMinutes() * 60 * 1000) - (date.getSeconds() * 1000) - date.getMilliseconds());
    };
    return APODUtils;
})();
exports.APODUtils = APODUtils;

