(function (global) {
    var DL = global.DL;

    /**
     *
     * @param {Object} object
     * @return {Number}
     */
    DL.getObjectLength = function (object) {
        var result;
        if (Object.keys) {
            result = Object.keys(object).length;
        } else {
            DL.cycle(object, function () {
                result += 1;
            });
        }
        return result;
    }
} (this));