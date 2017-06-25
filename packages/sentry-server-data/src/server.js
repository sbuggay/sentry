const os = require("os");
const exec = require("child_process").exec;
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

const server = (port = 3333) => {

	// This is asynchronous, should we hold the request until they complete?
	const runServerScripts = () => {
		const services = config.services;
		let promises = [];
		Object.keys(services).forEach((key) => {
			let service = services[key];
			const scriptPromise = new Promise((resolve, reject) => {
				exec(service.script, (error, stdout, stderr) => {
					resolve({
						service,
						result: (stdout.indexOf(service.test) > -1)
					});
				});
			});
			promises.push(scriptPromise);
		});
		return Promise.all(promises);
	};

	const getServerInfo = () => {
		return Object.assign({}, staticInfo, {
			hostname: os.hostname(),
			uptime: os.uptime(),
			freemem: os.freemem(),
			totalmem: os.totalmem(),
			cpus: os.cpus()
		});
	};

	app.get("/", (request, response) => {
		// Caching?
		runServerScripts().then(services => {
			console.log(services);
			response.send(Object.assign({}, { services: services }, getServerInfo()));
		});
		// response.send(getServerInfo());
	});

	app.listen(port, (error) => {
		if (error) {
			return console.error("Server error", error);
		}
		console.log(`${packageConfig.name}@${packageConfig.version} is running on port ${port}`);
	});
};

server();

module.exports = {
	staticInfo,
	server
};