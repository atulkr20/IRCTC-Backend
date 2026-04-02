import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { config } from ('./config');
import logger from ('./config/logger');

const {corsMiddleware} = require('./middlewares/cors.middleware');
const errorHandler = require('./middlewares/error.middleware');
const {reqLogger} = require('./middlewares/req.middleware');
const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(reqLogger);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send('Hello from index.js of user-service')
})