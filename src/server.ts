import express, {Express} from 'express';

import {setupServer} from './setup/setup';

const server: Express = express();

setupServer(server);

export default server;
