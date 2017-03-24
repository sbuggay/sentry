const os = require("os");
const express = require("express");
const packageConfig = require("../package.json");
const config = require("./config.json")
const app = express();

const staticInfo = {
	arch: os.arch(),
	platform: os.platform(),
	release: os.release(),
	type: os.type(),
	endianness: os.endianness()
};

const server = (port = 3333, config = "./config") => {
	let getServerInfo = () => {
		return Object.assign({}, staticInfo, {
			hostname: os.hostname(),
			uptime: os.uptime(),
			freemem: os.freemem(),
			totalmem: os.totalmem(),
			cpus: os.cpus()
		});
	};

	app.get("/", (request, response) => {
		response.send(getServerInfo());
	});

	app.listen(port, (error) => {
		if (error) {
			return console.error("Server error", error);
		}
		console.log(`${packageConfig.name}@${packageConfig.version} is running on port ${port}`);
	});
};

module.exports = {
	staticInfo,
	server
};