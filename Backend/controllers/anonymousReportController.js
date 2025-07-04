const pool = require("../models/db");

const getDistrictStats = async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT district,
             COUNT(*) AS total_reports,
             SUM(CASE WHEN report_type = 'Recovery' THEN 1 ELSE 0 END) AS recovery_reports
      FROM anonymous_reports
      GROUP BY district
    `);

    const data = {};
    const MAX_REPORTS = 25;

    results.forEach((row) => {
      const usage = Math.min((row.total_reports / MAX_REPORTS) * 100, 100);
      const recovery = row.total_reports > 0 ? (row.recovery_reports / row.total_reports) * 100 : 0;

      data[row.district.toLowerCase()] = {
        name: row.district,
        usage: parseFloat(usage.toFixed(1)),
        recovery: parseFloat(recovery.toFixed(1)),
      };
    });

    res.json(data);
  } catch (error) {
    console.error("Error fetching district stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getDistrictStats };
