import * as express from "express";
let router = express.Router();

import { pollServers } from "./polling";

import { configGet } from "./configHandler";

router.get("/", (req, res) => {
<<<<<<< HEAD
    const hosts = configGet("servers").map((server: any) => server.host);  

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type: application/json");
=======
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type: application/json");
    let hosts = [
        "http://127.0.0.1:3333",
        "http://127.0.0.1:3333",
        "http://127.0.0.1:3333"
    ];
>>>>>>> 66d896b3ce62ff1b5b156f6d0694db3a9ae36077
    pollServers(hosts).then((result) => {
        res.send(result);
    });
});

router.post("/", (req, res) => {
    res.send(200);
});

export default router;