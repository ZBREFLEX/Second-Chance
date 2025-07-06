const bcrypt = require("bcryptjs");
const pool   = require("../models/db");

// ──────────────────────────────
// GET /api/admin/counselors
// ──────────────────────────────
const getAllCounselors = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email FROM users WHERE role = 'counselor' AND status = 'active'"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching counselors:", err);
    res.status(500).json({ error: "Failed to fetch counselors" });
  }
};

// ──────────────────────────────
// Helper
// ──────────────────────────────
const buildWhereClause = (search, role, status) => {
  const clauses = [];
  const params  = [];

  if (search) {
    clauses.push("(username LIKE ? OR email LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }
  if (role && role !== "all") {
    clauses.push("role = ?");
    params.push(role);
  }
  if (status && status !== "all") {
    clauses.push("status = ?");
    params.push(status);
  }

  return { where: clauses.length ? "WHERE " + clauses.join(" AND ") : "", params };
};

// ──────────────────────────────
// GET /api/admin/users
// ──────────────────────────────
const getUsers = async (req, res, next) => {
  try {
    const {
      search    = "",
      role      = "all",
      status    = "all",
      sortBy    = "created_at",
      sortOrder = "desc",
      page      = 1,
      limit     = 10,
    } = req.query;

    const offset = (page - 1) * limit;
    const { where, params } = buildWhereClause(search, role, status);

    const [rows] = await pool.query(
      `SELECT SQL_CALC_FOUND_ROWS id, username, email, role, status,
              DATE_FORMAT(created_at,'%Y-%m-%d') AS created_at
       FROM users
       ${where}
       ORDER BY ${pool.escapeId(sortBy)} ${sortOrder === "asc" ? "ASC" : "DESC"}
       LIMIT ? OFFSET ?`,
      [...params, Number(limit), Number(offset)]
    );

    const [[{ "FOUND_ROWS()": total }]] = await pool.query("SELECT FOUND_ROWS()");
    res.json({ users: rows, total });
  } catch (err) {
    next(err);
  }
};

// ──────────────────────────────
// POST /api/admin/users
// ──────────────────────────────
const createUser = async (req, res, next) => {
  try {
    const { username, email, password, role = "victim" } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, email, password, role) VALUES (?,?,?,?)",
      [username, email, hashed, role]
    );
    res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

// ──────────────────────────────
// PUT /api/admin/users/:id
// ──────────────────────────────
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;

    await pool.query(
      "UPDATE users SET role = COALESCE(?, role), status = COALESCE(?, status) WHERE id = ?",
      [role, status, id]
    );
    res.json({ message: "User updated" });
  } catch (err) {
    next(err);
  }
};

// ──────────────────────────────
// PUT /api/admin/users/bulk-status
// ──────────────────────────────
const bulkStatus = async (req, res, next) => {
  try {
    const { ids = [], status } = req.body;
    if (!ids.length) return res.status(400).json({ message: "No ids supplied" });

    await pool.query(
      `UPDATE users SET status = ? WHERE id IN (${ids.map(() => "?").join(",")})`,
      [status, ...ids]
    );
    res.json({ message: "Status updated" });
  } catch (err) {
    next(err);
  }
};

// ──────────────────────────────
// DELETE /api/admin/users
// ──────────────────────────────
const bulkDelete = async (req, res, next) => {
  try {
    const { ids = [] } = req.body;
    if (!ids.length) return res.status(400).json({ message: "No ids supplied" });

    await pool.query(
      `DELETE FROM users WHERE id IN (${ids.map(() => "?").join(",")})`,
      ids
    );
    res.json({ message: `Deleted ${ids.length} user(s)` });
  } catch (err) {
    next(err);
  }
};

// ──────────────────────────────
// Export all
// ──────────────────────────────
module.exports = {
  getUsers,
  createUser,
  updateUser,
  bulkStatus,
  bulkDelete,
  getAllCounselors,
};
