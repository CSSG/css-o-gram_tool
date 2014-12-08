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

    /**
     *
     * @param {String} html
     * @return {Object} ast
     */
    function parse (html) {
        return {};
    }

    (function () {
        var nodes = htmlToAST.nodes,
            helpers = htmlToAST.nodes,
            statesTable = {
                '<': 'in decrypting',
                '<*': 'tag',
                '</': 'closed tag',
                '<!': 'comment',
                '/>': 'tag closed',
                't': 'text'
            },
            space = ' ';

        function detectState(char, previousCharsCache, currentState) {
            var stateKey;
            if (previousCharsCache) {
                switch (previousCharsCache) {
                    case '<':
                        switch (char) {
                            case '!':
                                stateKey = '<!';
                                break;
                            case '/':
                                stateKey = '</';
                                break;
                            default:
                                stateKey = '<*';
                        }
                        break;
                    case '/':
                        switch (char) {
                            case '>':
                                stateKey = '/>';
                                break;
                        }
                }
            } else {
                switch (char) {
                    case '<':
                        stateKey = '<';
                        break;
                    case '/':
                        stateKey = '/';
                        break;
                    default:
                        stateKey = 't';
                }
            }
            return statesTable[stateKey];
        }

        /*@DTesting.exports*/

            var testingExports = DL.getObjectSafely(DTesting.exports, 'DL', 'htmlToAST');
            testingExports.detectState = detectState;

        /*@/DTesting.exports*/

        /**
         *
         * @param {String} html
         * @return {Object} ast
         */
        function parse (html) {
            var root = new nodes.Fragment(),
                stack = [root],
                currentState = '',
                previousCharsCache = '',

                currentTagName = '',
                isTagNameDetect = false,
                currentAttributes = null,
                currentAttributeName = '',
                currentAttributeValue = '',

                currentTextValue = '',
                currentCommentValue = '';

            function resetCurrentState (isForce) {
                currentState = '';
                if (isForce) {
                    previousCharsCache = '';
                }
            }

            function createTag () {
                helpers.appendChild(stack[stack.length - 1], new nodes.Tag(currentTagName, currentAttributes));
            }

            function clearTagInfo () {
                currentTagName = '';
                isTagNameDetect = false;
                currentAttributes = null;
                currentAttributeName = '';
                currentAttributeValue = '';
            }

            defaultLib.cycle(html, function (char) {
                //empty string is empty state
                if (!currentState) {
                    currentState = detectState(char, previousCharsCache);
                }

                switch (currentState) {
                    case 'in decrypting':
                        previousCharsCache = char;
                        resetCurrentState();
                        break;
                    case 'tag':
                        if (isTagNameDetect) {
                            switch (char) {
                                case space:
                                    isTagNameDetect = true;
                                    break;
                                case '>':
                                    createTag();
                                    break;
                                default:
                                    currentTagName += char;
                                    break;
                            }
                        } else {
                            
                        }

                        break;
                    case 'closed tag':
                        break;
                    case 'comment':
                        break;
                    case 'text':
                        break;
                    default:
                        throw new Error('htmlToAST.parse(): unknown state');
                }



            });

            return root;
        }

        htmlToAST.parse = parse;
    } ());

    defaultLib.htmlToAST = htmlToAST;
} (this));