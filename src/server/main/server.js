import compression from 'compression';
import cors from 'cors';
import createComponentContainer from "../services/componentContainerCreator";
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import {
    json,
} from 'body-parser';
import libraryConfig from '../config/user.config';
import libraryConfigExecuter from '../services/libraryConfigExecuter';
import path from 'path';

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

    createComponentContainer(libraryConfigExecuter(libraryConfig).components);
    
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