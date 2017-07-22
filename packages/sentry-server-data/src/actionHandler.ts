const prompt = require("prompt");

const SERVICE_ADD = "add-service";
const SERVICE_REMOVE = "remove-service";
const SERVICE_EDIT = "edit-service";
const SERVICE_LIST = "list-services";

import { updateServices } from "./configHandler";


prompt.message = "";

export function handleAction(args: string[]) {
    const action = args[0];

    switch (action) {
        case SERVICE_ADD:
            addService();
            break;
        case SERVICE_REMOVE:

            break;
        case SERVICE_EDIT:

            break;
        case SERVICE_LIST:

            break;
        default:
            break;
    }
}



export function addService() {
    prompt.start();

    const options = ["service", "script", "test"];

    prompt.get(options, (err: any, result: any) => {
        updateServices({ service: result.service, script: result.script, test: result.test });
    });
}