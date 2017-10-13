let compression = require('compression');
let cors = require('cors');
let express = require('express');
let http = require('http');
let {json} = require('body-parser');
let path = require('path');

/**
 * @export
 * @param {Express} app 
 * @returns Express
 */
module.exports = function (app) {
    useDependencies(app);
    start(app);
    return app;
}

/**
 * @param {Express} app 
 */
function useDependencies(app) {
    app.use(json());
    app.use(compression({
        level: 1
    }));
    app.use(cors());
}

/**
 * @param {Express} app 
 */
function start(app) {
    let rootDir = getRootDir(__dirname);
    app.set('port', (process.env.PORT || 5000));
    
    app.use('/dist', express.static(path.join(rootDir, 'dist')));
    app.use('/vendors', express.static(path.join(rootDir, 'vendors')));
    app.use('/node_modules', express.static(path.join(rootDir, 'node_modules')));
    app.use('/favicon.ico', express.static(path.join(rootDir, 'favicon.ico')));

    app.all("/*", (req, res) => {
        res.sendFile("index.html", {root: rootDir});
    });
    
    let server = http.createServer(app)
        .listen(app.get('port'));

    console.log("\t+*+*+ New server on localhost:" + app.get('port') + " +*+*+");
}

/**
 * @param {string} dirname 
 * @returns string
 */
function getRootDir(dirname) {
    return path.dirname(path.dirname(__dirname));
}