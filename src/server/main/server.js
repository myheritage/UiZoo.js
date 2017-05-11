import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import {
    json
} from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

/**
 * @export
 * @param {Express} app 
 * @returns Express

 * 
 */
export default function (app) {
    useDependencies(app);
    start(app);
    return app;
}

/**
 * @param {Express} app 
 */
function useDependencies(app) {
    app.use(json());
    app.use(helmet());
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
    app.set('view engine', 'ejs');
    app.set('port', (process.env.PORT || 5000));
    app.set('views', path.join(rootDir, '/html'));
    app.use('/client', express.static(path.join(rootDir, '/../client')));
    
    let server = http.createServer(app)
        .listen(app.get('port'));

    console.log("\t+*+*+ New server on localhost:" + app.get('port') + " +*+*+");
}

/**
 * @param {string} dirname 
 * @returns string
 */
function getRootDir(dirname) {
    let paths = dirname.split(path.sep);
    paths.splice(paths.length - 1);
    dirname = paths.join(path.sep);
    return dirname;
}