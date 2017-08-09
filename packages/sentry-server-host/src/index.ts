import * as express from "express";
import * as path from "path";
const app = express();

const packageConfig = require("../package.json");

import { configInit } from "./configHandler";

import apiRoute from "./api";

export function start(port = 3030) {
    app.use(express.static(path.join(__dirname, "../node_modules/sentry-client-dist/")));
<<<<<<< HEAD

    app.use("/api", apiRoute);

    // Path must be relative to package
    configInit("./config.json");
=======

    app.use("/api", apiRoute);
>>>>>>> 66d896b3ce62ff1b5b156f6d0694db3a9ae36077

    // Listen for requests
    app.listen(port, () => {
        console.log(`${packageConfig.name}@${packageConfig.version} is running on port ${port}`);
    });
}

