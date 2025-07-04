const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Get messages between two users
router.get("/messages", async (req, res) => {
  const { senderId, receiverId } = req.query;
  try {
    const [rows] = await db.query(
      `SELECT * FROM messages 
       WHERE (sender_id = ? AND receiver_id = ?) 
          OR (sender_id = ? AND receiver_id = ?)
       ORDER BY timestamp ASC`,
      [senderId, receiverId, receiverId, senderId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Send a message
router.post("/messages", async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`,
      [sender_id, receiver_id, content]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

// List users by role
router.get("/users", async (req, res) => {
  const { role } = req.query;
  try {
    const [rows] = await db.query(`SELECT * FROM users WHERE role = ?`, [role]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
