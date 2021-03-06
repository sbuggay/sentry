import Server from "./Server";

import * as program from "commander";
import * as process from "process";

import Config, { editConfig } from "./Config";

program
	.option('-c, --config <config>', 'path to config')
	.option('-p, --port <port>', 'port number')
	.option('-e, --edit', 'edit server config')
	.parse(process.argv)


const configPath = program.config ? program.config : "config.json";
const config = new Config(configPath);

if (program.edit) {
	editConfig(config);
}
else {
	const server = new Server(config, program.port);
	server.start();
}
