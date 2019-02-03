import * as os from "os";
import * as express from "express";
import { exec } from "child_process";

import * as si from "systeminformation";

import * as crypto from "crypto";

const app = express();
const packageConfig = require("../package.json");

import Cache from "./Cache";
import Config from "./Config";

interface IStaticInfo {
	arch: string;
	platform: string;
	release: string;
	type: string;
	endianness: string;
}

interface IDynamicInfo {
	hostname: string;
	uptime: number;
	freemem: number;
	totalmem: number;
	cpus: any;
	loadavg: number[];
	battery: si.Systeminformation.BatteryData;
	graphics: si.Systeminformation.GraphicsData;
	osInfo: si.Systeminformation.OsData;
	fsSize: si.Systeminformation.FsSizeData[];
	cpuTemp: si.Systeminformation.CpuTemperatureData;
}

export const staticInfo: IStaticInfo = {
	arch: os.arch(),
	platform: os.platform(),
	release: os.release(),
	type: os.type(),
	endianness: os.endianness()
};

export async function dynamicInfo(): Promise<IDynamicInfo> {
	const osData = {
		hostname: os.hostname(),
		uptime: os.uptime(),
		freemem: os.freemem(),
		totalmem: os.totalmem(),
		cpus: os.cpus(),
		loadavg: os.loadavg()
	}

	const promises = [
		si.battery(),
		si.graphics(),
		si.osInfo(),
		si.fsSize(),
		si.cpuTemperature()
	];

	const [battery, graphics, osInfo, fsSize, cpuTemp] = await Promise.all(promises);
	return {
		...osData,
		battery,
		graphics,
		osInfo,
		fsSize,
		cpuTemp
	};

}

export const serviceInfo = (services: any) => {
	return Object.keys(services).map(key => {
		let service = services[key];
		return () => new Promise(resolve => {
			exec(service.script, (error, stdout, stderr) => {
				resolve({
					name: service.name,
					status: stdout.indexOf(service.test) > -1
				});
			});
		});
	});
};

export default class Server {
	port: number;
	cache: Cache;
	config: Config;

	constructor(config: Config, port = 3333) {
		this.config = config;
		this.port = port;
		this.cache = new Cache();
		this.cache.set("staticInfo", staticInfo);
		this.cache.addCacheFunction("dynamicInfo", dynamicInfo);
		const services = config.get("services");
		if (services) {
			this.cache.addCacheFunctions("serviceInfo", services);
		}
		this.cache.runCacheFunctions();

		if (!config.get("apikey")) {
			console.log("No apikey found in config. Generating...");
			const apikey = crypto.randomBytes(32).toString("hex");
			console.log(apikey);
			console.log('Please provide this as a header with the key "apikey" to any request made to this server');
			config.set("apikey", apikey);
		}
	}

	serverInfo() {
		return {
			version: packageConfig.version,
			staticInfo: this.cache.get("staticInfo"),
			dynamicInfo: this.cache.get("dynamicInfo"),
			serviceInfo: this.cache.get("serviceInfo")
		};
	}

	start() {
		app.use((req, res, next) => {
			const apikey = this.config.get("apikey");

			if (req.header("apikey") === apikey || (req.query.apikey && req.query.apikey === apikey)) {
				next();
			} else {
				res.sendStatus(401);
			}
		});

		app.get("/", (req, res) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.json(this.serverInfo());
		});

		app.listen(this.port, (error: any) => {
			if (error) {
				return console.error("Server error", error);
			}
			console.log(`${packageConfig.name}@${packageConfig.version} is running on port ${this.port}`);
		});
	}
}
