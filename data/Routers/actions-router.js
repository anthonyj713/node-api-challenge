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

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({
                message: 'Action with that ID not found'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error retrieving the action'
        });
    });
});










module.exports = router;