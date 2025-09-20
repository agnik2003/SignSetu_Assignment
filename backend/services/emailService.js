const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendNotificationMail(to, blockStart) {
  const frontendBaseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:3000';

  const url = `${frontendBaseUrl}/some-path`; // Customize path if needed

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Quiet Study Time Reminder',
    html: `
      <p>Your silent-study block starts at ${blockStart.toLocaleString()}. Get ready to focus!</p>
      <p><a href="${url}">Click here to view your study block</a></p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendNotificationMail };
