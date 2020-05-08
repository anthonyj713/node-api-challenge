const express = require('express');

//const Router = require('./);
//const Router = require('./);

const server = express();

server.get('/', (req, res) => {
    res.json({ query: req.query, params: req.params, headers: req.headers});
});

server.use(express.json());

module.exports = server;