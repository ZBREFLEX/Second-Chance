const express = require("express");
const router = express.Router();
const { getDistrictStats } = require("../controllers/anonymousReportController");

router.get("/district-stats", getDistrictStats);

module.exports = router;
