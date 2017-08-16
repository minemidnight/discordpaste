const fs = Promise.promisifyAll(require("fs"));
let port = 7500;

async function spawnApiVersions() {
	let apiVersions = await fs.readdirAsync(`${__dirname}/api/`);
	for(let version of apiVersions) {
		version = version.substring(1);
		let worker = cluster.fork();
		worker.once("online", () => {
			worker.send({ type: "startup", processType: "api", version, port });
			port++;
		});
	}
}

async function init() {
	await (require(`${__dirname}/rethink`)).init();

	let website = cluster.fork();
	website.once("online", () => {
		website.send({ type: "startup", processType: "website", port });
		port++;

		spawnApiVersions();
	});
}
init();
