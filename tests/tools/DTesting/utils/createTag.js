(function (global) {
    var notNestingTagsList = ['meta', 'link', 'input', 'img', 'br', 'hr'];

    /**
     *
     * @param {String} tagName
     * @param {Object} attributes
     * @param {String} contentItem html text
     * @return {String} html text
     */
    global.DTesting.utils.createTag = function (tagName, attributes, contentItem) {
        var attributesString = '',
            content = '',
            result;
        if (attributes) {
            DL.cycle(attributes, function (value, key) {
                attributesString += ' ' + key + '="' + value + '"';
            });
        }
        if (notNestingTagsList.indexOf(tagName) === -1) {
            if (contentItem) {
                DL.cycle(arguments, function (contentItem) {
                    content += contentItem;
                }, null, null, 1, 2);
            }
            result = '<' + tagName + attributesString + '>' + content + '</' + tagName + '>';
        } else {
            result = '<' + tagName + attributesString + ' />';
        }

        return result;
    };
} (this));