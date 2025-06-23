const pool = require('../models/db');

// Helper to dynamically build WHERE clause
const buildFilters = ({ search, status, exp }) => {
  const where = [];
  const params = [];

  if (search) {
    where.push("(u.username LIKE ? OR u.email LIKE ? OR c.qualifications LIKE ?)");
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (status && status !== "all") {
    where.push("c.status = ?");
    params.push(status);
  }

  if (exp && exp !== "all") {
    if (exp === "junior") {
      where.push("c.experience_years < 3");
    } else if (exp === "mid") {
      where.push("c.experience_years BETWEEN 3 AND 7");
    } else if (exp === "senior") {
      where.push("c.experience_years > 7");
    }
  }

  return { clause: where.length ? "WHERE " + where.join(" AND ") : "", params };
};

const allowedSort = new Set([
  "id", "username", "qualifications", "experience_years", "status", "created_at",
]);

// ──────────────────────────────────────────────────────────
// GET /api/counselors
const getCounselors = async (req, res) => {
  try {
    const {
      search = "",
      status = "all",
      exp = "all",
      sortBy = "created_at",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const safeSort = allowedSort.has(sortBy) ? sortBy : "created_at";
    const safeOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { clause, params } = buildFilters({ search, status, exp });

    const sqlBase = `
      FROM counselors c
      JOIN users u ON u.id = c.user_id
      ${clause}
    `;

    const [totalRowsResult] = await pool.query(`SELECT COUNT(*) AS total ${sqlBase}`, params);
    const total = totalRowsResult[0]?.total || 0;

    const [rows] = await pool.query(
      `SELECT c.id, c.user_id, u.username, u.email,
              c.qualifications, c.experience_years, c.certifications,
              c.resume_url, c.status, c.created_at
       ${sqlBase}
       ORDER BY ${safeSort} ${safeOrder}
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    );

    res.json({ data: rows, total, page: parseInt(page), limit: parseInt(limit) });

  } catch (err) {
    console.error("Error in getCounselors:", err);
    res.status(500).json({ message: "Server error while fetching counselor applications" });
  }
};

// ──────────────────────────────────────────────────────────
// POST /api/counselors/apply
const apply = async (req, res) => {
  try {
    const { qualifications, experience_years, certifications } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ message: 'Resume file is required.' });
    }

    const resume_url = resumeFile.path;

    await pool.query(
      `INSERT INTO counselors (user_id, qualifications, experience_years, certifications, resume_url, status)
       VALUES (?, ?, ?, ?, ?, "pending")`,
      [req.user.id, qualifications, experience_years, certifications, resume_url]
    );

    res.status(201).json({ message: 'Application submitted, awaiting review' });

  } catch (error) {
    console.error('Error submitting counselor application:', error);
    res.status(500).json({ message: 'An error occurred on the server.' });
  }
};

// ──────────────────────────────────────────────────────────
// GET /api/counselors/application-status
const getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT qualifications, experience_years, certifications, resume_url, status
       FROM counselors WHERE user_id = ?`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.json({ status: 'not_applied' });
    }

    res.json(rows[0]);

  } catch (error) {
    console.error('Error fetching counselor profile:', error);
    res.status(500).json({ message: 'An error occurred on the server.' });
  }
};

// ──────────────────────────────────────────────────────────
// PATCH /api/counselors/:id/approve
const approveCounselor = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`UPDATE counselors SET status = 'approved' WHERE id = ?`, [id]);
    res.json({ id, status: "approved" });
  } catch (err) {
    console.error("Error approving counselor:", err);
    res.status(500).json({ message: "Server error while approving counselor" });
  }
};

// ──────────────────────────────────────────────────────────
// PATCH /api/counselors/:id/reject
const rejectCounselor = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`UPDATE counselors SET status = 'rejected' WHERE id = ?`, [id]);
    res.json({ id, status: "rejected" });
  } catch (err) {
    console.error("Error rejecting counselor:", err);
    res.status(500).json({ message: "Server error while rejecting counselor" });
  }
};

// ──────────────────────────────────────────────────────────
// PATCH /api/counselors/bulk
const bulkUpdateCounselors = async (req, res) => {
  try {
    const { ids = [], action } = req.body;
    if (!ids.length || !["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Bad request: Missing IDs or invalid action" });
    }

    const newStatus = action === "approve" ? "approved" : "rejected";

    await pool.query(
      `UPDATE counselors SET status = ? WHERE id IN (${ids.map(() => "?").join(",")})`,
      [newStatus, ...ids]
    );
    res.json({ ids, status: newStatus });

  } catch (err) {
    console.error("Error in bulkUpdateCounselors:", err);
    res.status(500).json({ message: "Server error while bulk-updating counselors" });
  }
};

// ──────────────────────────────────────────────────────────
// Export all used functions
module.exports = {
  getCounselors,
  apply,
  getProfile,
  approveCounselor,
  rejectCounselor,
  bulkUpdateCounselors
};
