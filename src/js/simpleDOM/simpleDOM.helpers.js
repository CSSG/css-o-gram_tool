(function (global) {
    var defaultLib = global.DL,
        simpleDOM = global.simpleDOM,
        simpleDOMHelpers = simpleDOM.helpers,
        simpleDOMNodes = simpleDOM.nodes;

    /*
     * helpers
     *
     * AST helpers
     * */

    //
    // appendChild()
    //

    function fragmentChildNodesProcessing (fragmentChildNode, index, childNodes, nodeTo) {
        fragmentChildNode.parentNode = nodeTo;
        nodeTo.childNodes.push(fragmentChildNode);
    }

    /**
     *
     * @param {Fragment|Tag|Text|Comment} nodeTo
     * @param {Fragment|Tag|Text|Comment} node
     */
    simpleDOMHelpers.appendChild = function (nodeTo, node) {
        if (node instanceof simpleDOMNodes.Fragment) {
            //TODO: [dmitry.makhnev] [optional] rewrite to native if need optimizations
            defaultLib.cycle(
                node.childNodes,
                fragmentChildNodesProcessing,
                nodeTo
            );
            node.childNodes.length = 0;
        } else {
            if (node.parentNode) {
                simpleDOM.helpers.removeChild(node.parentNode, node);
            }
            node.parentNode = nodeTo;
            nodeTo.childNodes.push(node);
        }
    };

    //
    // removeChild()
    //
    /**
     *
     * @param {Fragment|Tag|Text|Comment} parent
     * @param {Fragment|Tag|Text|Comment} node
     */
    simpleDOMHelpers.removeChild = function (parent, node) {
        if (node.parentNode === parent) {
            parent.childNodes.splice(parent.childNodes.indexOf(node), 1);
            node.parentNode = null;
        }
    };

    /*
     * /helpers
     */

} (this));