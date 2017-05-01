var express = require('express');
var path = require("path");
var app = express();

import documentExtractor from "./services/documentExtractor";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/html'));
app.use("/client", express.static(__dirname + "/../client"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get('/documentation', function (req, res) {
  console.log("inside");
  documentExtractor(req.query.file, data => {
    res.send(data);
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})