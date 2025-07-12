const express = require("express");
const router = express.Router();
const {
  getRecoveryData,
  addCheckIn,
  addJournalEntry,
  addProgressEntry
} = require('../controllers/recoveryController');


router.get("/:userId", getRecoveryData);
router.post("/:userId/journal", addJournalEntry);
router.post("/:userId/checkin", addCheckIn);
router.post('/:userId/progress', addProgressEntry);


module.exports = router;
