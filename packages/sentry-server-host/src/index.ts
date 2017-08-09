import * as express from "express";
import * as path from "path";
const app = express();

const packageConfig = require("../package.json");

import { configInit } from "./configHandler";

import apiRoute from "./api";

export function start(port = 3030) {
    app.use(express.static(path.join(__dirname, "../node_modules/sentry-client-dist/")));

    app.use("/api", apiRoute);

    // Path must be relative to package
    configInit("./config.json");

    // Listen for requests
    app.listen(port, () => {
        console.log(`${packageConfig.name}@${packageConfig.version} is running on port ${port}`);
    });
}

