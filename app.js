require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const hpp = require('hpp')
var winston = require('./config/winston')
const app = express()
const PORT = process.env.PORT || 5000;
const adminRouter = require('./router/adminRouter');
const dbConn = require('./utils/connect');
const emailer = require('./utils/mail');
const Formidable = require('formidable');
const cron = require("node-cron");

const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: 'devilhack',
    api_key: '583496858434235',
    api_secret: 'OmKipCSKDnHol4ur-fFTbo07XZw'
});


app.use(cors());
app.use(bodyParser.json({ limit: '200mb' }))
app.use(cookieParser())

// app logger (for debugging)
morgan.token('data', (req, res) => {
  return JSON.stringify(req.body)
})

// logging to log file
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url" :status :res[content-length] ":referrer" ":user-agent" :data',
    { stream: winston.stream }
  )
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(hpp())

app.get('/test', (req, res) => {
  return res.status(200).json({
    msg: 'Working perfectly'
  })
})

app.use('/admin', adminRouter)

app.post('/upload', (req, res, next) => {
  // parse a file upload
    const form = new Formidable();
    console.log('form ', form)
    form.parse(req, (err, field, files) => {
        cloudinary.uploader.upload(files.upload.path, result => {
            console.log(result)
            if (result.public_id) {
                return res.json({
                  url: result.url
                })
            }
          }
        );
    });
})

// Scheduled tasks to be run on the server.
const job = cron.schedule('* * * * *', () => {
    console.log('running a task every 1 minute');
    // schedule interview reminder
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let d = new Date(); 
    let hr = d.getHours(); 
    let mn = d.getMinutes(); 
    let ss = d.getSeconds(); 

    today = yyyy + '-' + mm + '-' + dd;
    currentTime = hr + ":" + mn + ":" + ":" + ss;
    let query = `SELECT * FROM schedule AS sc WHERE date = "${today}" 
                 AND (SELECT TIMEDIFF(sc.start, "${currentTime}") = "00:10:00")`;
    
    dbConn.query(query, (err, data) => {
      // to access RowDataPacket
      data = JSON.parse(JSON.stringify(data))
      
      // iterate over today's interviews 
      data.forEach((schedule) => {
        console.log('schedule ', schedule);
        let sub = "Interview reminder";
        emailer.sendEmail(schedule, sub);
      })
    })
});

// stop the cron-job 
// job.stop();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "route doesn't exist"))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // To include winston logging (Error)
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${req.body}`
  )

  // render the error page
  res.status(err.status || 500)
  next()
})

app.listen(PORT, () => {
  console.log(`Listening on port :: ${PORT}`);
})
