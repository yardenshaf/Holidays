import express, { json } from 'express';
import config from 'config';
import sequelize from './db/sequelize';
import cors from 'cors';
import notFound from './middlewares/not-found';
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import authRouter from './routers/authRouter';
import vacationsRouter from './routers/userVacations';
import likesRouter from './routers/likesRouter';
import adminRouter from './routers/adminRouter';
import enforceAuth from './middlewares/enforce-auth';
import { createAppBucketIfNotExists, seedInitialImagesIfNeeded, testUpload } from './aws/aws';
import fileUpload from 'express-fileupload';

const app = express();

const port = config.get<number>('app.port');
const appName = config.get<string>('app.name');
const secret = config.get<string>('app.secret');

app.use(cors());

app.use(json());
app.use(fileUpload());

// load routers
app.use('/auth', authRouter);
app.use(enforceAuth());
app.use('/admin', adminRouter);
app.use('/vacations', vacationsRouter);
app.use('/likes', likesRouter);

// not found
app.use(notFound);

// // error middlewares
app.use(logger);
app.use(responder);

async function start() {
    try {
        await createAppBucketIfNotExists();
        await testUpload();
        await seedInitialImagesIfNeeded();

        await sequelize.sync({ force: process.argv[2] === 'sync' });

        app.listen(port, () => console.log(`${appName} started on port ${port}`));
    } catch (error) {
        console.error('Failed to start app:', error);
        process.exit(1);
    }
}

start();
