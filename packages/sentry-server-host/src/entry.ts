import * as program from "commander";

import { start } from "./index";

program
    .option('-c, --config <config>', 'path to config')
    .option('-p, --port <port>', 'port number')
    .parse(process.argv)

console.log(program);

start(program.port);
