$(window).on("load", () => {
	$("#buttons").children().each((i, ele) => {
		ele = $(ele);

		ele.hover(event => {
			$("#tooltips").addClass("shown").text(`${ele.attr("label")}\n${ele.attr("shortcut")}`);
		}, event => $("#tooltips").removeClass("shown"));

		Mousetrap.bind(ele.attr("shortcut").replace(/ /g, ""), ele.trigger("click")); // eslint-disable-line no-undef
	});
});
