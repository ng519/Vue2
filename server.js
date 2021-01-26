var express = require("express");
var app = express();

app.use(express.json());

app.listen(3000, function() {
    console.log("Hi");
});