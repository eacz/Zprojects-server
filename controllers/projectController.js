const Project = require('../models/Proyect');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const project = new Project(req.body);
        project.user = req.user.id;
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
};

exports.updateProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const updatedProject = {};

    if (name) {
        updatedProject.name = name;
    }

    try {
        //check id
        let project = await Project.findById(req.params.id);
        //check if the project exists
        if (!project) {
            return res
                .status(404)
                .json({ message: "The project doesn's exist" });
        }
        //check if the projects belongs to the user
        if (project.user.toString() !== req.user.id) {
            return res
                .status(401)
                .json({ message: "missing permissions" });
        }
        //finally update
        project = await Project.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedProject },
            { new: true }
        );
        res.json({ project });
    } catch (error) {
        console.log(error);
        res.status(500).json('Error');
    }
};

exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        //check if the project exists
        if (!project) {
            return res
                .status(404)
                .json({ message: "The project doesn's exist" });
        }
        //check if the projects belongs to the user
        if (project.user.toString() !== req.user.id) {
            return res
                .status(401)
                .json({ message: "the user don't have the permissions" });
        }
        await Project.findOneAndRemove({_id: req.params.id})
        res.json({message: 'project deleted'})

    } catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
};
