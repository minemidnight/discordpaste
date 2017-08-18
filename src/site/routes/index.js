const router = module.exports = express.Router(); // eslint-disable-line new-cap
const superagent = require("superagent");

router.get("/", async (req, res) => {
	res.status(200).send(await app.page(req, "index", { post: true, content: "" })).end();
});

const validLangs = ["apl", "asciiarmor", "asn.1", "asterisk", "brainfuck", "clike", "clojure",
	"cmake", "cobol", "coffeescript", "commonlisp", "crystal", "css", "cypher", "d", "dart",
	"diff", "django", "dockerfile", "dtd", "dylan", "ebnf", "ecl", "eiffel", "elm", "erlang",
	"factor", "fcl", "forth", "fortran", "gas", "gfm", "gherkin", "go", "groovy", "haml",
	"handlebars", "haskell-literate", "haskell", "haxe", "htmlembedded", "htmlmixed", "http",
	"idl", "javascript", "jinja2", "jsx", "julia", "livescript", "lua", "markdown", "mathematica",
	"mbox", "meta", "mirc", "mllike", "modelica", "mscgen", "mumps", "nginx", "nsis", "ntriples",
	"octave", "oz", "pascal", "pegjs", "perl", "php", "pig", "powershell", "properties", "protobuf",
	"pug", "puppet", "python", "q", "r", "rpm", "rst", "ruby", "rust", "sas", "sass", "scheme", "shell",
	"sieve", "slim", "smalltalk", "smarty", "solr", "soy", "sparql", "spreadsheet", "sql", "stex",
	"stylus", "swift", "tcl", "textile", "tiddlywiki", "tiki", "toml", "tornado", "troff", "ttcn-cfg",
	"ttcn", "turtle", "twig", "vb", "vbscript", "velocity", "verilog", "vhdl", "vue", "webidl", "xml",
	"xquery", "yacas", "yaml-frontmatter", "yaml", "z80"];

router.get("/:id", async (req, res) => {
	let lang = false, id = req.params.id;
	if(~id.indexOf(".")) {
		id = id.substring(0, id.indexOf("."));
		lang = id.substring(id.indexOf(".") + 1).toLowerCase();
		if(!~validLangs.indexOf(lang)) lang = false;
	}

	try {
		let { body: { content } } = await superagent.get(`${app.config.baseURL}/api/v1/documents/${id}`);
		res.status(200).send(await app.page(req, "index", { content, lang, view: true, id })).end();
	} catch(err) {
		res.redirect(app.config.baseURL);
	}
});
