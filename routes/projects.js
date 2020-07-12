const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

//  /api/projects
router.post(
    '/',
    auth,
    [check('name', "the project's name is required").not().isEmpty()],
    projectController.createProject
);
router.get('/', auth, projectController.getProjects);
router.put(
    '/:id',
    auth,
    check('name', "the project's name is required").not().isEmpty(),
    projectController.updateProject
);
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
