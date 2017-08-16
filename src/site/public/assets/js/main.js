const superagent = require("superagent");
$(window).on("load", () => {
	const editor = CodeMirror.fromTextArea($("#editor")[0], { // eslint-disable-line no-undef
		lineNumbers: true,
		indentWithTabs: true,
		tabSize: 2,
		autofocus: true,
		theme: "pastel-on-dark"
	});
});
