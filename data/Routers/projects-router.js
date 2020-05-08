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

// router.get(':id/actions', (req, res) => {
//     Projects.getProjectActions(req.body.projectId)
//     .then(actions => {
//         if (actions) {
//             res.status(200).json({ data: actions })
//         } else {
//             res.status(404).json({
//                 message: 'The action with the specified ID does not exist.'
//             })
//         }
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             message: 'The actions could not be retrieved'
//         });
//     });
// });


// router.post('/', (req, res) => {
//     Projects.insert(req.body)
//     .then(project => {
//         res.status(201).json(project);
//     })
//     .catch(err => {
//         res.status(500).json({
//             message: 'There was an error while saving the project to the database'
//         });
//     });
// });

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({
                message: 'The projects has been deleted'
            })
        } else {
            res.status(404).json({
                message: 'The project with the specified id cannot be found'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error removing the project'
        });
    });
});

router.put('/:id', (req, res) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({
            message: 'Please edit the name or description'
        })
    } else {
        Projects.update(req.params.id, req.body)
        .then(res.status(201).json({
            message: 'Project updated successfully'
        }))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error updating project'
            });
        });
    };
});













module.exports = router;

