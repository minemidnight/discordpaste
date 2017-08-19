global.Promise = require("bluebird");
global.cluster = require("cluster");
global.express = require("express");
process.on("unhandledRejection", err => console.error(err.stack));
if(cluster.isMaster) require("./master.js");
else require("./worker.js");
