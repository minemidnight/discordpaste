const router = module.exports = express.Router(); // eslint-disable-line new-cap
const keys = ["mode", "modeExt", "tabType", "tabSize", "theme", "keyMap"];

router.post("/", async (req, res) => {
	if(!req.user) {
		res.status(401).send({ message: "Not logged in" }).end();
	} else if(Object.keys(req.body).some(key => !~keys.indexOf(key))) {
		res.status(400).send({ message: "Invalid keys" }).end();
	} else {
		if(!req.options) {
			await r.table("settings").insert({ id: req.user.id, settings: req.body }).run();
		} else {
			await r.table("settings").get(req.user.id).update({ settings: req.body }).run();
		}

		res.status(204).end();
	}
});
