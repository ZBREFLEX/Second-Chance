const express = require('express');
const router  = express.Router();
const admin   = require('../controllers/reportAdminController');
const {
  listReports,
  updateReportStatus,
  deleteReport,
  getReportStatus // ✅ ADD THIS
} = require("../controllers/reportAdminController");

router.get('/',             admin.listReports);          // GET /api/admin/reports
router.put('/:id/status',   admin.updateReportStatus);   // PUT /api/admin/reports/:id/status
router.delete('/:id',       admin.deleteReport);         // DELETE /api/admin/reports/:id


module.exports = router;
