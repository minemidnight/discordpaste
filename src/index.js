global.Promise = require("bluebird");
global.cluster = require("cluster");
global.express = require("express");
if(cluster.isMaster) require("./master.js");
else require("./worker.js");
