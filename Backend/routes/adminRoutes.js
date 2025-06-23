const express = require('express');
const { listPending, approve } = require('../controllers/adminController');
const { adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/counselors/pending', adminOnly, listPending);
router.put('/counselors/:id/approve', adminOnly, approve);

module.exports = router;
