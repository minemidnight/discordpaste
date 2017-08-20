/* globals Mousetrap options CodeMirror user */
const superagent = require("superagent");
$(window).on("load", () => {
	const editor = window.editor = CodeMirror.fromTextArea($("#editor")[0], options);

	$("#buttons").children().each((i, ele) => {
		ele = $(ele);

		ele.hover(event => {
			$("#tooltips").addClass("shown").text(`${ele.attr("label")}\n${ele.attr("shortcut")}`);
		}, event => $("#tooltips").removeClass("shown"));

		Mousetrap.bindGlobal(ele.attr("shortcut").replace(/ /g, ""), event => {
			event.preventDefault();
			ele.trigger("click");
		});
	});

	$("#login").click(() => {
		window.location.assign(`https://discordapp.com/oauth2/authorize?response_type=code&client_id=347217381128404994` +
			`&redirect_uri=${encodeURIComponent(`${window.location.origin}/callback`)}&scope=identify`);
	});

	$("#logout").click(() => {
		document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		window.location.reload();
	});

	$("#options_button").click(toggleOptions);
	$("#close").click(toggleOptions);

	$("#save_options").click(async () => {
		options.mode = $("[name=mode]").find(":checked").attr("codemirrormode");
		options.modeExt = $("[name=mode]").val();
		options.tabType = $("[name=tabType]").val();
		options.tabSize = parseInt($("[name=tabSize]").val());
		options.theme = $("[name=theme]").val();
		options.keyMap = $("[name=keyMap]").val();

		let settings = {
			mode: options.mode,
			tabType: options.indentWithTabs ? "hard" : "space",
			tabSize: options.tabSize,
			theme: options.theme,
			keyMap: options.keyMap
		};

		if(user) {
			await superagent.post(`${window.location.origin}/settings`).send(settings);
			window.location.reload();
		} else {
			options.mode = $("[name=mode]").find(":checked").attr("codemirrormode");
			options.modeExt = $("[name=mode]").val();
			Object.keys(settings).forEach(setting => localStorage[setting] = settings[setting]);
			window.location.reload();
		}
	});

	$(`[name=mode] [value=${options.modeExt || options.mode}]`).attr("selected", "true");
	$(`[name=tabType] [value=${options.indentWithTabs ? "hard" : "space"}]`).attr("selected", "true");
	$(`[name=tabSize]`).attr("value", options.tabSize);
	$(`[name=theme] [value=${options.theme}]`).attr("selected", "true");
	$(`[name=keyMap] [value=${options.keyMap}]`).attr("selected", "true");
});

function toggleOptions() {
	let open = $("#options").width();
	if(!open) {
		$("#options").css("width", 250);
		$("main").css("margin-right", 250);
	} else {
		$("#options").css("width", 0);
		$("main").css("margin-right", 0);
	}
}
