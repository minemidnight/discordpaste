/* globals editor */
const superagent = require("superagent");
$(window).on("load", () => {
	$("#save").addClass("disabled");

	$("#new").on("click", () => {
		document.title = "DiscordPaste";
		window.history.pushState("", "", "/");
		editor.setOption("readOnly", false);
		editor.setValue("");
		editor.clearHistory();
		editor.setOption("mode", "text");

		$("#buttons").children().not(".nochange").removeClass("disabled").off("click");
		$("#duplicate").addClass("disabled");
		$("#raw").addClass("disabled");

		$("#save").on("click", async () => {
			let content = editor.getValue();
			if(!content) return;

			let language = CodeMirror.toUse; // eslint-disable-line no-undef
			let { body: { id, possibleLanguage } } = await superagent
				.post(`${window.location.origin}/api/v1/documents`).send({ content, language });
			window.location.assign(`${window.location.origin}/${id}.${possibleLanguage}`);
		});

		$("#new").on("click", () => {
			editor.setValue("");
			editor.clearHistory();
		});
	});

	$("#duplicate").on("click", () => {
		document.title = "DiscordPaste";
		window.history.pushState("", "", "/");
		editor.setOption("readOnly", false);

		$("#buttons").children().not(".nochange").removeClass("disabled").off("click");

		$("#duplicate").addClass("disabled");
		$("#raw").addClass("disabled");

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

	$("#raw").on("click", () => {
		let dot = window.location.pathname.indexOf(".");
		if(~dot) window.location.assign(`${window.location.origin}/raw${window.location.pathname.substring(0, dot)}`);
		else window.location.assign(`${window.location.origin}/raw${window.location.pathname}`);
	});
});
