import * as os from "os";
import * as express from "express";
import { exec } from "child_process";
import * as getos from "getos";

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
}

export const staticInfo: IStaticInfo = {
    arch: os.arch(),
    platform: os.platform(),
    release: os.release(),
    type: os.type(),
    endianness: os.endianness()
};

export function dynamicInfo(): Promise<IDynamicInfo> {
    return new Promise((resolve) => {
        resolve({
            hostname: os.hostname(),
            uptime: os.uptime(),
            freemem: os.freemem(),
            totalmem: os.totalmem(),
            cpus: os.cpus(),
            loadavg: os.loadavg()
        });
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
        getos((error, os) => {
            this.cache.set("os", os);
        });
        this.cache.addCacheFunction("dynamicInfo", dynamicInfo);
        this.cache.addCacheFunctions("serviceInfo", serviceInfo(config.get("services")));
        this.cache.runCacheFunctions();
    }

    serverInfo() {
        return {
            "version": packageConfig.version,
            "staticInfo": this.cache.get("staticInfo"),
            "os": this.cache.get("os"),
            "dynamicInfo": this.cache.get("dynamicInfo"),
            "serviceInfo": this.cache.get("serviceInfo")
        }
    }

    start() {
        app.get("/", (request, response) => {
            response.header("Access-Control-Allow-Origin", "*");
            response.json(this.serverInfo());
        });

        app.listen(this.port, (error: any) => {
            if (error) {
                return console.error("Server error", error);
            }
            console.log(`${packageConfig.name}@${packageConfig.version} is running on port ${this.port}`);
        });
    }
};