const mongoose = require('mongoose');

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.mongoDB)
       console.log('Database connected')
    } catch (error) {
        throw new Error('Error connecting to database', error)
    }
};
module.exports = connectDB