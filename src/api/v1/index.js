const bodyParser = require("body-parser");
const routes = require("fs").readdirSync(`${__dirname}/routes`);

module.exports = async port => {
	global.app = express();
	app.server = require("http").createServer(app);
	app.server.listen(port, () => console.log(`API V1 Listening on ${port}`));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	routes.forEach(script => {
		let scriptName = script.substring(0, script.lastIndexOf("."));
		app.use(`/${scriptName}`, require(`${__dirname}/routes/${script}`));
	});
	app.all("*", (req, res) => res.status(404).json({ message: "Method not found" }).end());
};
