const dbConn = require('../utils/connect')
const HTTP_STATUS = require('http-status-codes');

// middleware to check schedule overlapping
const checkOverlap = async (req, res, next) => {
  try {
    const { intervieweeEmail, date, start } = req.body;
    let query = `SELECT COUNT(*) AS Overlap FROM schedule 
                 WHERE intervieweeEmail = "${intervieweeEmail}" 
                 AND date = "${date}" 
                 AND "${start}" BETWEEN start AND end`;
    dbConn.query(query, (err, rows) => {
        if(err) {
            console.log("error: ", err);
        }
        if(rows[0].Overlap > 0) {
          return res.status(HTTP_STATUS.BAD_REQUEST).json({
            msg: 'Can not be scheduled, overlapping with another interview!'
          })
        } else {
          next();
        }
    })
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ 
      error: error
    })
  }
}

module.exports = checkOverlap