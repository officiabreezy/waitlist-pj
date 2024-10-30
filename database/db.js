const mongoose = require('mongoose');

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.mongoDB)
       console.log('Database connected')
    } catch (error) {
        console.error(error);
        throw new Error('Error connecting to database:',error.message)
    }
};

module.exports = connectDB