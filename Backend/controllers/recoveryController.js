const db = require("../models/db");

// GET /api/recovery/:userId
exports.getRecoveryData = async (req, res) => {
  const { userId } = req.params;

  try {
    const [[recovery]] = await db.query("SELECT * FROM victim_recovery WHERE user_id = ?", [userId]);

    if (!recovery) {
      return res.status(404).json({ message: "Recovery record not found" });
    }

    const [milestones] = await db.query("SELECT * FROM milestones WHERE user_id = ?", [userId]);
    const [journalEntries] = await db.query("SELECT * FROM journal_entries WHERE user_id = ?", [userId]);
    const [dailyCheckins] = await db.query(
      "SELECT * FROM daily_checkins WHERE user_id = ? ORDER BY date DESC LIMIT 7",
      [userId]
    );

    const progressData = [
      { date: "Week 1", wellbeing: 30, cravings: 70 },
      { date: "Week 2", wellbeing: 40, cravings: 60 },
      { date: "Week 3", wellbeing: 50, cravings: 50 },
      { date: "Week 4", wellbeing: 60, cravings: 40 },
    ];

    res.json({
      daysInRecovery: recovery.days_in_recovery,
      sobrietyDate: recovery.sobriety_date,
      milestones,
      journalEntries,
      dailyCheckins,
      progressData
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


// POST /api/recovery/:userId/checkin
exports.addCheckIn = async (req, res) => {
  const { userId } = req.params;
  const today = new Date().toISOString().split("T")[0];

  try {
    await db.query(
      "INSERT INTO daily_checkins (user_id, date, completed) VALUES (?, ?, ?)",
      [userId, today, true]
    );
    res.json({ message: "Check-in recorded" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to record check-in");
  }
};

// POST /api/recovery/:userId/journal
exports.addJournal = async (req, res) => {
  const { userId } = req.params;
  const { mood, triggers, content } = req.body;
  const today = new Date().toISOString().split("T")[0];

  try {
    await db.query(
      "INSERT INTO journal_entries (user_id, date, mood, triggers, notes) VALUES (?, ?, ?, ?, ?)",
      [userId, today, mood, triggers, content]
    );
    res.json({ message: "Journal entry saved" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to save journal");
  }
};
