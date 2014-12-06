(function (global) {
    var DL = global.DL;
    /**
     *
     * @param {Array|Object|String} cycleable
     * @param {Function} fn
     * @param {*} [fnData]
     * @param {*} [ctx]
     * @param {Number} [step]
     * @param {Number} [start]
     * @returns {*}
     */
    DL.cycle = function(cycleable, fn, fnData, ctx, step, start){
        var i,
            iMax,
            propertyName,
            fnResult,
            undefined;
        if (cycleable){
            ctx = ctx || null;
            step = step || 1;
            if (DL.isString(cycleable)) {
                for (i = start || 0, iMax = cycleable.length; i < iMax; i += step) {
                    fnResult = fn.call(ctx, cycleable.charAt(i), cycleable, fnData);
                    if (fnResult !== undefined) {
                        return fnResult;
                    }
                }
            } else if (DL.isCollection(cycleable)) {
                for (i = start || 0, iMax = cycleable.length; i < iMax; i += step) {
                    fnResult = fn.call(ctx, cycleable[i], i, cycleable, fnData);
                    if (fnResult !== undefined) {
                        return fnResult;
                    }
                }
            } else if (DL.isObject(cycleable)){
                for (propertyName in cycleable){
                    if (cycleable.hasOwnProperty(propertyName)) {
                        fnResult = fn.call(ctx, cycleable[propertyName], propertyName, cycleable, fnData);
                        if (fnResult !== undefined) {
                            return fnResult;
                        }
                    }
                }
            }
        }
        return cycleable;
    };
} (this));