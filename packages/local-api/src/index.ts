import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    // opt 1: react dev server running
    // redirect/proxy to reflect changes in local dev instantly
    app.use(
      createProxyMiddleware({
        target: 'http://127.0.0.1:3000',
        ws: true, // websockets, used by cra in dev mode
        logLevel: 'silent',
      })
    );
  } else {
    // opt 2: react build/prod installed via cli
    // for customers/end-user machine, serve files from installed local-client package
    const packagePath = require.resolve('local-client/build/index.html'); // absolute path to index.html file
    app.use(express.static(path.dirname(packagePath))); // serve the directory of that file
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
