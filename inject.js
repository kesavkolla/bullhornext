function injectJs(link) {
	var scr = document.createElement("script");
	scr.type = "text/javascript";
	scr.src = link;
	(document.documentElement || document.body || document.head ).appendChild(scr);
}

injectJs(chrome.extension.getURL("mainwindow.js"));