const express = require("express");
const router = express.Router();
const adminVictimController = require("../controllers/adminVictimController");

router.get("/", adminVictimController.getVictimDetails);

module.exports = router;
