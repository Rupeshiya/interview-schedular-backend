const Schedule = require('../models/Schedule');
const HTTP_STATUS = require('http-status-codes');

module.exports = {
  // to schedule Interview
  scheduleInterview: async(req, res, next) => {
   try {
     console.log('create schedule ', req.body)
     const new_schedule = new Schedule(req.body);
      //handles null error 
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
          error:true,
          message: 'Please provide all required field'
        });
      }
      await Schedule.create(new_schedule, (err, scheduleId) => {
        if (err) { 
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            err: err
          });
        }
        return res.status(HTTP_STATUS.CREATED).json({ 
          success: true,
          message: "Interview scheduled successfully!",
          data: scheduleId
        });
      });
   } catch(err) {
     console.log(err);
   }
  },

  // get all interview scheduled by admins
  getAllScheduledInterview: async (req, res, next) => {
    try {
      await Schedule.findAll((err, data) => {
        if(err) {
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            err: err
          })
        }
        return res.status(HTTP_STATUS.OK).json({
          success: true,
          interviews: data
        })
      })
    } catch (err) {
      console.log(err);
    }
  },

  // get single interview info
  getScheduledInterviewById: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Schedule.findById(id, (err, data) => {
        if(err) {
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            err: err
          });
        }
        return res.status(HTTP_STATUS.OK).json({
          success: true,
          interview: data
        });
      })
    } catch (err) {
      console.log(err);
    }
  }
}