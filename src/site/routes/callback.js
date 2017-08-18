const router = module.exports = express.Router(); // eslint-disable-line new-cap
const superagent = require("superagent");

router.get("/", async (req, res) => {
	if(req.query.code) {
		try {
			var { body } = await superagent
				.post("https://discordapp.com/api/oauth2/token")
				.type("form")
				.send({
					client_id: "347217381128404994", // eslint-disable-line camelcase
					client_secret: app.config.secret, // eslint-disable-line camelcase
					code: req.query.code,
					grant_type: "authorization_code", // eslint-disable-line camelcase
					redirect_uri: `${app.config.baseURL}/callback` // eslint-disable-line camelcase
				});
		} catch(err) {
			res.redirect(`https://discordapp.com/oauth2/authorize?response_type=code&client_id=347217381128404994` +
				`&redirect_uri=${encodeURIComponent(`${app.config.baseURL}/callback`)}&scope=identify`);
			return;
		}

		body.time = Date.now();
		let stringified = JSON.stringify(body);
		res.status(200).send(`<script>` +
			`document.cookie = "token=${stringified.replace(/"/g, `\\"`)};` +
			`expires=Fri, 31 Dec 2020 23:59:59 GMT";` +
			`window.location.href = "${app.config.baseURL}"` +
			`</script>`).end();
	} else {
		res.redirect(app.config.website.baseURL).end();
	}
});
