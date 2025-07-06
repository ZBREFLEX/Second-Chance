const express = require('express');
const { listPending, approve, getAllCounselors } = require('../controllers/adminController');
const { adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/counselors/pending', adminOnly, listPending);
router.put('/counselors/:id/approve', adminOnly, approve);

// ✅ ADD THIS:
router.get('/counselors', getAllCounselors);

module.exports = router;
