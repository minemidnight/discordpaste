const router = module.exports = express.Router(); // eslint-disable-line new-cap
const superagent = require("superagent");

router.get("/:id", async (req, res) => {
	try {
		let { body: { content } } = await superagent.get(`${app.config.baseURL}/ap/v1/documents/${req.params.id}`);
		res.status(200).send(content).end();
	} catch(err) {
		res.redirect(app.config.baseURL).end();
	}
});
