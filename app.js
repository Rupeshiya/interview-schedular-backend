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

app.use(cors());

app.use(bodyParser.json({ limit: '200mb' }))
app.use(cookieParser())

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body)
})

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

app.use('/admin', adminRouter)

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
