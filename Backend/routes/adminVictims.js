const express = require("express");
const router = express.Router();
const adminVictimController = require("../controllers/adminVictimController");

// Route to get list of victims
router.get("/", adminVictimController.getVictimDetails);

// Route to get all counselors for assignment dropdown
router.get("/counselors", adminVictimController.getCounselors);

// Route to assign a counselor to a victim
router.put("/assign", adminVictimController.assignCounselor);

module.exports = router;
