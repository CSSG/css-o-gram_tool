(function (global) {
    var DL = global.DL,
        cycleStopObject;


    function CycleStopKey () {}
    function CycleStopObject () {
        this.result = null;
    }
    CycleStopObject.prototype = new CycleStopKey();


    DL.cycleStopKey = new CycleStopKey();
    DL.cycleStopObject = cycleStopObject = new CycleStopObject();


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
            keys,
            result;
        if (cycleable){
            ctx = ctx || global;
            step = step || 1;
            i = start || 0;
            if (DL.isString(cycleable)) {
                for (iMax = cycleable.length; i < iMax; i += step) {
                    fnResult = fn.call(ctx, cycleable.charAt(i), i, cycleable, fnData);
                    if (fnResult instanceof CycleStopKey) {
                        break;
                    }
                }
            } else if (DL.isCollection(cycleable)) {
                for (iMax = cycleable.length; i < iMax; i += step) {
                    fnResult = fn.call(ctx, cycleable[i], i, cycleable, fnData);
                    if (fnResult instanceof CycleStopKey) {
                        break;
                    }
                }
            } else if (DL.isObject(cycleable)){
                //if simple rules use for in
                if ((i === 0) && (step === 1)) {
                    for (propertyName in cycleable) {
                        if (cycleable.hasOwnProperty(propertyName)) {
                            fnResult = fn.call(ctx, cycleable[propertyName], propertyName, cycleable, fnData);
                            if (fnResult instanceof CycleStopKey) {
                                break;
                            }
                        }
                    }
                } else {
                    keys = DL.getObjectKeys(cycleable);
                    for (iMax = keys.length; i < iMax; i += step) {
                        propertyName = keys[i];
                        fnResult = fn.call(ctx, cycleable[propertyName], propertyName, cycleable, fnData);
                        if (fnResult instanceof CycleStopKey) {
                            break;
                        }
                    }
                }
            }
        }
        if (fnResult === cycleStopObject) {
            result = cycleStopObject.result;
            cycleStopObject.result = null;
            return result;
        }
        return cycleable;
    };

    /**
     *
     * @param {Array|Object|String} cycleable
     * @param {Function} fn
     * @param {*} [fnData]
     * @param {*} [ctx]
     * @param {Number} [step]
     * @param {Number} [start]
     * @returns {Array|Object|String} cycleable
     */
    DL.reversiveCycle = function (cycleable, fn, fnData, ctx, step, start) {
        var i,
            propertyName,
            fnResult,
            keys,
            result;
        if (cycleable) {
            ctx = ctx || null;
            step = step || 1;
            if (DL.isString(cycleable)) {
                for (i = start || (cycleable.length - 1); i >= 0; i -= step) {
                    fnResult = fn.call(ctx, cycleable.charAt(i), i, cycleable, fnData);
                    if (fnResult instanceof CycleStopKey) {
                        break;
                    }
                }
            } else if (DL.isCollection(cycleable)) {
                for (i = start || (cycleable.length - 1); i >= 0; i -= step) {
                    fnResult = fn.call(ctx, cycleable[i], i, cycleable, fnData);
                    if (fnResult instanceof CycleStopKey) {
                        break;
                    }
                }
            } else if (DL.isObject(cycleable)) {
                keys = DL.getObjectKeys(cycleable);
                for (i = start || (keys.length - 1); i >= 0; i -= step) {
                    propertyName = keys[i];
                    fnResult = fn.call(ctx, cycleable[propertyName], propertyName, cycleable, fnData);
                    if (fnResult instanceof CycleStopKey) {
                        break;
                    }
                }
            }
        }
        if (fnResult === cycleStopObject) {
            result = cycleStopObject.result;
            cycleStopObject.result = null;
            return result;
        }
        return cycleable;
    }
} (this));