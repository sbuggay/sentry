import * as express from "express";
import * as path from "path";
let app = express();

import apiRoute from "./api";

app.use(express.static(path.join(__dirname, "../node_modules/sentry-client-dist/")));

app.use("/api", apiRoute);

const port = 3333;

// Listen for requests
const server = app.listen(port, () => {
	console.log(`listening on port ${port}`);
});