import * as jsonServer from 'json-server';
import * as path from 'path';

import routes from './routes.json';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter(routes));
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
