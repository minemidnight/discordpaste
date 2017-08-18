const babelify = require("express-babelify-middleware"),
	cookieParser = require("cookie-parser"),
	fs = require("fs"),
	handlebars = require("handlebars");

const blocks = fs.readdirSync(`${__dirname}/blocks`);
const routes = fs.readdirSync(`${__dirname}/routes`);
const views = fs.readdirSync(`${__dirname}/views`);


module.exports = async port => {
	global.app = express();
	app.server = require("http").createServer(app);
	app.server.listen(port, () => console.log(`Website listening on ${port}`));
	app.config = require(`${__dirname}/../../config.json`);

	app.use(`/assets/js`, babelify(`${__dirname}/public/assets/js`));
	app.use(express.static(`${__dirname}/public`));
	app.use(cookieParser());

	app.hbs = views.reduce((prev, view) => {
		prev[view.substring(0, view.lastIndexOf("."))] = fs.readFileSync(`${__dirname}/views/${view}`, "utf8");
		return prev;
	}, {});

	app.blocks = blocks.reduce((prev, block) => {
		prev[block.substring(0, block.lastIndexOf("."))] = fs.readFileSync(`${__dirname}/blocks/${block}`, "utf8");
		return prev;
	}, {});

	app.page = async (req, page, context = {}) => {
		context.baseURL = app.config.baseURL;
		if(req.user) context.user = req.user;

		for(let block in app.blocks) context[block] = handlebars.compile(app.blocks[block])(context);
		return handlebars.compile(app.hbs[page])(context);
	};

	routes.forEach(script => {
		let scriptName = script.substring(0, script.lastIndexOf("."));
		if(scriptName === "index") app.use(`/`, require(`${__dirname}/routes/${script}`));
		else app.use(`/${scriptName}`, require(`${__dirname}/routes/${script}`));
	});
	app.all("*", async (req, res) => res.redirect(app.config.baseURL).end());
};
