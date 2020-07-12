const Task = require('../models/Task');
const Project = require('../models/Proyect');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { project } = req.body;
        const projectToSave = await Project.findById(project);
        if (!project) {
            return res.status(404).json({ message: "project doesn't exists" });
        }

        if (req.user.id !== projectToSave.user.toString()) {
            return res.status(401).json({ message: 'missing permissions' });
        }
        const task = new Task(req.body);
        await task.save();
        res.json({ task });
    } catch (error) {
        console.log(error);
    }
};

exports.getTasks = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { project } = req.query;
        const projectExists = await Project.findById(project);

        if (!projectExists) {
            return res.status(404).json({ message: "project doesn't exists" });
        }

        if (req.user.id !== projectExists.user.toString()) {
            return res.status(401).json({ message: 'missing permissions' });
        }

        const tasks = await Task.find({ project }).sort({created:-1});
        res.json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: ' error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const {project, name, completed } = req.body;
        let task = await Task.findById(req.params.id);

        //check if the task & the project exists
        if (!task) {
            return res.status(404).json({ message: "The task doesn't exist" });
        }

        const projectExists = await Project.findById(project);
        if (!projectExists) {
            return res.status(404).json({ message: "project doesn't exists" });
        }
        if (req.user.id !== projectExists.user.toString()) {
            return res.status(401).json({ message: 'missing permissions' });
        }

        //add the updated values
        const taskUpdated = {};
        taskUpdated.completed = completed;
        taskUpdated.name = name;
        

        //finally update the task
        task = await Task.findOneAndUpdate(
            { _id: req.params.id },
            taskUpdated,
            { new: true }
        );
        res.json(task);
    } catch (error) {}
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        //check if the task exists
        if (!task) {
            return res.status(404).json({ message: "The task doesn't exist" });
        }
        //check if the projects belongs to the user
        const project = await Project.findById(task.project);
        if (project.user.toString() !== req.user.id) {
            return res
                .status(401)
                .json({ message: "the user don't have the permissions" });
        }
        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ message: 'task deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' });
    }
};
