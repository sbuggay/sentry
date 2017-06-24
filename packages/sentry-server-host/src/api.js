var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
	res.send(200);
});

router.post('/', (req, res) => {
	res.send(200);
});

module.exports = router;