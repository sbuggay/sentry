import * as nconf from "nconf";

export function configInit(path: string) {
    nconf.use("file", { file: path });
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