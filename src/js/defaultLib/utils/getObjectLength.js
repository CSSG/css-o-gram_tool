(function (global) {
    var DL = global.DL;

    /**
     *
     * @param {Object} object
     * @return {Number}
     */
    DL.getObjectLength = function (object) {
        return DL.getObjectKeys(object).length;
    }
} (this));