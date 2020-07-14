const { response } = require('express');

const routes = require('express').Router();

routes.get('/', (request, response) => {
  response.send('<h1>Welcome page</h1>');
});

module.exports = routes;