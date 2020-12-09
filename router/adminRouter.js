const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// create an interview 
router.post('/schedule', AdminController.scheduleInterview);

// update an interview schedule 
router.patch('/schedule', AdminController.updateInterview);

// cancel an interview 
router.post('/cancel', AdminController.cancelInterview);

module.exports = router;