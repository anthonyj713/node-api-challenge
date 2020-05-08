const express = require('express');

const Projects = require('../helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get(req.body)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Project data could not be retrieved'
        });
    });
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({
                message: 'Project with that ID not found'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error retrieving the project'
        });
    });
});












module.exports = router;

