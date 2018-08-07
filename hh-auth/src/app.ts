import * as express from "express";

export const app: express.Express = express();

app.use('/health', (req: express.Request, resp: express.Response) => {
    resp.json({
        message: 'OK'
    });
});