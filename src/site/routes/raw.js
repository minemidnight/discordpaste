const router = module.exports = express.Router(); // eslint-disable-line new-cap
const superagent = require("superagent");

router.get("/:id", async (req, res) => {
	try {
		let { body: { content } } = await superagent.get(`${app.config.baseURL}/api/v1/documents/${req.params.id}`);
		res.set("Content-Type", "text/plain");
		res.status(200).send(content).end();
	} catch(err) {
		res.redirect(app.config.baseURL);
	}
});
