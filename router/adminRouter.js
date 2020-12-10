const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const checkOverlap = require('../middlewares/checkOverlap');

// create an interview 
router.post('/schedule', checkOverlap, AdminController.scheduleInterview);

// get all interview scheduled by admin 
router.get('/all', AdminController.getAllScheduledInterview);

module.exports = router;