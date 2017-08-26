const babelify = require("express-babelify-middleware"),
	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"),
	fs = require("fs"),
	handlebars = require("handlebars"),
	superagent = require("superagent");

const blocks = fs.readdirSync(`${__dirname}/blocks`);
const routes = fs.readdirSync(`${__dirname}/routes`);
const views = fs.readdirSync(`${__dirname}/views`);

module.exports = async port => {
	global.app = express();
	app.server = require("http").createServer(app);
	app.server.listen(port, () => console.log(`Website listening on ${port}`));
	app.config = require(`${__dirname}/../../config.json`);

	app.use(`/assets/js`, babelify(`${__dirname}/public/assets/js`, babelify.browserifySettings, {
		plugins: ["es6-promise"],
		presets: ["es2016"]
	}));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
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

	async function refreshToken(token) {
		let data = {
			refresh_token: token.refresh_token, // eslint-disable-line camelcase
			grant_type: "refresh_token" // eslint-disable-line camelcase
		};

		let base64 = new Buffer(`347217381128404994:${app.config.secret}`).toString("base64");
		try {
			let { body } = await superagent.post("https://discordapp.com/api/oauth2/token")
				.set("Authorization", `Basic ${base64}`).type("form").send(data);
			body.time = Date.now();
			return body;
		} catch(err) {
			return false;
		}
	}

	app.page = (req, page, context = {}) => {
		context.baseURL = app.config.baseURL;
		if(req.user) {
			context.user = req.user;
			context.options = req.options;
		}

		for(let block in app.blocks) context[block] = handlebars.compile(app.blocks[block])(context);
		return handlebars.compile(app.hbs[page])(context);
	};

	const infoCache = new Map();
	app.discordInfo = async (apipath, req) => {
		let token = req.token;
		if(!token) return false;

		if(Date.now() - token.time >= token.expires_in) {
			let newToken = await refreshToken(token);
			if(!newToken) {
				req.scriptAddition += `<script>document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC"</script>`;
				delete req.token;
				return false;
			} else {
				token = req.token = newToken;
				req.scriptAddition += `<script>` +
					`document.cookie = "token=${JSON.stringify(token).replace(/"/g, `\\"`)};` +
					`expires=Fri, 31 Dec 2020 23:59:59 GMT";` +
					`window.location.href = "${app.config.baseURL}"` +
					`</script>`;
			}
		}

		try {
			if(infoCache.has(`${token.access_token}/${apipath}`)) return infoCache.get(`${token.access_token}/${apipath}`);
			let { body: resp } = await superagent.get(`https://discordapp.com/api/${apipath}`)
				.set("Authorization", `Bearer ${token.access_token}`);

			infoCache.set(`${token.access_token}/${apipath}`, resp);
			setTimeout(() => infoCache.delete(`${token.access_token}/${apipath}`), 600000);
			return resp;
		} catch(err) {
			return false;
		}
	};

	app.use(async (req, res, next) => {
		res.page = (page, context) => res.send(app.page(req, page, context));
		req.discordInfo = apipath => app.discordInfo(apipath, req);

		req.scriptAddition = "";
		if(req.cookies.token) {
			try {
				let token = JSON.parse(req.cookies.token);
				req.token = token;
				req.user = await req.discordInfo("users/@me");
				req.options = await r.table("settings").get(req.user.id).run();
				if(req.options) req.options = req.options.settings;
			} catch(err) {
				req.scriptAddition += `<script>document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC"</script>`;
			}
		}

		next();
	});


	routes.forEach(script => {
		let scriptName = script.substring(0, script.lastIndexOf("."));
		if(scriptName === "index") app.use(`/`, require(`${__dirname}/routes/${script}`));
		else app.use(`/${scriptName}`, require(`${__dirname}/routes/${script}`));
	});
	app.all("*", async (req, res) => res.redirect(app.config.baseURL));
};
