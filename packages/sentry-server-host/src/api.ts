import * as express from "express";
let router = express.Router();

import { pollServers } from "./polling";

import { configGet } from "./configHandler";

router.get("/", (req, res) => {
    const servers = configGet("servers");

    res.header("Access-Control-Allow-Origin", "*");
    pollServers(servers).then((result) => {
        res.json(result);
    });
});

router.post("/", (req, res) => {
    res.send(200);
});

export default router;