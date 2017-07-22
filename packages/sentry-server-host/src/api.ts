import * as express from "express";
let router = express.Router();

import { pollServers } from "./polling";

router.get('/', (req, res) => {
	let hosts = [
		"http://127.0.0.1:3333",
		"http://127.0.0.1:3333",
		"http://127.0.0.1:3333"
	]
	pollServers(hosts).then((result) => {
		res.send(result);
	});
});

router.post('/', (req, res) => {
	res.send(200);
});

export default router;