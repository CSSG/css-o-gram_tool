(function (global) {

    var DL = global.DL,
        toString = Object.prototype.toString;

    DL.isArray = Array.isArray || function (verifiable) {
        return toString.call(verifiable) === '[object Array]';
    };

    DL.isNodesCollection = function (verifiable) {
        return (verifiable instanceof HTMLCollection)
            || (verifiable instanceof NodeList);
    };

    var types = ['Object', 'Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Boolean'],
        i = types.length;

    function createTypeDetector (typeName) {
        return function (verifiable) {
            return toString.call(verifiable) === '[object ' + typeName + ']';
        }
    }

    for (; i-- ;){
        DL['is' + types[i]] = createTypeDetector(types[i]);
    }

    DL.isCollection = function (verifiable) {
        return DL.isArray(verifiable)
            || DL.isNodesCollection(verifiable)
            || DL.isArguments(verifiable);
    };



} (this));