
import { createServer, Server } from "http";
import * as process from "process";
import * as debug from "debug";
import { app } from './app';

const port = process.env.PORT || '3001';
const name = `reminder/${process.pid}`;

const log = debug(name);

const httpServer: Server = createServer(app);

httpServer.listen(port, () => {
    log(`started at port ${port}`);
});

process.on('SIGTERM', () => {
    debug('SIGTERM' +  process.pid);
    if (httpServer) {
        httpServer.close();
    }
    setTimeout(() => {
        process.exit(0);
    }, 5000);
});