// ==UserScript==
// @name	Yes, Pandora, I'm Still Listening
// @namespace	http://dbknickerbocker.blogspot.com
// @description	Automatically click "I'm still listening"
// @match	http://www.pandora.com/*
// @version	0.1
// ==/UserScript==

function checkMutationForStillListening(mutation) {
	if ((mutation === null) || (mutation.addedNodes === null)) {
		return false;
	}
	
	for (var index = 0; index < mutation.addedNodes.length; ++index) {
		var addedNode = mutation.addedNodes[index];
		if ((addedNode === null) || (addedNode.parentNode === null)) {
			continue;
		}
		var stillListeningNode = addedNode.parentNode.querySelector('a.still_listening');
		if (stillListeningNode !== null) {
			stillListeningNode.click();
			return true;
		}
	}
	
	return false;
}

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
if (typeof MutationObserver !== 'undefined') {
	var mutationObserver = new MutationObserver(function (mutations) {
		mutations.some(checkMutationForStillListening);
	});
	mutationObserver.observe(window.document, { childList: true, subtree: true });
}
