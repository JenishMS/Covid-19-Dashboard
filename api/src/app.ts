import 'reflect-metadata';

import express from 'express';
import path from 'path';
import { createExpressServer, useContainer } from 'routing-controllers';
import Container from 'typedi';

import { CaseController } from './controllers/Case.controller';
import { VaccineController } from './controllers/Vaccine.controller';

const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.port || 3000;

async function startServer() {
    useContainer(Container);
    const controllers = [CaseController, VaccineController];
    const app = createExpressServer({
        controllers: controllers,
        cors: true
    });

    // static files folder. when app run in prod mode. all the source code file
    // serve ui files.
    app.use(express.static(path.join(__dirname, 'static')));
    app.listen(port, () => {
        console.log(`Application running in port ${port}`);
    });
}
startServer();

