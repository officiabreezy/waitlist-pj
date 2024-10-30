const express = require('express');
const requireAPIkey = require('../middleware/waitlist_auth');
const {waitlistInfo,waitlists,updatedWaitlist} = require('../controller/waitlistController');
const { deleteWaitlist } =require('../controller/waitlistController');
const router = express.Router();


router.post('/waitlist', waitlistInfo);
router.get('/waitlists', requireAPIkey, waitlists);
router.put('/updatewaitlist/:id', requireAPIkey, updatedWaitlist);
router.delete('/deletewaitlist', requireAPIkey, deleteWaitlist);

// router.delete('/deletewaitlist/:email', requireAPIkey, (req, res, next) => {
//     console.log("Delete request received with email:", req.params.email);
//     next(); // This calls deleteWaitlist after logging
//   }, deleteWaitlist);

module.exports = router;
