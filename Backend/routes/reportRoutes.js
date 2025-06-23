// server/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/verifyToken');
const {
  getRecentReports,
  submitAnonymousReport,
  getReportStatus,
} = require("../controllers/reportController"); // ✅ correct path
  

router.post('/anonymous', submitAnonymousReport);
router.get('/status/:uuid', getReportStatus);   // ✅ this line fails if `getReportStatus` is undefined
router.get('/reports/recent', verifyAdmin, getRecentReports);

module.exports = router;
