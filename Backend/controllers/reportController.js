// server/controllers/reportController.js
//----------------------------------------------------------
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const pool   = require("../models/db");

// ──────────────────────────────────────────────────────────
// Helper: AES‑256‑CBC encrypt, returns IV + ciphertext blob
// ──────────────────────────────────────────────────────────
const encrypt = (text) => {
  if (!text) return null;
  const iv  = crypto.randomBytes(16);
  const key = Buffer.from(process.env.AES_SECRET, "utf8"); // 32‑byte secret
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const enc = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return Buffer.concat([iv, enc]);
};

// ──────────────────────────────────────────────────────────
// 1. Submit anonymous report
// ──────────────────────────────────────────────────────────
const submitAnonymousReport = async (req, res) => {
  try {
    const {
      reportType,
      district,
      location,
      description,
      date,
      time,
      involvedPersons,
      additionalInfo,
      contactOptional,
    } = req.body;

    if (!reportType || !district || !description) {
      return res.status(400).json({ message: "Missing mandatory fields." });
    }

    const uuid = uuidv4();

    const [result] = await pool.execute(
      `INSERT INTO anonymous_reports
       (report_uuid, report_type, district, location, description,
        incident_date, incident_time, involved_persons_description,
        additional_info, contact_info_encrypted)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuid,
        reportType,
        district,
        location || null,
        description,
        date || null,
        time || null,
        involvedPersons || null,
        additionalInfo || null,
        encrypt(contactOptional),
      ]
    );

    return res.status(201).json({
      message: "Report stored",
      reportId: result.insertId,
      reportUuid: uuid,
    });
  } catch (err) {
    console.error("submitAnonymousReport:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ──────────────────────────────────────────────────────────
// 2. Get status of a single report
// ──────────────────────────────────────────────────────────
const getReportStatus = async (req, res) => {
  const { uuid } = req.params;

  try {
    const [rows] = await pool.execute(
      `SELECT report_uuid   AS reportId,
              report_type   AS type,
              district,
              incident_date AS date,
              report_status AS status
         FROM anonymous_reports
        WHERE report_uuid = ?`,
      [uuid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("getReportStatus:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ──────────────────────────────────────────────────────────
// 3. Get five most‑recent reports
// ──────────────────────────────────────────────────────────
const getRecentReports = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT report_id,
              district,
              report_type,
              report_status,
              DATE_FORMAT(created_at, '%Y-%m-%d') AS createdDate
         FROM anonymous_reports
        ORDER BY created_at DESC
        LIMIT 5`
    );

    const recent = rows.map((r) => ({
      id: `R-${r.report_id}`,
      district: r.district,
      type: r.report_type,
      status: r.report_status,
      date: r.createdDate,
    }));

    res.json(recent);
  } catch (err) {
    console.error("getRecentReports:", err);
    res.status(500).json({ message: "Could not fetch recent reports" });
  }
};

// ──────────────────────────────────────────────────────────
// Export the three controllers in ONE object
// ──────────────────────────────────────────────────────────
module.exports = {
  submitAnonymousReport,
  getReportStatus,
  getRecentReports,
};
