const pool = require("../models/db");

const getRecoveryData = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [recovery] = await pool.query(
      "SELECT * FROM victim_recovery WHERE user_id = ?",
      [userId]
    );

    const [milestones] = await pool.query(
      "SELECT * FROM milestones WHERE user_id = ? ORDER BY date ASC",
      [userId]
    );

    const [journalEntries] = await pool.query(
      "SELECT * FROM journal_entries WHERE user_id = ? ORDER BY date DESC",
      [userId]
    );

    const [checkins] = await pool.query(
      "SELECT * FROM daily_checkins WHERE user_id = ? ORDER BY date DESC LIMIT 7",
      [userId]
    );

    const [progressData] = await pool.query(
      "SELECT DATE_FORMAT(date, '%b %e') as date, wellbeing, cravings FROM progress_data WHERE user_id = ? ORDER BY date ASC",
      [userId]
    );

    res.json({
      daysInRecovery: recovery[0]?.days_in_recovery || 0,
      sobrietyDate: recovery[0]?.sobriety_date,
      milestones,
      journalEntries,
      dailyCheckins: checkins,
      progressData,
    });
  } catch (error) {
    console.error("Error loading recovery data:", error);
    res.status(500).json({ error: "Failed to load recovery data" });
  }
};

const addJournalEntry = async (req, res) => {
  const userId = req.params.userId;
  const { mood, triggers, content } = req.body;

  try {
    await pool.query(
      "INSERT INTO journal_entries (user_id, date, mood, triggers, notes) VALUES (?, CURDATE(), ?, ?, ?)",
      [userId, mood, triggers, content]
    );
    res.json({ message: "Journal entry added" });
  } catch (error) {
    console.error("Error adding journal:", error);
    res.status(500).json({ error: "Failed to add journal entry" });
  }
};

const addCheckIn = async (req, res) => {
  const userId = req.params.userId;

  try {
    await pool.query(
      "INSERT INTO daily_checkins (user_id, date, completed) VALUES (?, CURDATE(), 1) ON DUPLICATE KEY UPDATE completed = 1",
      [userId]
    );
    res.json({ message: "Check-in completed" });
  } catch (error) {
    console.error("Error saving check-in:", error);
    res.status(500).json({ error: "Failed to save check-in" });
  }
};

const addProgressEntry = async (req, res) => {
  const userId = req.params.userId;
  const { date, wellbeing, cravings } = req.body;

  try {
    await pool.query(
      "INSERT INTO progress_data (user_id, date, wellbeing, cravings) VALUES (?, ?, ?, ?)",
      [userId, date, wellbeing, cravings]
    );
    res.json({ success: true, message: "Progress entry added" });
  } catch (error) {
    console.error("Error adding progress data:", error);
    res.status(500).json({ error: "Failed to add progress entry" });
  }
};

module.exports = {
  getRecoveryData,
  addJournalEntry,
  addCheckIn,
  addProgressEntry,
};
