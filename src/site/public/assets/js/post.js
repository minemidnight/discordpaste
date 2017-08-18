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
		scrollbarStyle: "overlay"
	});

	$("#save").on("click", async () => {
		let content = editor.getValue();
		if(!content) return;

		let { body: { id } } = await superagent.post(`${window.location.origin}/api/v1/documents`).send({ content });
		window.location.assign(`${window.location.origin}/${id}`);
	});

	$("#new").on("click", () => {
		editor.setValue("");
		editor.clearHistory();
	});
});
