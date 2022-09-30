// Env variables
require('dotenv').config();

import express from 'express';
import config from 'config';

const app = express();

// JSON middleware
app.use(express.json());

// DB
import db from '../config/db';

// Middleware
import morganMiddleware from './middleware/morganMiddleware';
app.use(morganMiddleware);

// Routes
import router from './router';
app.use('/api/', router);

// Logger
import Logger from '../config/logger';

// app port
const port = config.get<number>('port');

app.listen(port, async () => {
  await db();
  Logger.info(`App running at port ${port}`);
});
