const pool = require('../models/db');

exports.listReports = async (req, res) => {
  try {
   const [rows] = await pool.execute(
  `SELECT
     report_id       AS id,
     report_uuid     AS uuid,
     report_type     AS type,
     district,
     location,
     description,
     incident_date   AS date,
     report_status   AS status,
     created_at
   FROM anonymous_reports`
);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateReportStatus = async (req, res) => {
  const { id }   = req.params;
  const { status } = req.body;                   // "Pending" | "Investigating" | "Resolved"
  try {
    await pool.execute(
      `UPDATE anonymous_reports SET report_status = ? WHERE report_id = ?`,
      [status, id]
    );
    res.json({ message: 'Status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReport = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute(`DELETE FROM anonymous_reports WHERE report_id = ?`, [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


