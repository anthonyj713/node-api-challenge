const express = require('express');

const Projects = require('../helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get(req.body)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Project data could not be retrieved'
        });
    });
});










module.exports = router;

