import * as express from "express";
import * as path from "path";
let app = express();

import apiRoute from "./api";

export function start(port = 3030) {
	app.use(express.static(path.join(__dirname, "../node_modules/sentry-client-dist/")));

	app.use("/api", apiRoute);

	// Listen for requests
	app.listen(port, () => {
		console.log(`listening on port ${port}`);
	});
}

