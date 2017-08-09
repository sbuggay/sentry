import * as express from "express";
let router = express.Router();

import { pollServers } from "./polling";

import { configGet } from "./configHandler";

router.get("/", (req, res) => {
    const hosts = configGet("servers").map((server: any) => server.host);  

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type: application/json");
    pollServers(hosts).then((result) => {
        res.send(result);
    });
});

router.post("/", (req, res) => {
    res.send(200);
});

export default router;