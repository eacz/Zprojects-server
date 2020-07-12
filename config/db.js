const mongoose = require('mongoose');
require('dotenv').config({ path: 'vars.env' });

const conectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log('DB connected')
    } catch (error) {
        console.log(error);
        process.exit(1); //stop the app
    }
};

module.exports = conectDB;
