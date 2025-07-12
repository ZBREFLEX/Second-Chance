const express = require("express");
const router = express.Router();
const adminVictimController = require("../controllers/adminVictimController");

// GET all victim details
router.get("/", adminVictimController.getVictimDetails);

// GET list of counselors (optionally filtered by location/specialization)
router.get("/counselors", adminVictimController.getCounselors);

// PUT to assign a counselor to a victim
router.put("/assign", adminVictimController.assignCounselor);

module.exports = router;
