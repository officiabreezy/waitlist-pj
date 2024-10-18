const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const waitlistRouter = require('./route/waitlistRoute');
const connectDB = require('./database/db');

connectDB();


dotenv.config();
const app = express();

const port = process.env.PORT || 2000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', waitlistRouter);

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port,() => {
  console.log(`listening on http://localhost:${port}`);
});
