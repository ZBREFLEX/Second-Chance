// server/routes/statsRoutes.js
const express = require('express');
const router = express.Router();
const { getUserStats } = require('../controllers/statsController');

router.get('/user-stats', getUserStats);

module.exports = router;
