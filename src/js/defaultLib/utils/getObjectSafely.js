(function (global) {
    var DL = global.DL;
    /**
     *
     * @param {Object} object
     * @param {String|...} [property]
     * @return {Object|null} result
     */
    DL.getObjectSafely = function (object, property) {

        DL.cycle(arguments, function (property) {
            if (!object.hasOwnProperty(property)) {
                object[property] = {}
            } else if (!DL.isObject(object[property])) {
                object = null;
                return DL.cycleStopObject;
            }
            object = object[property];
        }, null, null, 1, 1);

        return object;
    };


} (this));