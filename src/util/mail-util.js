const nodemailer = require('nodemailer');
const EMAIL_KEY = ''
const EMAIL_APP_PASSWORD = ''

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_KEY,
        pass: EMAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const MailUtil = {
    async Send(from_mail, to_mail, subject, content){
        console.log('from_mail', from_mail)
        console.log('to_mail', to_mail)
        console.log('subject', subject)
        console.log('content', content)
        await transporter.sendMail({
            from: from_mail,
            to: to_mail,
            subject: subject,
            html: content,
            amp: content,
        })
    }
}
module.exports = MailUtil