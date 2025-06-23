// routes/usersRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/users", (req, res) => {
  db.query(
    "SELECT id, username, email, role, created_at FROM users",
    (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ error: "Database error" });
      }

      const formattedUsers = results.map((user) => ({
        id: user.id,
        name: user.username,
        email: user.email,
        role: capitalizeRole(user.role),
        status: "Active", // mocked for now
        district: "N/A",  // mocked
        phone: "0000000000", // mocked
        lastLogin: "2024-06-01", // mocked
        registeredOn: user.created_at,
        reports: 0, // mocked
        assessments: 0, // mocked
        recoveryProgress: 0, // mocked
      }));

      res.json(formattedUsers);
    }
  );
});

// Helper to capitalize role (victim → Victim)
function capitalizeRole(role) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

module.exports = router;
