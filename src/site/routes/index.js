const router = module.exports = express.Router(); // eslint-disable-line new-cap
const superagent = require("superagent");

router.get("/", async (req, res) => {
	res.status(200).send(await app.page(req, "index", { post: true, content: "" })).end();
});

/* eslint-disable id-length */
const extensionMaps = {
	action: "java",
	c: "clike",
	"c++": "clike",
	cc: "clike",
	class: "java",
	cpp: "clike",
	cs: "clike",
	cxX: "clike",
	do: "java",
	h: "clike",
	hbs: "handlebars",
	hpp: "clike",
	htm: "html",
	hxx: "clike",
	jhtml: "html",
	js: "javascript",
	jsp: "java",
	jspx: "java",
	php3: "php",
	php4: "php",
	php5: "php",
	phtml: "php",
	pl: "perl",
	pm: "perl",
	py: "python",
	rb: "ruby",
	rhtml: "ruby",
	rss: "xml",
	sh: "shell",
	shtml: "html",
	wss: "java",
	xhtml: "html",
	yaws: "erlang",
	yml: "yaml"
};
/* eslint-enable id-length */

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
		lang = id.substring(id.indexOf(".") + 1).toLowerCase();
		id = id.substring(0, id.indexOf("."));

		if(extensionMaps[lang]) lang = extensionMaps[lang];
		if(!~validLangs.indexOf(lang)) lang = false;
	}

	try {
		let { body: { content } } = await superagent.get(`${app.config.baseURL}/api/v1/documents/${id}`);
		res.status(200).send(await app.page(req, "index", { content, lang, view: true, id })).end();
	} catch(err) {
		res.redirect(app.config.baseURL);
	}
});
