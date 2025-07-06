const express = require("express");
const router = express.Router();

// ✅ ADD THIS LINE at the top
const adminUserController = require("../controllers/adminUserController");

// Routes
router.get("/", adminUserController.getUsers);
router.post("/", adminUserController.createUser);
router.put("/:id", adminUserController.updateUser);
router.put("/bulk-status", adminUserController.bulkStatus);
router.delete("/", adminUserController.bulkDelete);

// ✅ This is the one that was throwing the error
router.get("/counselors", adminUserController.getAllCounselors);

module.exports = router;
