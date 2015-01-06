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
        /**
         *
         * @param {ASTNode} nodeTo
         * @param {ASTNode} node
         */
        htmlToAST.helpers.appendChild = function (nodeTo, node) {
            nodeTo.childNodes.push(node);
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
            TAG_ATTRIBUTE_VALUE_START = stateId++,
            TAG_ATTRIBUTE_VALUE = stateId++,
            TAG_ATTRIBUTE_VALUE_END = stateId++,

            DECLARATION_START = stateId++;

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
            TAG_ATTRIBUTE_VALUE_START: TAG_ATTRIBUTE_VALUE_START,
            TAG_ATTRIBUTE_VALUE: TAG_ATTRIBUTE_VALUE,
            TAG_ATTRIBUTE_VALUE_END: TAG_ATTRIBUTE_VALUE_END,

            DECLARATION_START: DECLARATION_START
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


        //var tagsWithoutNesting = ['img', 'input', 'br', 'link', 'meta',  'hr', 'col', 'param', 'source', 'track', 'menuitem', 'keygen', 'area', 'base', 'basefont', 'option'];
        var simpleHTMLTags = ['img', 'input', 'br', 'hr', 'link', 'meta'];

        /**
         *
         * @param {String} tagName
         * @return {Boolean}
         */
        function testOfSimpleHTMLTag(tagName) {
            return simpleHTMLTags.indexOf(tagName) !== -1;
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


        /*@DTesting.exports*/

        var testingExportsForMicrohelpers = DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST');

        testingExportsForMicrohelpers.isCorrectTagNameStartSymbol = isCorrectTagNameStartSymbol;
        testingExportsForMicrohelpers.isCorrectTagNameSymbol = isCorrectTagNameSymbol;
        testingExportsForMicrohelpers.isWhiteSpace = isWhiteSpace;
        testingExportsForMicrohelpers.testOfSimpleHTMLTag = testOfSimpleHTMLTag;
        testingExportsForMicrohelpers.isCorrectAttributeNameStartSymbol = isCorrectAttributeNameStartSymbol;
        testingExportsForMicrohelpers.isCorrectAttributeNameSymbol = isCorrectAttributeNameSymbol;
        testingExportsForMicrohelpers.addCharForBuffer = addCharForBuffer;
        testingExportsForMicrohelpers.clearForTextState = clearForTextState;

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
            var contextOfParseTreeStack = contextOfParse.treeStack,
                newText = new nodes.Text(contextOfParse.textBuffer);
            helpers.appendChild(contextOfParseTreeStack[contextOfParseTreeStack.length - 1], newText);
            contextOfParse.buffer = '';
            contextOfParse.textBuffer = '';
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

            if (contextOfParse.textBuffer) {
                buildText(contextOfParse);
            }

            newTag = new nodes.Tag(tagName, contextOfParse.attributes);

            helpers.appendChild(contextOfParseTreeStack[contextOfParseTreeStack.length - 1], newTag);

            if (
                !isClosedTag
                && (contextOfParse.isXMLMode || !testOfSimpleHTMLTag(tagName))
            ) {
                contextOfParseTreeStack.push(newTag);
            }

            contextOfParse.state = TEXT;

        }

        /*@DTesting.exports*/

        var testingExportsBuilders = DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'builders');
        testingExportsBuilders.buildText = buildText;
        testingExportsBuilders.buildTag = buildTag;

        /*@/DTesting.exports*/

        //
        // /builders
        //



        //
        // processings
        //

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        function processingText (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            switch (char) {
                case '<':
                    contextOfParse.state = TAG_START;
                    break;
                default:
                    contextOfParse.textBuffer += char;
            }
        }

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingText = processingText;
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        function processingTagStart (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            if (isCorrectTagNameStartSymbol(char)) {
                contextOfParse.state = TAG_NAME;
                contextOfParse.tagName = char;
                contextOfParse.attributes = null;
            } else {
                switch (char) {
                    case '!':
                        contextOfParse.state = DECLARATION_START;
                        break;

                    default:
                        clearForTextState(contextOfParse);
                }
            }
        }

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagStart = processingTagStart;
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        function processingTagName (contextOfParse, char) {
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
        }

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagName = processingTagName;
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        function processingTagBody (contextOfParse, char) {
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

        }

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagBody = processingTagBody;
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        function processingTagAttributeName (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);
            if (char === '=') {
                contextOfParse.state = TAG_ATTRIBUTE_TO_VALUE;
            } else if (isCorrectAttributeNameSymbol(char)) {
                contextOfParse.attributeName += char;
            } else {
                clearForTextState(contextOfParse);
            }
        }

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagAttributeName = processingTagAttributeName;
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        function processingTagAttributeToValue (contextOfParse, char) {
            addCharForBuffer(contextOfParse, char);

            switch (char) {
                case '\'':
                case '"':
                    contextOfParse.state = TAG_ATTRIBUTE_VALUE_START;
                    contextOfParse.attributeValueSeparator = char;
                    break;
                default:
                    clearForTextState(contextOfParse);
            }
        }

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagAttributeToValue = processingTagAttributeToValue;
        /*@/DTesting.exports*/

        /**
         *
         * @param {ContextOfParse} contextOfParse
         * @param {String} char
         */
        function processingTagClose (contextOfParse, char) {
            if (char === '>') {
                buildTag(contextOfParse, true);
            } else {
                addCharForBuffer(contextOfParse, char);
                clearForTextState(contextOfParse);
            }
        }

        /*@DTesting.exports*/
        DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST', 'processings').processingTagClose = processingTagClose;
        /*@/DTesting.exports*/

        //
        // /processings
        //



        /**
         *
         * @param {String} html
         * @return {Object} ast
         */
        function parse (html) {
            var contextOfParse = new ContextOfParse();

            //TODO: [dmitry.makhnev] write native cycle
            defaultLib.cycle(html, function (char) {
                switch (contextOfParse.state) {
                    case TEXT:
                        processingText(contextOfParse, char);
                        break;
                    case TAG_START:
                        processingTagStart(contextOfParse, char);
                        break;
                    case TAG_NAME:
                        processingTagName(contextOfParse, char);
                        break;
                    case TAG_BODY:
                        processingTagBody(contextOfParse, char);
                        break;
                    case TAG_ATTRIBUTE_NAME:
                        processingTagAttributeName(contextOfParse, char);
                        break;
                    case TAG_CLOSE:
                        processingTagClose(contextOfParse, char);
                        break;

                }
            });

            return contextOfParse.result;
        }

        htmlToAST.parse = parse;
    } ());

    /*
     * /parse
     */

    defaultLib.htmlToAST = htmlToAST;
} (this));