const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

// /api/tasks
router.post(
    '/',
    auth,
    [
        check('name', "the task's name is required").not().isEmpty(),
        check('project', 'the project is required').not().isEmpty(),
    ],
    taskController.createTask
);
//get tasks by project
router.get(
    '/',
    [check('project', 'project is required to filter').not().isEmpty()],
    auth,
    taskController.getTasks
);

router.put('/:id', auth, taskController.updateTask)

router.delete('/:id', auth, taskController.deleteTask)

module.exports = router;
