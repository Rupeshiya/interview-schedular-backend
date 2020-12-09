var dbConn = require('../utils/connect');

//Schedule object 
var Schedule = function(schedule){
    this.interviewerName    = schedule.interviewerName;
    this.intervieweeName    = schedule.interviewee;
    this.interviewerEmail   = schedule.interviewerEmail;
    this.intervieweeEmail   = schedule.intervieweeEmail;
    this.date               = schedule.date;
    this.start              = schedule.start;
    this.end                = schedule.end;
    this.resume             = schedule.resumeLink;
};

Schedule.create = (newSchedule, result) => {    
    let query = 'INSERT INTO schedule set ?';
    dbConn.query(query, newSchedule, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};

Schedule.findById = (id, result) => {
    let query = "Select * from schedule where id = ? ";
    dbConn.query(query, id, (err, res) => {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

Schedule.findAll = (result) => {
    let query = "Select * from schedule";
    dbConn.query(query, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('schedule : ', res);  
            result(null, res);
        }
    });   
};

module.exports = Schedule;