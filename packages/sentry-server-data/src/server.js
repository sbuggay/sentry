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

const dynamicInfo = () => {
	return new Promise((resolve, reject) => {
		resolve({
			hostname: os.hostname(),
			uptime: os.uptime(),
			freemem: os.freemem(),
			totalmem: os.totalmem(),
			cpus: os.cpus()
		});
	});
}


const serverScripts = () => {
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

class Server {
	constructor(port = 3333) {
		this.port = port;
		this.cache = new Cache();
		this.cache.set("staticInfo", staticInfo);
		this.cache.addAction("dynamicInfo", dynamicInfo);
		this.cache.addAction("services", serverScripts);
	}

	serverInfo() {
		return {
			"staticInfo": this.cache.get("staticInfo"),
			"dynamicInfo": this.cache.get("dynamicInfo"),
			"services": this.cache.get("services")
		}
	}

	start() {
		app.get("/", (request, response) => {
			response.send(this.serverInfo());
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