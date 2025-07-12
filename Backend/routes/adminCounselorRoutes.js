const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/", async (req, res) => {
  const { specialization = "", location = "" } = req.query;

  try {
    const [rows] = await db.query(
      `SELECT 
         c.id,
         c.user_id,
         u.username,
         u.email,
         c.qualifications,
         c.experience_years,
         c.certifications,
         c.resume_url,
         c.status,
         c.created_at
       FROM counselors c
       JOIN users u ON u.id = c.user_id
       WHERE u.role = 'counselor'
         AND u.status = 'active'
         AND c.status = 'approved'
         AND (? = '' OR c.qualifications LIKE ?)
         AND (? = '' OR u.username LIKE ?)`,
      [specialization, `%${specialization}%`, location, `%${location}%`]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching counselors:", err);
    res.status(500).json({ message: "Failed to fetch counselors" });
  }
});

module.exports = router;
