(function (global) {
    var defaultLib = global.DL,
        htmlToAST = {
            nodes: {},
            helpers: {},
            parse: null
        };



    /*
     * Nodes
     *
     * AST nodes
     * */

    //
    // Fragment
    //
    (function () {

        function Fragment () {
            var fragment = this;
            fragment.type = 'fragment';
            fragment.childNodes = [];
        }

        htmlToAST.nodes.Fragment = Fragment;
    } ());

    //
    // Tag
    //
    (function () {

        function Tag (name, attributes) {
            var tag = this;
            tag.type = 'tag';
            tag.childNodes = [];
            tag.name = name;
            tag.attributes = attributes || {};
            tag.parentNode = null;
        }

        htmlToAST.nodes.Tag = Tag;
    } ());

    //
    // Text
    //
    (function () {

        function Text (textContent) {
            var text = this;
            text.type = 'text';
            text.text = textContent;
            text.parentNode = null;

        }

        htmlToAST.nodes.Text = Text;
    } ());

    //
    // Comment
    //
    (function () {

        function Comment (commentContent) {
            var comment = this;
            comment.type = 'comment';
            comment.text = commentContent;
            comment.parentNode = null;
        }

        htmlToAST.nodes.Comment = Comment;
    } ());



    /*
     * /Nodes
     */


    /*
     * helpers
     *
     * AST helpers
     * */

    //
    // appendChild()
    //
    (function () {
        var htmlToASTNodes = htmlToAST.nodes;

        function fragmentChildNodesProcessing (fragmentChildNode, index, childNodes, nodeTo) {
            fragmentChildNode.parentNode = nodeTo;
            nodeTo.childNodes.push(fragmentChildNode);
        }

        /**
         *
         * @param {Fragment|Tag|Text|Comment} nodeTo
         * @param {Fragment|Tag|Text|Comment} node
         */
        htmlToAST.helpers.appendChild = function (nodeTo, node) {
            if (node instanceof htmlToASTNodes.Fragment) {
                //TODO: [dmitry.makhnev] [optional] rewrite to native if need optimizations
                defaultLib.cycle(
                    node.childNodes,
                    fragmentChildNodesProcessing,
                    nodeTo
                );
                node.childNodes.length = 0;
            } else {
                if (node.parentNode) {
                    htmlToAST.helpers.removeChild(node.parentNode, node);
                }
                node.parentNode = nodeTo;
                nodeTo.childNodes.push(node);
            }
        };
    } ());

    //
    // removeChild()
    //
    (function () {
        /**
         *
         * @param {Fragment|Tag|Text|Comment} parent
         * @param {Fragment|Tag|Text|Comment} node
         */
        htmlToAST.helpers.removeChild = function (parent, node) {
            if (node.parentNode === parent) {
                parent.childNodes.splice(parent.childNodes.indexOf(node), 1);
                node.parentNode = null;
            }
        };
    } ());



    /*
     * /helpers
     */

    /*
     * parse
     *
     * parse components
     * */

    (function () {
        var nodes = htmlToAST.nodes,
            helpers = htmlToAST.helpers;

        //
        // states
        //

        var stateId = 0,

            TEXT = stateId++,

            TAG_START = stateId++,
            TAG_NAME = stateId++,
            TAG_BODY = stateId++,
            TAG_CLOSE = stateId++,

            TAG_ATTRIBUTE_NAME = stateId++,
            TAG_ATTRIBUTE_TO_VALUE = stateId++,
            TAG_ATTRIBUTE_VALUE = stateId++,
            TAG_ATTRIBUTE_VALUE_END = stateId++,

            CLOSED_TAG_START = stateId++,
            CLOSED_TAG_NAME = stateId++,
            CLOSED_TAG_BODY = stateId++,

            DECLARATION_START = stateId++,
            COMMENT_START = stateId++,
            COMMENT_BODY = stateId++,
            COMMENT_END = stateId++,
            COMMENT_CLOSE = stateId++;

        /*@DTesting.exports*/
        var testingExportsForStates = DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST');
        testingExportsForStates.states = {
            TEXT: TEXT,

            TAG_START: TAG_START,
            TAG_NAME: TAG_NAME,
            TAG_BODY: TAG_BODY,
            TAG_CLOSE: TAG_CLOSE,

            TAG_ATTRIBUTE_NAME: TAG_ATTRIBUTE_NAME,
            TAG_ATTRIBUTE_TO_VALUE: TAG_ATTRIBUTE_TO_VALUE,
            TAG_ATTRIBUTE_VALUE: TAG_ATTRIBUTE_VALUE,
            TAG_ATTRIBUTE_VALUE_END: TAG_ATTRIBUTE_VALUE_END,

            CLOSED_TAG_START: CLOSED_TAG_START,
            CLOSED_TAG_NAME: CLOSED_TAG_NAME,
            CLOSED_TAG_BODY: CLOSED_TAG_BODY,

            DECLARATION_START: DECLARATION_START,

            COMMENT_START: COMMENT_START,
            COMMENT_BODY: COMMENT_BODY,
            COMMENT_END: COMMENT_END,
            COMMENT_CLOSE: COMMENT_CLOSE
        };
        /*@/DTesting.exports*/

        //
        // /states
        //

        //
        // ContextOfParse
        //
        /**
         *
         * @param {object} [settings]
         *     @param {Boolean} [settings.isXML] XML mode flag
         * @constructor
         */
        function ContextOfParse (settings) {
            var contextOfParse = this,
                root = new nodes.Fragment(),
                isXMLMode = false;

            contextOfParse.treeStack = [root];
            contextOfParse.result = root;

            contextOfParse.state = TEXT;

            contextOfParse.buffer = '';

            contextOfParse.textBuffer = '';

            contextOfParse.tagName = '';

            contextOfParse.attributeName = '';
            contextOfParse.attributeValueSeparator = '';
            contextOfParse.attributeValue = '';

            contextOfParse.attributes = null;

            contextOfParse.commentBuffer = '';
            contextOfParse.commentToken = '';

            if (settings) {
                if (settings.isXML) {
                    isXMLMode = true;
                }
            }

            contextOfParse.isXMLMode = isXMLMode;
        }

        ContextOfParse.prototype.destructor = function () {
            var contextOfParse = this;
            contextOfParse.treeStack = null;
            contextOfParse.result = null;
            contextOfParse.state = null;
            contextOfParse.buffer = null;
            contextOfParse.textBuffer = null;
            contextOfParse.tagName = null;
            contextOfParse.attributeName = null;
            contextOfParse.attributeValueSeparator = null;
            contextOfParse.attributeValue = null;
            contextOfParse.attributes = null;
            contextOfParse.commentBuffer = null;
            contextOfParse.commentToken = null;
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST').ContextOfParse = ContextOfParse;
        /*@/DTesting.exports*/

        //
        // /ContextOfParse
        //


        //
        // microhelpers
        //

        var letterTestRegExp = /[A-Za-z]/;

        /**
         *
         * @param {String} char
         * @return {boolean}
         */
        function isCorrectTagNameStartSymbol (char) {
            return letterTestRegExp.test(char);
        }


        var tagNameCorrectSymbolRegExp = /\w|-/;

        /**
         *
         * @param {String} char
         * @return {boolean}
         */
        function isCorrectTagNameSymbol (char) {
            return tagNameCorrectSymbolRegExp.test(char);
        }


        var whiteSpaceRegExp = /\s/;

        /**
         *
         * @param {String} char
         * @return {boolean}
         */
        function isWhiteSpace (char) {
            return whiteSpaceRegExp.test(char);
        }

        var singletonHTMLTags = ['img', 'input', 'br', 'hr', 'link', 'meta', 'source', 'area', 'embed', 'param', 'base', 'col', 'command'];

        /**
         *
         * @param {String} tagName
         * @return {Boolean}
         */
        function isSingletonHTMLTag(tagName) {
            return singletonHTMLTags.indexOf(tagName) !== -1;
        }


        var isCorrectAttributeNameStartSymbol = isCorrectTagNameStartSymbol;

        var isCorrectAttributeNameSymbol = isCorrectTagNameSymbol;


        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        function addCharForBuffer (contextOfParse, char) {
            contextOfParse.buffer += char;
        }

        /**
         *
         * @param {ContextOfParse} contextOfParse
         */
        function clearForTextState (contextOfParse) {
            contextOfParse.textBuffer = contextOfParse.buffer;
            contextOfParse.state = TEXT;
        }

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} [attributeValue]
         */
        function addAttribute (contextOfParse, attributeValue) {
            var attributes = contextOfParse.attributes,
                u;
            if (!attributes) {
                contextOfParse.attributes = attributes = {};
            }

            attributes[contextOfParse.attributeName] = attributeValue !== u ?
                attributeValue
                : contextOfParse.attributeValue;

        }


        /*@DTesting.exports*/

        var testingExportsForMicrohelpers = DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST');

        testingExportsForMicrohelpers.isCorrectTagNameStartSymbol = isCorrectTagNameStartSymbol;
        testingExportsForMicrohelpers.isCorrectTagNameSymbol = isCorrectTagNameSymbol;
        testingExportsForMicrohelpers.isWhiteSpace = isWhiteSpace;
        testingExportsForMicrohelpers.isSingletonHTMLTag = isSingletonHTMLTag;
        testingExportsForMicrohelpers.isCorrectAttributeNameStartSymbol = isCorrectAttributeNameStartSymbol;
        testingExportsForMicrohelpers.isCorrectAttributeNameSymbol = isCorrectAttributeNameSymbol;
        testingExportsForMicrohelpers.addCharForBuffer = addCharForBuffer;
        testingExportsForMicrohelpers.clearForTextState = clearForTextState;
        testingExportsForMicrohelpers.addAttribute = addAttribute;

        /*@/DTesting.exports*/

        //
        // /microhelpers
        //


        //
        // builders
        //

        /**
         *
         * @param {ContextOfParse} contextOfParse
         */
        function buildText (contextOfParse) {
            var contextOfParseTreeStack,
                newText;
            if (contextOfParse.textBuffer) {
                contextOfParseTreeStack = contextOfParse.treeStack;
                newText = new nodes.Text(contextOfParse.textBuffer);
                helpers.appendChild(contextOfParseTreeStack[contextOfParseTreeStack.length - 1], newText);
                contextOfParse.textBuffer = '';
            }
            contextOfParse.buffer = '';

        }

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {Boolean} [isClosedTag]
         */
        function buildTag (contextOfParse , isClosedTag) {
            var contextOfParseTreeStack = contextOfParse.treeStack,
                newTag,
                tagName = contextOfParse.tagName;

            buildText(contextOfParse);

            newTag = new nodes.Tag(tagName, contextOfParse.attributes);

            helpers.appendChild(contextOfParseTreeStack[contextOfParseTreeStack.length - 1], newTag);

            if (
                !isClosedTag
                && (contextOfParse.isXMLMode || !isSingletonHTMLTag(tagName))
            ) {
                contextOfParseTreeStack.push(newTag);
            }

            contextOfParse.state = TEXT;

        }


        function closeTagNotClosedTagsCollectionProcessing (notClosedTag, index, notClosedTagsCollection, lastTreeStackTag) {
            helpers.appendChild(lastTreeStackTag, notClosedTag);
        }

        /**
         *
         * @param {ContextOfParse} contextOfParse
         */
        function closeTag (contextOfParse) {
            var tagName = contextOfParse.tagName,
                treeStack = contextOfParse.treeStack,
                lastTreeStackTag,
                isHasCollection = false,
                notClosedTagsCollection;

            buildText(contextOfParse);

            while (
                (treeStack.length !== 1)
                && ((lastTreeStackTag = treeStack.pop()).name !== tagName)
            ) {
                if (!isHasCollection) {
                    isHasCollection = true;
                    notClosedTagsCollection = [];
                }

                notClosedTagsCollection.push(lastTreeStackTag);
            }

            if (isHasCollection) {
                //TODO: [dmitry.makhnev] [optional] rewrite to native if need optimizations
                defaultLib.reversiveCycle(
                    notClosedTagsCollection,
                    closeTagNotClosedTagsCollectionProcessing,
                    lastTreeStackTag
                );
            }

            contextOfParse.state = TEXT;
        }

        /**
         *
         * @param {ContextOfParse} contextOfParse
         */
        function buildComment (contextOfParse) {
            var contextOfParseTreeStack = contextOfParse.treeStack,
                newComment;

            buildText(contextOfParse);

            newComment = new nodes.Comment(contextOfParse.commentBuffer);

            helpers.appendChild(
                contextOfParseTreeStack[contextOfParseTreeStack.length - 1],
                newComment
            );

            contextOfParse.state = TEXT;
        }

        /*@DTesting.exports*/

        var testingExportsBuilders = DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'builders');
        testingExportsBuilders.buildText = buildText;
        testingExportsBuilders.buildTag = buildTag;
        testingExportsBuilders.closeTag = closeTag;
        testingExportsBuilders.buildComment = buildComment;

        /*@/DTesting.exports*/



        //
        // /builders
        //



        //
        // processings
        //

        var processings = [];

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[TEXT] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            switch (char) {
                case '<':
                    contextOfParse.state = TAG_START;
                    break;
                default:
                    contextOfParse.textBuffer += char;
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingText = processings[TEXT];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[TAG_START] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (isCorrectTagNameStartSymbol(char)) {
                contextOfParse.state = TAG_NAME;
                contextOfParse.tagName = char;
                contextOfParse.attributes = null;
            } else {
                switch (char) {
                    case '/':
                        contextOfParse.state = CLOSED_TAG_START;
                        break;
                    case '!':
                        contextOfParse.state = DECLARATION_START;
                        break;
                    default:
                        clearForTextState(contextOfParse);
                }
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagStart = processings[TAG_START];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[TAG_NAME] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (isCorrectTagNameSymbol(char)) {
                contextOfParse.tagName += char;
            } else if (isWhiteSpace(char)) {
                contextOfParse.state = TAG_BODY;
            } else {
                switch (char) {
                    case '/':
                        contextOfParse.state = TAG_CLOSE;
                        break;
                    case '>':
                        contextOfParse.state = TEXT;
                        buildTag(contextOfParse);
                        break;
                    default:
                        clearForTextState(contextOfParse);
                }

            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagName = processings[TAG_NAME];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[TAG_BODY] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (!isWhiteSpace(char)) {
                if (isCorrectAttributeNameStartSymbol(char)) {
                    contextOfParse.state = TAG_ATTRIBUTE_NAME;
                    contextOfParse.attributeName = char;
                } else {
                    switch (char) {
                        case '/':
                            contextOfParse.state = TAG_CLOSE;
                            break;
                        case '>':
                            buildTag(contextOfParse);
                            break;
                        default:
                            clearForTextState(contextOfParse);
                    }
                }
            }

        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagBody = processings[TAG_BODY];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[TAG_ATTRIBUTE_NAME] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            switch (char) {
                case '=':
                    contextOfParse.state = TAG_ATTRIBUTE_TO_VALUE;
                    break;
                case '>':
                    addAttribute(contextOfParse, '');
                    buildTag(contextOfParse);
                    break;
                case '/':
                    addAttribute(contextOfParse, '');
                    contextOfParse.state = TAG_CLOSE;
                    break;
                default:
                    if (isCorrectAttributeNameSymbol(char)) {
                        contextOfParse.attributeName += char;
                    } else if (isWhiteSpace(char)) {
                        addAttribute(contextOfParse, '');
                        contextOfParse.state = TAG_BODY;
                    } else {
                        clearForTextState(contextOfParse);
                    }
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagAttributeName = processings[TAG_ATTRIBUTE_NAME];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[TAG_ATTRIBUTE_TO_VALUE] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            switch (char) {
                case '\'':
                case '"':
                    contextOfParse.state = TAG_ATTRIBUTE_VALUE;
                    contextOfParse.attributeValueSeparator = char;
                    contextOfParse.attributeValue = '';
                    break;
                default:
                    clearForTextState(contextOfParse);
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagAttributeToValue = processings[TAG_ATTRIBUTE_TO_VALUE];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[TAG_ATTRIBUTE_VALUE] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (char === contextOfParse.attributeValueSeparator) {
                contextOfParse.state = TAG_ATTRIBUTE_VALUE_END;
                addAttribute(contextOfParse);
            } else {
                contextOfParse.attributeValue += char;
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagAttributeValue = processings[TAG_ATTRIBUTE_VALUE];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[TAG_ATTRIBUTE_VALUE_END] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            switch (char){
                case '/':
                    contextOfParse.state = TAG_CLOSE;
                    break;
                case '>':
                    buildTag(contextOfParse);
                    clearForTextState(contextOfParse);
                    break;
                default:
                    if (isWhiteSpace(char)) {
                        contextOfParse.state = TAG_BODY;
                    } else {
                        clearForTextState(contextOfParse);
                    }
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingAttributeValueEnd = processings[TAG_ATTRIBUTE_VALUE_END];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[TAG_CLOSE] = function (contextOfParse, char) {
            if (char === '>') {
                buildTag(contextOfParse, true);
            } else {
                addCharForBuffer(contextOfParse, char);
                clearForTextState(contextOfParse);
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagClose = processings[TAG_CLOSE];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[CLOSED_TAG_START] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (isCorrectTagNameStartSymbol(char)) {
                contextOfParse.tagName = char;
                contextOfParse.state = CLOSED_TAG_NAME;
            } else {
                clearForTextState(contextOfParse);
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingClosedTagStart = processings[CLOSED_TAG_START];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[CLOSED_TAG_NAME] = function processingClosedTagName (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (isCorrectTagNameStartSymbol(char)) {
                contextOfParse.tagName += char;
            } else if (char === '>') {
                closeTag(contextOfParse);
            } else if (isWhiteSpace(char)) {
                contextOfParse.state = CLOSED_TAG_BODY;
            } else {
                clearForTextState(contextOfParse);
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingClosedTagName = processings[CLOSED_TAG_NAME];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[CLOSED_TAG_BODY] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (char === '>') {
                closeTag(contextOfParse);
            } else if (!isWhiteSpace(char)) {
                clearForTextState(contextOfParse);
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingClosedTagBody = processings[CLOSED_TAG_BODY];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[DECLARATION_START] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (char === '-') {
                contextOfParse.state = COMMENT_START;
            } else {
                clearForTextState(contextOfParse);
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingDeclarationStart = processings[DECLARATION_START];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[COMMENT_START] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (char === '-') {
                contextOfParse.state = COMMENT_BODY;
                contextOfParse.commentBuffer = '';
            } else {
                clearForTextState(contextOfParse);
            }

        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingCommentStart = processings[COMMENT_START];
        /*@/DTesting.exports*/


        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[COMMENT_BODY] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (char === '-') {
                contextOfParse.state = COMMENT_END;
                contextOfParse.commentToken = char;
            } else {
                contextOfParse.commentBuffer += char;
            }
        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingCommentBody = processings[COMMENT_BODY];
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[COMMENT_END] = function (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (char === '-') {
                contextOfParse.state = COMMENT_CLOSE;
                contextOfParse.commentToken += char;
            } else {
                contextOfParse.state = COMMENT_BODY;
                contextOfParse.commentBuffer += contextOfParse.commentToken + char;
            }

        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingCommentEnd = processings[COMMENT_END];
        /*@/DTesting.exports*/


        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        processings[COMMENT_CLOSE] = function processingCommentClose (contextOfParse, char) {

            if (char === '>') {
                buildComment(contextOfParse);
            } else {
                addCharForBuffer(contextOfParse, char);
                contextOfParse.state = COMMENT_BODY;
                contextOfParse.commentBuffer += contextOfParse.commentToken + char;
            }

        };

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingCommentClose = processings[COMMENT_CLOSE];
        /*@/DTesting.exports*/

        //
        // /processings
        //



        /**
         *
         * @param {String} xml
         * @return {Object} ast
         */
        function parse (xml) {
            var contextOfParse = new ContextOfParse(),
                i = 0,
                iMax = xml.length,
                result;

            //Info Comment [dmitry.makhnev] use native cycle because this is bottleneck
            for (; i < iMax; i += 1) {
                processings[contextOfParse.state](contextOfParse, xml.charAt(i));
            }

            result = contextOfParse.result;
            contextOfParse.destructor();

            return result;
        }

        htmlToAST.parse = parse;
    } ());

    /*
     * /parse
     */

    defaultLib.htmlToAST = htmlToAST;
} (this));