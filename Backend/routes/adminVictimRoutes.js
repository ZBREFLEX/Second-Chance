const express = require("express");
const router = express.Router();
const adminVictimController = require("../controllers/adminVictimController");

router.get("/", adminVictimController.getVictimDetails);
router.get("/counselors", adminVictimController.getCounselors); // ✅ Add this
router.put("/assign", adminVictimController.assignCounselor);   // ✅ Optional: Add this if you're assigning

module.exports = router;
