var express = require('express')
var app = express();
import documentExtractor from "./services/documentExtractor";

app.get('/:fileName', function (req, res) {
  documentExtractor(req.query.fileName, content => {
    res.send(content)
  });
  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})