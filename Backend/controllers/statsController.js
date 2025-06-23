// server/controllers/statsController.js
const db = require('../models/db');

exports.getUserStats = async (req, res) => {
  try {
    // Example: count total users and admins in your database
    const [usersCount] = await db.query('SELECT COUNT(*) AS totalUsers FROM users');
    const [adminsCount] = await db.query('SELECT COUNT(*) AS totalAdmins FROM admin_users');

    res.status(200).json({
      totalUsers: usersCount[0].totalUsers,
      totalAdmins: adminsCount[0].totalAdmins,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
