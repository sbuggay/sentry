import * as nconf from "nconf";
import { existsSync, copyFileSync } from "fs";

export function configInit(configPath: string) {
    if (!existsSync(configPath)) {
        console.log("No config file present. Copying from config.default.json");
        copyFileSync("./cfg/config.default.json", configPath);
    }

    nconf.use("file", { file: configPath });
    configLoad();
}

export function configGet(key: string) {
    return nconf.get(key);
}

export function configSet(key: string, value: Object) {
    nconf.set(key, value);
}

export function configSave() {
    nconf.save((error: Error) => {
        if (error) {
            console.error(error.message);
            return;
        }
    });
}

export function configLoad() {
    nconf.load();
}