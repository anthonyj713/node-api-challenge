const express = require('express');

const Actions = require('../helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get(req.body)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Actions could not be retrieved'
        });
    });
});










module.exports = router;