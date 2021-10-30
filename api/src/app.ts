import 'reflect-metadata';
import { createExpressServer, useContainer } from "routing-controllers";
import Container from "typedi";
import { ApiController } from "./controllers/Api.controller";
import { CaseController } from './controllers/Case.controller';

const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.port || 3000;

async function startServer() {
    useContainer(Container);
    const controllers = [CaseController,ApiController];
    const app = createExpressServer({
        controllers: controllers
    });
    app.listen(port, () => {
        console.log(`Application running in port ${port}`);
    });
}
startServer();

