import Server from "./Server";

import * as program from "commander";

import { handleAction } from "./actionHandler";

program
	.option('-c, --config <config>', 'path to config')
	.option('-p, --port <port>', 'port number')
	.parse(process.argv)

if (program.args.length > 0) {
	const args = program.args;
	handleAction(args);
}
else {
	const server = new Server(program.port);
	server.start();
}


