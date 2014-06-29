/**
 * Function to check whether a given object is available.  Once the object is available it invokes the callback
 * This function uses eval to check the object or object property is available.
 * @param obj string notation of the object or object property.
 * @param timeout no.of milli seconds to wait before quit
 * @param cb call back function to be executed after the object is available
 */
function $314echeckObjectExist(obj, timeout, cb) {
	if (typeof (timeout) === 'function') {
		cb = timeout;
		timeout = 0;
	}
	var $timechk = 0;
	var chckExistance = setInterval(function () {
		$timechk += 100;
		var $obj = eval(obj);
		if (typeof ($obj) !== 'undefined') {
			clearInterval(chckExistance);
			cb.call(this, true);
		}
		if (timeout > 0 && $timechk > timeout) {
			clearInterval(chckExistance);
			cb.call(this, false);
		}
	}, 100);
}

/**
 * Event handler for window registered
 * @param args
 */
var $314eBHSWindowRegistered = function (args) {
	BHSWindowRegistered.call(this, args);

	// Logic for candidates
	if (bhsWindowManager.activeWindow.location === '/BullhornStaffing/Candidate/Candidates.cfm') {
		$314echeckObjectExist('bhsWindowManager.activeWindow.windowObj.bodyIsLoaded', function (isSuccess) {
			$314echeckObjectExist("bhsWindowManager.activeWindow.windowObj.jQuery('iframe:first')[0].contentWindow.angular",
					function () {
						var $candidateWindow = bhsWindowManager.activeWindow.windowObj.jQuery('iframe:first')[0].contentWindow;
						var $candiateDoc = bhsWindowManager.activeWindow.windowObj.jQuery('iframe:first')[0].contentDocument;
					});
		});
	}
}

// Add bhs window register
$314echeckObjectExist('window.bhsWindowManager', function (isSuccess) {
	if (!isSuccess) {
		chrome.runtime.sendMessage({
			type: 'showError',
			data: {
				message: "Can't attach custom listener"
			}
		});
		console.log("Can't attach custom listener");
		return;
	}
	bhsWindowManager.addListener('onwindowregistered', $314eBHSWindowRegistered);
});
