const express = require('express');
const waitlistInfo = require('../controller/waitlistController');
const router = express.Router();


router.post('/waitlist', waitlistInfo);

module.exports = router;
