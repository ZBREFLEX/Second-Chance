const pool = require("../models/db");

exports.getVictimDetails = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        vd.*, 
        u.username, 
        u.email 
      FROM victim_details vd
      JOIN users u ON vd.user_id = u.id
      WHERE u.role = 'victim'
    `);
    res.json(rows); // ✅ Returns array
  } catch (err) {
    console.error("Error fetching victim details:", err);
    res.status(500).json({ message: "Server error while fetching victims" });
  }
};
