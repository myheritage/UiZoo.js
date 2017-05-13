import express from 'express';
import defaultOptions from './config/user.config';
import registerRoutes from './main/router';
import createServer from './main/server';

const options = defaultOptions;

const app = express();
createServer(app, options);
registerRoutes(app, options);