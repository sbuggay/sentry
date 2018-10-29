import Server from "./Server";

import * as program from "commander";

import { editConfig } from "./actionHandler";

program
    .option('-c, --config <config>', 'path to config')
    .option('-p, --port <port>', 'port number')
    .option('-e, --edit', 'edit server config')
    .parse(process.argv)

if (program.edit) {
    editConfig();
}
else {
    const server = new Server(program.port);
    server.start();
}
