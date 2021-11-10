import 'reflect-metadata';
import { createExpressServer, useContainer } from "routing-controllers";
import Container from "typedi";
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
    app.listen(port, () => {
        console.log(`Application running in port ${port}`);
    });
}
startServer();

