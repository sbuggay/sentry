import * as os from "os";
import * as express from "express";
import { exec } from "child_process";

import { battery, graphics, osInfo, fsSize, cpuTemperature, Systeminformation } from "systeminformation";

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
    loadavg: any;
    battery: Systeminformation.BatteryData;
    graphics: Systeminformation.GraphicsData;
    osInfo: Systeminformation.OsData;
    fsSize: Systeminformation.FsSizeData[];
    cpuTemp: Systeminformation.CpuTemperatureData;
}

export const staticInfo: IStaticInfo = {
    arch: os.arch(),
    platform: os.platform(),
    release: os.release(),
    type: os.type(),
    endianness: os.endianness()
};

export function dynamicInfo(): Promise<IDynamicInfo> {
    function getOsData() {
        return {
            hostname: os.hostname(),
            uptime: os.uptime(),
            freemem: os.freemem(),
            totalmem: os.totalmem(),
            cpus: os.cpus(),
            loadavg: os.loadavg()
        }
    }

    return Promise.all([
        battery(),
        graphics(),
        osInfo(),
        fsSize(),
        cpuTemperature()
    ]).then(([battery, graphics, osInfo, fsSize, cpuTemp]) => {
        return {
            ...getOsData(),
            battery,
            graphics,
            osInfo,
            fsSize,
            cpuTemp,
        }
    });
}

export const serviceInfo = (services: any) => {
    return Object.keys(services).map((key) => {
        let service = services[key];
        return () => new Promise((resolve) => {
            exec(service.script, (error, stdout, stderr) => {
                resolve({
                    name: service.name,
                    status: (stdout.indexOf(service.test) > -1)
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
        this.cache.addCacheFunctions("serviceInfo", serviceInfo(config.get("services")));
        this.cache.runCacheFunctions();


        if (!config.get("apikey")) {
            console.log("No apikey found in config. Generating...");
            const apikey = crypto.randomBytes(32).toString("hex");
            console.log(apikey);
            console.log("Please provide this as a header with the key \"apikey\" to any request made to this server");
            config.set("apikey", apikey);
        }
    }

    serverInfo() {
        return {
            version: packageConfig.version,
            staticInfo: this.cache.get("staticInfo"),
            dynamicInfo: this.cache.get("dynamicInfo"),
            serviceInfo: this.cache.get("serviceInfo")
        }
    }

    start() {
        app.use((req, res, next) => {
            const apikey = this.config.get("apikey");

            if (req.header("apikey") === apikey) {
                next();
            }
            else {
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
};