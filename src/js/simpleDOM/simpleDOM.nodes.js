(function (global) {
    var simpleDOMNodes = global.simpleDOM.nodes;

    /*
     * Nodes
     *
     * AST nodes
     * */

    //
    // Fragment
    //

    function Fragment () {
        var fragment = this;
        fragment.type = 'fragment';
        fragment.childNodes = [];
    }

    simpleDOMNodes.Fragment = Fragment;

    //
    // Tag
    //

    function Tag (name, attributes) {
        var tag = this;
        tag.type = 'tag';
        tag.childNodes = [];
        tag.name = name;
        tag.attributes = attributes || {};
        tag.parentNode = null;
    }

    simpleDOMNodes.Tag = Tag;

    //
    // Text
    //

    function Text (textContent) {
        var text = this;
        text.type = 'text';
        text.text = textContent;
        text.parentNode = null;

    }

    simpleDOMNodes.Text = Text;

    //
    // Comment
    //

    function Comment (commentContent) {
        var comment = this;
        comment.type = 'comment';
        comment.text = commentContent;
        comment.parentNode = null;
    }

    simpleDOMNodes.Comment = Comment;

    /*
     * /Nodes
     */

} (this));