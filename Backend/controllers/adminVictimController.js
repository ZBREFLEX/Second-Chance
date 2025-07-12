const pool = require("../models/db");

// ✅ Fetch detailed victim data joined with user info
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
    res.json(rows);
  } catch (err) {
    console.error("Error fetching victim details:", err);
    res.status(500).json({ message: "Server error while fetching victims" });
  }
};

// ✅ Alternative: Victim list with counselor name (for optional frontend usage)
exports.getVictims = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        v.*, 
        u.username, 
        u.email, 
        u.status,
        u.created_at,
        c.username AS counselor_name
      FROM victim_details v
      JOIN users u ON v.user_id = u.id
      LEFT JOIN users c ON v.counselor_id = c.id
      WHERE u.role = 'victim'
      ORDER BY v.submitted_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching victims:", err);
    res.status(500).json({ error: "Failed to fetch victims" });
  }
};

// ✅ Active counselors
exports.getCounselors = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, username AS name, email 
      FROM users 
      WHERE role = 'counselor' AND status = 'active'
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching counselors:", err);
    res.status(500).json({ error: "Failed to fetch counselors" });
  }
};

// ✅ Assign counselor to victim
exports.assignCounselor = async (req, res) => {
  const { victim_id, counselor_id } = req.body;

  if (!victim_id || !counselor_id) {
    return res.status(400).json({ error: "Victim ID and Counselor ID are required" });
  }

  try {
    await pool.query(
      "UPDATE victim_details SET counselor_id = ? WHERE user_id = ?",
      [counselor_id, victim_id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Error assigning counselor:", err);
    res.status(500).json({ error: "Failed to assign counselor" });
  }
};
