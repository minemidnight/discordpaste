const rethinkdbdash = require("rethinkdbdash");
module.exports = {
	init: async () => {
		const config = require(`${__dirname}/../config.json`);
		if(!config.database) process.exit("No database in config");

		let dbName = config.databaseName || "DiscordPaste";
		let connectionInfo = config.database;
		connectionInfo.silent = true;
		connectionInfo.db = dbName;
		const r = rethinkdbdash(connectionInfo); // eslint-disable-line id-length

		let dbs = await r.dbList().run();
		if(!~dbs.indexOf(dbName)) {
			console.log(`Creating database ${dbName}...`);
			await r.dbCreate(dbName).run();
		}

		let tableList = await r.tableList().run();
		let tablesExpected = [{
			name: "documents",
			primary: "id",
			indexes: ["poster"]
		}];

		for(let table of tablesExpected) {
			if(~tableList.indexOf(table.name)) continue;

			console.log(`Creating "${table.name}" table...`);
			await r.tableCreate(table.name, { primaryKey: table.primary }).run();

			if(table.indexes) {
				for(let index of table.indexes) await r.table(table.name).indexCreate(index).run();
			}
			if(table.insertions) {
				for(let insertion of table.insertions) await r.table(table.name).insert(insertion).run();
			}
		}

		console.log(`RethinkDB initated on master`);
		await r.getPoolMaster().drain();
		return true;
	},
	connect: async () => {
		const config = require(`${__dirname}/../config.json`);
		if(!config.database) return;

		let dbName = config.databaseName || "DiscordPaste";
		let connectionInfo = config.database;
		connectionInfo.silent = true;
		connectionInfo.db = dbName;
		global.r = rethinkdbdash(connectionInfo); // eslint-disable-line id-length
	}
};

if(!cluster.isMaster) module.exports.connect();
