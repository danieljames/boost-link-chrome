// Run link.js whenever the url is updated to a github commit page, or
// a commit history page.
//
// For some reason this sometimes runs twice, once before the page changes
// and once afterwards. 'details' seems to be identical both times, so I
// can't see a good way to distinguish between them.
chrome.webNavigation.onHistoryStateUpdated.addListener(
    function update_page(details) {
        chrome.tabs.executeScript(details.tabId, {file: "link.js"});
    },
    {url: [{urlMatches: 'github.com/boostorg/[^/]*/commits?/'}]}
);
