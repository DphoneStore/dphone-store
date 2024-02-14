const nodemailer = require('nodemailer');
require('dotenv').config()

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = async (from_mail, to_mail, subject, content) => {

    await transporter.sendMail({
        from: from_mail,
        to: to_mail,
        subject: subject,
        html: content,
        amp: content,
    })
}