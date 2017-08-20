async function startupMessage(msg) {
	if(msg.type !== "startup") {
		cluster.worker.once("message", startupMessage);
		return;
	}

	require(`${__dirname}/rethink`);
	if(msg.processType === "api") require(`${__dirname}/api/v${msg.version}/index.js`)(msg.port);
	else require(`${__dirname}/site/index.js`)(msg.port);

cluster.worker.once("message", startupMessage);
