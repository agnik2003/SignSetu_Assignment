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

  // Example: You can include any link you want the user to visit in email notifications.
  const link = `${frontendBaseUrl}/blocks`; // Adjust path as necessary

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Quiet Study Time Reminder',
    html: `
      <p>Your silent-study block starts at ${blockStart.toLocaleString()}. Get ready to focus!</p>
      <p><a href="${link}">View your study blocks</a></p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendNotificationMail };
