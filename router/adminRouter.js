const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// create an interview 
router.post('/schedule', AdminController.scheduleInterview);

// get all interview scheduled by admin 
router.get('/all', AdminController.getAllScheduledInterview);

module.exports = router;