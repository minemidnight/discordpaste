$(window).on("load", () => {
	$("#buttons").children().each((i, ele) => {
		ele = $(ele);

		ele.hover(event => {
			$("#tooltips").addClass("shown").text(`${ele.attr("label")}\n${ele.attr("shortcut")}`);
		}, event => $("#tooltips").removeClass("shown"));

		Mousetrap.bindGlobal(ele.attr("shortcut").replace(/ /g, ""), event => { // eslint-disable-line no-undef
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
