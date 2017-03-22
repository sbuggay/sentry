var express = require("express");
var path = require("path");
var app = express();

app.use(express.static(path.join(__dirname, "../node_modules/sentry-client-dist/dist")));

// Listen for requests
var server = app.listen(3000, function () {

});