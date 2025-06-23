// server/controllers/authController.js
const db = require('../models/db');
const jwt     = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashed, role]
    );

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register admins into `admin` table
exports.registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const [admin] = await db.query('SELECT * FROM admin_users WHERE email = ?', [email]);
    if (admin.length) return res.status(400).json({ message: 'Admin already exists' });

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO admin_users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashed]
    );

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user.length) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user[0].id, role: user[0].role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//admin login
// admin login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [admin] = await db.query('SELECT * FROM admin_users WHERE email = ?', [email]);
    if (!admin.length) return res.status(400).json({ message: 'Invalid credentials' }); // <--- Returns 400

    const match = await bcrypt.compare(password, admin[0].password);
    if (!match) return res.status(400).json({ message: 'Wrong password' }); // <--- Returns 400

    const token = jwt.sign({ id: admin[0].id, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      admin: { id: admin[0].id, username: admin[0].username, email: admin[0].email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
