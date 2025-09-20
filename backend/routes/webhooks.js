const express = require('express');
const router = express.Router();
const StudyBlock = require('../models/StudyBlock');
const authenticateSupabaseJWT = require('../middleware/auth');


router.use(authenticateSupabaseJWT);


router.post('/', async (req, res) => {
  const { blockStart, blockEnd } = req.body;
  const userId = req.user.sub;
  const userEmail = req.user.email;

  const overlap = await StudyBlock.findOne({
    userId,
    $or: [
      { blockStart: { $lt: blockEnd, $gte: blockStart } },
      { blockEnd: { $gt: blockStart, $lte: blockEnd } }
    ]
  });
  if (overlap) return res.status(400).json({ error: 'Block overlap detected' });

  const block = new StudyBlock({ userId, userEmail, blockStart, blockEnd });
  await block.save();
  res.json(block);
});


router.get('/', async (req, res) => {
  const userId = req.user.sub;
  const blocks = await StudyBlock.find({ userId }).sort('blockStart');
  res.json(blocks);
});


router.delete('/:id', async (req, res) => {
  const userId = req.user.sub;
  const block = await StudyBlock.findById(req.params.id);
  if (!block) return res.status(404).json({ error: 'Block not found' });
  if (block.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

  await StudyBlock.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
