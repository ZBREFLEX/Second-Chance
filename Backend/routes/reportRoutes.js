const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/verifyToken');
const {
  getRecentReports,
  submitAnonymousReport,
  getReportStatus,
  getReportStats,
} = require("../controllers/reportController");

router.post('/anonymous', submitAnonymousReport);
router.get('/status/:uuid', getReportStatus);
router.get('/reports/recent', verifyAdmin, getRecentReports);
router.get("/reports/stats", verifyToken, getReportStats);

module.exports = router;
