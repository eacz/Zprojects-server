const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    created: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('project', ProjectSchema);
