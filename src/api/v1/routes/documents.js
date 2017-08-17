const router = module.exports = express.Router(); // eslint-disable-line new-cap
const shortid = require("shortid");

// POST /documents (create document)
router.post("/", async (req, res) => {
	let content = req.body.content;

	if(!content) {
		res.status(400).json({ message: "No content" }).end();
	} else if(content.length >= 100000) {
		res.status(400).json({ message: "Content over 100,000 characters" }).end();
	} else {
		let id = shortid.generate();
		let insertion = { id, content };
		await r.table("documents").insert(insertion).run();
		res.status(201).json(insertion).end();
	}
});

// GET /documents/id (get document)
router.get("/:id", async (req, res) => {
	let id = req.params.id;
	let document = await r.table("documents").get(id).run();
	if(document) {
		res.status(200).json(document).end();
	} else {
		res.status(404).json({ message: "Document not found" }).end();
	}
});
