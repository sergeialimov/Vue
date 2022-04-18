import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import { connectDb } from './db/db';

const makeApp = () => {
  const app = new Koa();

  connectDb();

  // Enable cors with default options
  app.use(cors());

  // Enable bodyParser with default options
  app.use(bodyParser());

  // Router includes middleware to respond with "Method Not Allowed - 405".
  app
    .use(router.routes())
    .use(router.allowedMethods());

  return app;
};

export default makeApp;
