const express = require("express");
const router = express.Router();
const pool = require("../models/db");

// Get victim details by user_id
router.get("/:userId", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM victim_details WHERE user_id = ?",
      [req.params.userId]
    );

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Details not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});


// Submit victim details
router.post("/", async (req, res) => {
  try {
    const {
      user_id, age, gender, location, occupation, drug_type,
      duration_of_use, frequency, last_use_date,
      mental_health_issues, physical_health_issues, support_system
    } = req.body;

    const [existing] = await pool.query("SELECT * FROM victim_details WHERE user_id = ?", [user_id]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Details already submitted" });
    }

    await pool.query(
      `INSERT INTO victim_details 
      (user_id, age, gender, location, occupation, drug_type, duration_of_use, frequency, last_use_date, 
       mental_health_issues, physical_health_issues, support_system)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, age, gender, location, occupation, drug_type,
        duration_of_use, frequency, last_use_date,
        mental_health_issues, physical_health_issues, support_system
      ]
    );

    res.status(201).json({ message: "Details submitted successfully" });
  } catch (err) {
    console.error("Error inserting victim details:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
