const express = require('express');

const Actions = require('../helpers/actionModel.js');

const router = express.Router();

let bodyParser = require('body-parser')
bodyParser = bodyParser.json();

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

router.post('/', bodyParser, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'There was an error saving the action to the database.'
        });
    });
});

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({
                message: 'The action has been deleted'
            })
        } else {
            res.status(404).json({
                message: 'The action with the specified id cannot be found'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error removing the action'
        });
    });
});

router.put('/:id', bodyParser, (req, res) => {
    if(!req.body.description || !req.body.notes){
        res.status(400).json({
            message: 'Please edit the description or notes'
        })
    } else {
        Actions.update(req.params.id, req.body)
        .then(res.status(201).json({
            message: 'Actions updated successfully'
        }))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error updating the actions'
            });
        });
    };
});













module.exports = router;