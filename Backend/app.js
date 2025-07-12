const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const reportRoutes = require('./routes/reportRoutes');
const adminReportRoutes = require('./routes/reportAdminRoutes');
const counselorRoutes = require('./routes/counselorRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const victimDetailsRoutes = require('./routes/victimDetails');
const recoveryRoutes = require('./routes/recoveryRoutes');
const anonymousReportRoutes = require('./routes/anonymousReportRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminVictimRoutes = require('./routes/adminVictimRoutes');
const adminCounselorRoutes = require('./routes/adminCounselorRoutes');

const errorHandler = require('./middleware/errorHandler');
const db = require('./models/db');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base API Check
app.get('/', (req, res) => {
  res.send("🚀 API is working");
});

// Connect to MySQL
db.query('SELECT 1')
  .then(() => console.log('✅ MySQL connected successfully'))
  .catch(err => console.error('❌ MySQL connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', statsRoutes);
app.use('/api', usersRoutes);
app.use('/api/reports', reportRoutes);
 // Main report routes (victim-side)
app.use('/api/admin/reports', adminReportRoutes); // Admin-specific reports
app.use('/api/counselors', counselorRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/victim-details', victimDetailsRoutes);
app.use("/api/recovery", recoveryRoutes); // Recovery tracking routes
app.use('/api/reports', anonymousReportRoutes); // Anonymous reports
app.use('/api/chat', chatRoutes);
app.use('/api/admin/victims', adminVictimRoutes);
app.use('/api/admin/counselors', adminCounselorRoutes);

// Error Handler (should be last)
app.use(errorHandler);

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
