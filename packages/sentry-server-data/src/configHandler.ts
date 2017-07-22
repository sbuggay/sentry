const json = require("json-update");

const configFile = "config.json";

export async function update(value: Object) {
    await json.update(configFile, value);
}

export async function updateServices(value: Object) {
    const data = await json.load(configFile);
    data.services.push(value);
    await json.update(configFile, { services: data.services });
}