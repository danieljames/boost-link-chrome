function link_commit_message()
{
    switch(window.location.hostname) {
        case "bitbucket.org":
            // TODO: Is it always the last child?
            var element = document.querySelector(".commit-message p:last-child");
            if (element) link_svn_tag(element);
            break;
        case "github.com":
            forEach(document.querySelectorAll(".commit-desc pre"), link_svn_tag);
            break;
    }
}

function link_svn_tag(element)
{
    // Only checking for immediate children - which currently works.
    //
    // When linking tickets it might not, as the ticket may have already been
    // linked.
 
    forEach(element.childNodes, function(child) {
        if (child.nodeType === Node.TEXT_NODE) {
            // Search for a SVN version tag.
            var match = /\[SVN r(\d+)\]/.exec(child.data);
            if (match) link_regexp_match(child, match);
        }
    });
}

function link_regexp_match(textNode, match) {
    // Split the text node, such that linkText contains just the
    // text to be linked.
    var linkText = textNode.splitText(match.index);
    linkText.splitText(match[0].length);

    // Create the link node.
    var linkNode = document.createElement('a');
    linkNode.href = "https://svn.boost.org/trac/boost/changeset/" +
        match[1];
    linkNode.appendChild(linkText.cloneNode());

    // Replace the text node with the link.
    textNode.parentNode.replaceChild(linkNode, linkText);
}

function forEach(list, callback) {
    Array.prototype.forEach.call(list, callback);
}

link_commit_message();
