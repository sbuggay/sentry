import * as express from "express";
let router = express.Router();

router.get('/', (req, res) => {
	res.send(200);
});

router.post('/', (req, res) => {
	res.send(200);
});

export default router;