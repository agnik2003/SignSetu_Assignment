require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');

const StudyBlock = require('./models/StudyBlock');
const { sendNotificationMail } = require('./services/emailService');

const app = express();
app.use(express.json());


const corsOptions = {
  origin: 'https://sign-setu-assignment-gilt.vercel.app',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/blocks', require('./routes/blocks'));
app.use('/api/webhooks', require('./routes/webhooks'));

cron.schedule('*/1 * * * *', async () => {
  const now = new Date();
  const tenMinsLater = new Date(now.getTime() + 10 * 60 * 1000);

  const blocks = await StudyBlock.find({
    notified: false,
    blockStart: { $gte: now, $lt: tenMinsLater },
  });

  for (const block of blocks) {
    try {
      await sendNotificationMail(block.userEmail, block.blockStart);
      block.notified = true;
      await block.save();
      console.log(`Notified ${block.userEmail} for block at ${block.blockStart}`);
    } catch (e) {
      console.error('Email failed for', block.userEmail, e);
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on', PORT));
