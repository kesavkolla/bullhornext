chrome.runtime.onInstalled.addListener(function (details) {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: {hostContains: 'bullhornstaffing.com'}
					})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(arguments);
	if (!request || !request.type) {
		sendResponse("Can't understand request: " + JSON.stringify(request));
		return;
	}
	switch (request.type) {
		case 'showError':
			// Set error icon
			chome.pageAction.setIcon({path: ''});
			// Reset icon after 1 sec
			setTimeout(function () {
				chrome.pageAction.setIcon({ path: '' });
			}, 1000);
			return;
		default :
			sendResponse("Can't understand request: " + JSON.stringify(request));
			return;
	}
});