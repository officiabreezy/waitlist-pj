const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  name: { type: String},
  email: { 
    type: String, 
    required: [true,"email is required"], 
    unique: true
  },
  joinedAt: { type: Date, default: Date.now},

});

const waitlist = mongoose.model("Waitlist", waitlistSchema)

module.exports = waitlist;