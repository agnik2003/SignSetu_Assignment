const mongoose = require('mongoose');

const StudyBlockSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  blockStart: { type: Date, required: true },
  blockEnd: { type: Date, required: true },
  notified: { type: Boolean, default: false }
});

module.exports = mongoose.model('StudyBlock', StudyBlockSchema);
