const sendgridMail = require('@sendgrid/mail')
const sendGridApi = process.env.SENDGRID_API_KEY || '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'
sendgridMail.setApiKey(sendGridApi)
const SENDGRID_FROM_EMAIL_ADDRESS = process.env.SENDGRID_FROM_EMAIL_ADDRESS || "rupeshiya@gmail.com"

module.exports = {
  sendEmail: (interviewer, interviewee) => {
        const message = {
          to: req.body.email,
          from: SENDGRID_FROM_EMAIL_ADDRESS,
          subject: "Interview: Reminder",
          html: `Hello ${interviewee}, your interview is scheduled with ${interviewer}`
        }
        sendgridMail.send(message).then(() => {
          console.log('sending email')
        },
        (error) => {
          console.log('error in sending email ', error)
          if (error.response) {
            console.error(error.response.body)
          }
        }
      )
  }
}