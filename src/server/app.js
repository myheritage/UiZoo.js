var express = require('express')
var app = express();
import documentExtractor from "./services/documentExtractor";

/**
 * Get this document
 */
app.get('/', function (req, res) {
  documentExtractor(req.query.file, data => {
    res.send(data);
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})