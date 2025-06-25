// routes/usersRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../models/db");
const { verifyToken } = require("../middleware/verifyToken");

// GET /api/users - Get all users
router.get("/users", verifyToken, async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT id, username, email, role, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at, status FROM users",
    );

    const formattedUsers = results.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status || "active", // Default to active if status is null
      created_at: user.created_at,
    }));

    res.json(formattedUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;