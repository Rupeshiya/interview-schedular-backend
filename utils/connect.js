const mysql = require('mysql');
const config = require('../config/db');

const connection = mysql.createConnection({
  host: config.database.host,
  database: config.database.db,
  user: config.database.user,
  password: config.database.password
});

// connect mysql
connection.connect((err, success) => {
  if(err){
    console.log(err);
  } else {
    console.log('successfully connected mysql');
  }
});

// export connection 
module.exports = connection;