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

exports.getVictims = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT v.*, u.username, u.email, c.name AS counselor_name
      FROM victim_details v
      JOIN users u ON v.user_id = u.id
      LEFT JOIN counselors c ON v.assigned_counselor = c.id
      ORDER BY v.submitted_at DESC
    `);
    res.json(rows); // returns full victim list with counselor names
  } catch (err) {
    console.error("Error fetching victims:", err);
    res.status(500).json({ error: "Failed to fetch victims" });
  }
};
exports.getCounselors = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, name, email FROM counselors WHERE status = 'active'
    `);
    res.json(rows); // returns list of all active counselors
  } catch (err) {
    console.error("Error fetching counselors:", err);
    res.status(500).json({ error: "Failed to fetch counselors" });
  }
};
exports.assignCounselor = async (req, res) => {
  const { victim_id, counselor_id } = req.body;

  if (!victim_id || !counselor_id) {
    return res.status(400).json({ error: "Victim ID and Counselor ID are required" });
  }

  try {
    await pool.query(
      "UPDATE victim_details SET assigned_counselor = ? WHERE user_id = ?",
      [counselor_id, victim_id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Error assigning counselor:", err);
    res.status(500).json({ error: "Failed to assign counselor" });
  }
};
