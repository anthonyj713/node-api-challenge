const express = require('express');

const projectsRouter = require('./data/Routers/projects-router.js');
const actionsRouter = require('./data/Routers/actions-router.js');

const server = express();

server.get('/', (req, res) => {
    res.json({ query: req.query, params: req.params, headers: req.headers});
});

server.use(logger);
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.use(express.json());

function logger(req, res, next) {
    const today = new Date().toISOString();
    console.log(`${req.method} to ${req.url} at [${today}]`);
    next();
  };

module.exports = server;