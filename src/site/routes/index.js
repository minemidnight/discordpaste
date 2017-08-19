const router = module.exports = express.Router(); // eslint-disable-line new-cap
const superagent = require("superagent");
const validLang = require(`${__dirname}/../../classify/validLang.js`);

router.get("/", async (req, res) => {
	res.status(200).send(await app.page(req, "index", { post: true, content: "" })).end();
});

router.get("/:id", async (req, res) => {
	let id = req.params.id, lang;
	if(~id.indexOf(".")) {
		lang = id.substring(id.indexOf(".") + 1).toLowerCase();
		id = id.substring(0, id.indexOf("."));
		lang = validLang(lang);
		if(lang) lang = lang.codeMirror;
	}

	try {
		let { body: { content } } = await superagent.get(`${app.config.baseURL}/api/v1/documents/${id}`);
		res.status(200).page("index", {
			content, lang, view: true, id,
			html: lang === "html", skript: lang === "skript"
		}).end();
	} catch(err) {
		res.redirect(app.config.baseURL);
	}
});
