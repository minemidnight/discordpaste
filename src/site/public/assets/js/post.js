const superagent = require("superagent");
$(window).on("load", () => {
	$("#duplicate").addClass("disabled");
	$("#raw").addClass("disabled");

	const editor = window.editor = CodeMirror.fromTextArea($("#editor")[0], { // eslint-disable-line no-undef
		lineNumbers: true,
		indentWithTabs: true,
		tabSize: 2,
		autofocus: true,
		theme: "pastel-on-dark",
		scrollbarStyle: "overlay",
		mode: CodeMirror.toUse // eslint-disable-line no-undef
	});

	$("#save").on("click", async () => {
		let content = editor.getValue();
		if(!content) return;

		let { body: { id, possibleLanguage } } = await superagent
			.post(`${window.location.origin}/api/v1/documents`).send({ content });

		window.location.assign(`${window.location.origin}/${id}.${possibleLanguage}`);
	});

	$("#new").on("click", () => {
		editor.setValue("");
		editor.clearHistory();
	});
});
