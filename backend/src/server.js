const server = require('express');
const routes = require('./routes');

const app = server.express();

app.use(routes);

app.listen('3333', console.log('Backend started http://localhost:3333'));