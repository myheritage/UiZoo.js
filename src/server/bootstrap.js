import express from 'express';
import registerRoutes from './main/router';
import createServer from './main/server';

let app = express();
createServer(app);
registerRoutes(app);