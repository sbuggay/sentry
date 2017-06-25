const os = require("os");
const exec = require("child_process").exec;
const express = require("express");
const packageConfig = require("../package.json");
const config = require("./config.json")
const app = express();

const Cache = require("./Cache");

const staticInfo = {
	arch: os.arch(),
	platform: os.platform(),
	release: os.release(),
	type: os.type(),
	endianness: os.endianness()
};

class Server {
	constructor(port = 3333) {
		this.port = 3333;
		this.cache = new Cache();
	}

	// This is asynchronous, should we hold the request until they complete?
	runServerScripts() {
		const services = config.services;
		let promises = [];
		Object.keys(services).forEach((key) => {
			let service = services[key];
			const scriptPromise = new Promise((resolve, reject) => {
				exec(service.script, (error, stdout, stderr) => {
					resolve(Object.assign({}, service,
						{ result: (stdout.indexOf(service.test) > -1) }
					));
				});
			});
			promises.push(scriptPromise);
		});
		return Promise.all(promises);
	};

	getServerInfo() {
		return Object.assign({}, staticInfo, {
			hostname: os.hostname(),
			uptime: os.uptime(),
			freemem: os.freemem(),
			totalmem: os.totalmem(),
			cpus: os.cpus()
		});
	};

	start() {
		app.get("/", (request, response) => {
			// Caching?
			this.runServerScripts().then(services => {
				console.log(services);
				response.send(Object.assign({}, { services: services }, this.getServerInfo()));
			});
		});

		app.listen(this.port, (error) => {
			if (error) {
				return console.error("Server error", error);
			}
			console.log(`${packageConfig.name}@${packageConfig.version} is running on port ${this.port}`);
		});
	}
};

const server = new Server();
server.start();

module.exports = {
	staticInfo,
	server
};