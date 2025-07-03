const express = require("express");
const router = express.Router();
const recoveryController = require("../controllers/recoveryController");

router.get("/:userId", recoveryController.getRecoveryData);
router.post("/:userId/checkin", recoveryController.addCheckIn);
router.post("/:userId/journal", recoveryController.addJournal);

module.exports = router;
