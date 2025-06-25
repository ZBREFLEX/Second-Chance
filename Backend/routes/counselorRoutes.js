const express = require("express");
const multer = require("multer");
const { authenticateToken } = require("../middleware/auth");
const { verifyToken, verifyAdmin } = require("../middleware/verifyToken");
const controller = require("../controllers/counselorController");

const router = express.Router();
const upload = multer({ dest: "uploads/resumes/" });

/* ─────────────────────────────────────────────────────────────
   Counselor‑side Endpoints (for normal authenticated users)
   ───────────────────────────────────────────────────────────── */

// POST /api/counselors/apply
router.post(
  "/apply",
  authenticateToken,
  upload.single("resume"),
  controller.apply
);

// GET /api/counselors/application-status
router.get(
  "/application-status",
  authenticateToken,
  controller.getProfile
);

/* ─────────────────────────────────────────────────────────────
   Admin‑only Endpoints (protected with verifyAdmin middleware)
   ───────────────────────────────────────────────────────────── */

// PATCH /api/counselors/bulk
router.patch(
  "/bulk",
  verifyAdmin,
  controller.bulkUpdateCounselors
);

// PATCH /api/counselors/:id/approve
router.patch(
  "/:id/approve",
  verifyAdmin,
  controller.approveCounselor
);

// PATCH /api/counselors/:id/reject
router.patch(
  "/:id/reject",
  verifyAdmin,
  controller.rejectCounselor
);

// GET /api/counselors (List with filters/pagination)
router.get(
  "/",
  verifyAdmin,
  controller.getCounselors
);

module.exports = router;