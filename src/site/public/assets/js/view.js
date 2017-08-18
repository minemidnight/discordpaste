const superagent = require("superagent");
$(window).on("load", () => {
	$("#save").addClass("disabled");
	const editor = window.editor = CodeMirror.fromTextArea($("#editor")[0], { // eslint-disable-line no-undef
		lineNumbers: true,
		indentWithTabs: true,
		tabSize: 2,
		theme: "pastel-on-dark",
		scrollbarStyle: "overlay",
		readOnly: true
	});

	$("#new").on("click", () => window.location.assign(window.location.origin));
	$("#duplicate").on("click", () => {
		document.title = "DiscordPaste";
		window.history.pushState("", "", "/");
		editor.setOption("readOnly", false);

		$("#duplicate").addClass("disabled");
		$("#raw").addClass("disabled");
		$("#buttons").children().off("click");

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

	$("#raw").on("click", () => {
		let dot = window.location.pathname.indexOf(".");
		if(~dot) window.location.assign(`${window.location.origin}/raw${window.location.pathname.substring(0, dot)}`);
		else window.location.assign(`${window.location.origin}/raw${window.location.pathname}`);
	});
});
