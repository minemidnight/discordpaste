/* globals editor */
const superagent = require("superagent");
$(window).on("load", () => {
	$("#duplicate").addClass("disabled");
	$("#raw").addClass("disabled");

	$("#save").on("click", async () => {
		let content = editor.getValue();
		if(!content) return;

		let language = localStorage.modeExt;
		let { body: { id, possibleLanguage } } = await superagent
			.post(`${window.location.origin}/api/v1/documents`).send({ content, language });

		window.location.assign(`${window.location.origin}/${id}.${possibleLanguage}`);
	});

	$("#new").on("click", () => {
		editor.setValue("");
		editor.clearHistory();
	});
});
