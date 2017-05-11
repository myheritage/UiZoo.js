var express = require('express');
var path = require("path");
var app = express();

import bundleUserAssets from "./services/userAssetBundlerService";
import documentExtractor from "./services/documentExtractor";
import libraryConfig from "../config/user.config.js";
import libraryConfigExecuter from "./services/libraryConfigExecuter";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/html'));
app.use("/client", express.static(__dirname + "/../client"));
app.use("/userdata", express.static(__dirname + "/../userdata"));
app.use("/data", express.static("../data"));

app.all("/:component?", (req, res) => {
  res.locals.configuration = libraryConfigExecuter(libraryConfig);
  res.render("index.ejs");
});

app.get('/documentation', function (req, res) {
  documentExtractor(req.query.file, data => {
    res.send(data);
  });
})

app.listen(3000, function () {
  bundleUserAssets(libraryConfig);
})