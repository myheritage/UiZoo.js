import createServer from './main/server';
import express from 'express';
import registerRoutes from './main/router';

let app = express();
createServer(app);
registerRoutes(app);