import createServer from './main/server';
import defaultOptions from './config/user.config';
import express from 'express';
import initData from "./main/init";
import registerRoutes from './main/router';

const options = defaultOptions;

const app = express();

let data = initData();
createServer(app, options);
registerRoutes(app, data);