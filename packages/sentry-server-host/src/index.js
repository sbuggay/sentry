var express = require("express");
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, "../node_modules/sentry-client-dist/")));

// Listen for requests
var server = app.listen(port = 3333, () => {
	console.log(`listening on port ${port}`);
});