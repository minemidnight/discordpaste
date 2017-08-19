/* eslint-disable id-length, max-len */
const extensions = {
	apl: ["dyalog"],
	"asn.1": ["asn", "asn1"],
	brainfuck: ["b", "bf"],
	clike: ["c", "cats", "h", "idc", "w", "cshtml", "csx", "cpp", "c++", "cc", "cxx", "h++", "hpp", "hxx", "inl", "ipp", "tcc", "tpp", "kt", "ktm", "kts", "scala", "sbt", "nut", "ceylon", "java"],
	cmake: ["cmake.in"],
	cobol: ["cob", "cbl", "ccp", "cpy"],
	clojure: ["clj", "boot", "cl2", "cljc", "cljs", "cljs.hl", "cljscm", "cljx", "hic"],
	coffeescript: ["coffee", "_coffee", "cake", "cjsx", "iced"],
	crystal: ["cr"],
	d: ["di"],
	diff: ["patch"],
	dylan: ["dyl", "intr", "lid"],
	ecl: ["eclxml"],
	eiffel: ["e"],
	erlang: ["erl", "app.src", "es", "escript", "hrl", "xrl", "yrl"],
	forth: ["fth", "4th", "fr", "frt", "fs"],
	fortran: ["f90", "f03", "f08", "f77", "f95", "fpp"],
	gherkin: ["feature"],
	groovy: ["grt", "gtpl", "gvy"],
	html: ["htm", "html.hl", "xht", "xhtml"],
	haml: ["haml.deface"],
	handlebars: ["hbs"],
	haskell: ["hs", "hsc"],
	haxe: ["hx", "hxsl"],
	idl: ["pro", "dlm"],
	javascript: ["js", "_js", "bones", "es6", "frag", "gs", "jake", "jsb", "jscad", "jsfl", "jsm", "jss", "njs", "pac", "sjs", "ssjs", "xsjs", "xsjslib"],
	julia: ["jl"],
	livescript: ["ls", "_ls"],
	lua: ["nse", "rbxs", "wlua"],
	m: ["mumps"],
	markdown: ["md", "mdown", "mdwn", "mkd", "mkdn", "mkdown", "ron", "workbook"],
	mathematica: ["cdf", "ma", "mt", "nb", "nbp", "wl", "wlt"],
	matlab: ["m"],
	modelica: ["mo"],
	nsis: ["nsi", "nsh"], nginx: ["nginxconf", "vhost"], php: ["aw", "ctp", "php3", "php4", "php5", "phps", "phpt"], pascal: ["pas", "dfm", "dpr", "lpr"], perl: ["pl", "al", "ph", "plx", "pm", "pod", "psgi", "t"], powershell: ["ps1", "psd1", "psm1"], pug: ["jade"], puppet: ["pp"], python: ["py", "bzl", "gyp", "gypi", "lmi", "py3", "pyde", "pyi", "pyp", "pyt", "pyw", "rpy", "tac", "wsgi", "xpy"], r: ["rd", "rsx"], ruby: ["rb", "builder", "eye", "gemspec", "god", "jbuilder", "mspec", "podspec", "rabl", "rake", "rbuild", "rbw", "rbx", "ru", "spec", "thor", "watchr"], rust: ["rs", "rs.in"], sparql: ["rq"], sql: ["cql", "ddl", "mysql", "prc", "tab", "udf", "viw"], scheme: ["scm", "sch", "sld", "sls", "sps", "ss"], shell: ["sh", "bash", "bats", "command", "ksh", "sh.in", "tmux", "tool", "zsh"], skript: ["sk"], smalltalk: ["cs"], smarty: ["tpl"], stylus: ["styl"], tcl: ["adp", "tm"], turtle: ["ttl"], vhdl: ["vhd", "vhf", "vhi", "vho", "vhs", "vht", "vhw"], verilog: ["v", "veo"], xml: ["adml", "admx", "ant", "axml", "builds", "ccxml", "clixml", "cproject", "csl", "csproj", "ct", "dita", "ditamap", "ditaval", "dll.config", "dotsettings", "filters", "fsproj", "fxml", "glade", "gml", "grxml", "iml", "ivy", "jelly", "jsproj", "kml", "launch", "mdpolicy", "mjml", "mm", "mod", "mxml", "nproj", "nuspec", "odd", "osm", "pkgproj", "plist", "props", "ps1xml", "psc1", "pt", "rdf", "resx", "rss", "scxml", "sfproj", "srdf", "storyboard", "stTheme", "sublime-snippet", "targets", "tmCommand", "tml", "tmLanguage", "tmPreferences", "tmSnippet", "tmTheme", "ts", "tsx", "ui", "urdf", "ux", "vbproj", "vcxproj", "vsixmanifest", "vssettings", "vstemplate", "vxml", "wixproj", "wsdl", "wsf", "wxi", "wxl", "wxs", "x3d", "xacro", "xaml", "xib", "xlf", "xliff", "xmi", "xml.dist", "xproj", "xsd", "xspec", "xul", "zcml"],
	xquery: ["xq", "xql", "xqm", "xqy"],
	yaml: ["yml", "reek", "rviz", "sublime-syntax", "syntax", "yaml-tmlanguage", "yml.mysql"]
};

const extensionMap = Object.keys(extensions).reduce((prev, key) => {
	extensions[key].forEach(ext => prev[ext] = key); return prev;
}, {});

/* eslint-enable id-length, max-len */

const validLangs = ["apl", "asciiarmor", "asn.1", "asterisk", "brainfuck", "clike", "clojure",
	"cmake", "cobol", "coffeescript", "commonlisp", "crystal", "css", "cypher", "d", "dart",
	"diff", "django", "dockerfile", "dtd", "dylan", "ebnf", "ecl", "eiffel", "elm", "erlang",
	"factor", "fcl", "forth", "fortran", "gas", "gfm", "gherkin", "go", "groovy", "haml",
	"handlebars", "haskell-literate", "haskell", "haxe", "html", "http",
	"idl", "javascript", "jinja2", "jsx", "julia", "livescript", "lua", "markdown", "mathematica",
	"mbox", "meta", "mirc", "mllike", "modelica", "mscgen", "mumps", "nginx", "nsis", "ntriples",
	"octave", "oz", "pascal", "pegjs", "perl", "php", "pig", "powershell", "properties", "protobuf",
	"pug", "puppet", "python", "q", "r", "rpm", "rst", "ruby", "rust", "sas", "sass", "scheme", "shell",
	"sieve", "skript", "slim", "smalltalk", "smarty", "solr", "soy", "sparql", "spreadsheet", "sql", "stex",
	"stylus", "swift", "tcl", "textile", "tiddlywiki", "tiki", "toml", "tornado", "troff", "ttcn-cfg",
	"ttcn", "turtle", "twig", "vb", "vbscript", "velocity", "verilog", "vhdl", "vue", "webidl", "xml",
	"xquery", "yacas", "yaml-frontmatter", "yaml", "z80"];

module.exports = lang => {
	if(extensionMap[lang]) lang = extensionMap[lang];
	if(!~validLangs.indexOf(lang)) return false;

	let extension = extensions[lang] ? extensions[lang][0] : lang;
	return { codeMirror: lang, extension };
};
