const sendgridMail = require('@sendgrid/mail')
const sendGridApi = process.env.SENDGRID_API_KEY || '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'
sendgridMail.setApiKey(sendGridApi)
const SENDGRID_FROM_EMAIL_ADDRESS = process.env.SENDGRID_FROM_EMAIL_ADDRESS || "rupeshiya@gmail.com"

module.exports = {
  sendEmail: (newSchedule, subject) => {
      const { interviewerEmail, intervieweeEmail, intervieweeName, interviewerName, date, start, end } = newSchedule;
      console.log('schedule email', newSchedule)
      const message = {
        to: [intervieweeEmail, interviewerEmail],
        from: SENDGRID_FROM_EMAIL_ADDRESS,
        subject: `${subject}`,
        text: `${intervieweeName} interview is scheduled with ${interviewerName} on ${date} from ${start} to ${end}`
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