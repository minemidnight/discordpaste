const bodyParser = require("body-parser");
const routes = require("fs").readdirSync(`${__dirname}/routes`);

module.exports = async port => {
	global.app = express();
	app.server = require("http").createServer(app);
	app.server.listen(port, () => console.log(`API V1 Listening on ${port}`));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	const recentRequests = new Map();
	app.ratelimit = (max, seconds) => async (req, res, next) => {
		let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
		let recent = recentRequests.get(ip + req.path) || 0;

		if(recent >= max) {
			res.status(429).json({ message: "You are being rate limited" }).end();
		} else {
			recentRequests.set(ip + req.path, recent + 1);
			setTimeout(() => {
				if(recentRequests.get(ip + req.path) === 1) recentRequests.delete(ip + req.path);
				else recentRequests.set(ip + req.path, recentRequests.get(ip + req.path) - 1);
			}, seconds * 1000);
			next();
		}
	};

	routes.forEach(script => {
		let scriptName = script.substring(0, script.lastIndexOf("."));
		app.use(`/${scriptName}`, require(`${__dirname}/routes/${script}`));
	});
	app.all("*", (req, res) => res.status(404).json({ message: "Method not found" }).end());
};
