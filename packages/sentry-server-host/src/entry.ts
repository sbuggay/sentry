import * as program from "commander";

import { start } from "./index";

program
    .option('-c, --config <config>', 'path to config')
    .option('-p, --port <port>', 'port number')
    .parse(process.argv)

start(program.port);
