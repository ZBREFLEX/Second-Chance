const express = require('express');
  const cors = require('cors');
  const dotenv = require('dotenv');
  const authRoutes = require('./routes/authRoutes');
  const statsRoutes = require('./routes/statsRoutes');
  const usersRoutes = require('./routes/usersRoutes');
  const reportRoutes = require('./routes/reportRoutes');
  const adminReportRoutes = require("./routes/reportAdminRoutes");
  const counselorRoutes = require('./routes/counselorRoutes');
  const adminUserRoutes = require("./routes/adminUserRoutes");
  const errorHandler    = require("./middleware/errorHandler");
  const verifyToken = require("./middleware/verifyToken");
  dotenv.config();
  const app = express();

  app.use(cors());
  app.use(express.json());
 


  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/', statsRoutes);
  app.use('/api',usersRoutes)
  app.use('/api/reports', reportRoutes);
  app.use('/api/admin/reports', adminReportRoutes);  
  app.use('/api/counselors', counselorRoutes);
  app.use("/api/admin/users", adminUserRoutes);
  app.use("/api", reportRoutes); 
  
  app.use(errorHandler);
  

  // Server
  const PORT = process.env.PORT || 5000;
  app.get('/', (req, res) => {
    res.send("🚀 API is working");
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  const db = require('./models/db');
  db.query('SELECT 1')
    .then(() => console.log('✅ MySQL connected successfully'))
    .catch(err => console.error('❌ MySQL connection failed:', err));