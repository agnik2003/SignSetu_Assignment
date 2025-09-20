const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', //SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function sendNotificationMail(to, blockStart) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Quiet Study Time Reminder',
    text: `Your silent-study block starts at ${blockStart.toLocaleString()}. Get ready to focus!`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendNotificationMail };
