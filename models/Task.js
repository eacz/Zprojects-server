const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
    },
});

module.exports = mongoose.model('task', TaskSchema);
