// src/pages/AdminDashboard.jsx
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Activity,
  ArrowUp,
  ArrowDown,
  Clock,
} from "lucide-react";
import "./css/AdminDashboard.css";
import AdminLayout from "./AdminLayout";

const AdminDashboard = () => {
  const navigate = useNavigate();

  /* ────────────────────────
        STATE
  ──────────────────────── */
  const [totalUsers, setTotalUsers] = useState(0);
  const [growthPercent, setGrowthPercent] = useState(0);
  const [recentReports, setRecentReports] = useState([]);

  /* ────────────────────────
        AUTH + DATA FETCH
  ──────────────────────── */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    console.log("Stored token:", token);
    if (!token) {
      return navigate("/admin/login");
    }

    const headers = { headers: { Authorization: `Bearer ${token}` } };

    Promise.all([
      axios.get("http://localhost:3000/api/user-stats", headers),
      axios.get("http://localhost:3000/api/reports/recent", headers),
    ])
      .then(([userRes, reportRes]) => {
        setTotalUsers(userRes.data.totalUsers);
        setGrowthPercent(userRes.data.growthPercent);
        setRecentReports(reportRes.data);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          navigate("/admin/login");
        }
      });
  }, [navigate]);

  /* ────────────────────────
        STATIC CHART DATA
  ──────────────────────── */
  const districtData = [
    { name: "Thiruvananthapuram", cases: 245, recoveries: 120 },
    { name: "Kollam", cases: 187, recoveries: 95 },
    { name: "Pathanamthitta", cases: 132, recoveries: 78 },
    { name: "Alappuzha", cases: 156, recoveries: 82 },
    { name: "Kottayam", cases: 178, recoveries: 91 },
    { name: "Idukki", cases: 98, recoveries: 45 },
    { name: "Ernakulam", cases: 267, recoveries: 134 },
    { name: "Thrissur", cases: 213, recoveries: 105 },
    { name: "Palakkad", cases: 176, recoveries: 87 },
    { name: "Malappuram", cases: 198, recoveries: 94 },
    { name: "Kozhikode", cases: 225, recoveries: 112 },
    { name: "Wayanad", cases: 87, recoveries: 42 },
    { name: "Kannur", cases: 167, recoveries: 83 },
    { name: "Kasaragod", cases: 124, recoveries: 61 },
  ];

  const monthlyData = [
    { name: "Jan", cases: 145, recoveries: 65, reports: 32 },
    { name: "Feb", cases: 162, recoveries: 78, reports: 41 },
    { name: "Mar", cases: 156, recoveries: 82, reports: 38 },
    { name: "Apr", cases: 172, recoveries: 95, reports: 45 },
    { name: "May", cases: 168, recoveries: 102, reports: 52 },
    { name: "Jun", cases: 187, recoveries: 110, reports: 58 },
    { name: "Jul", cases: 195, recoveries: 115, reports: 62 },
    { name: "Aug", cases: 178, recoveries: 120, reports: 55 },
    { name: "Sep", cases: 165, recoveries: 125, reports: 48 },
    { name: "Oct", cases: 158, recoveries: 130, reports: 43 },
    { name: "Nov", cases: 152, recoveries: 128, reports: 39 },
    { name: "Dec", cases: 148, recoveries: 132, reports: 36 },
  ];

  const substanceData = [
    { name: "Cannabis", value: 35 },
    { name: "Alcohol", value: 25 },
    { name: "Opioids", value: 15 },
    { name: "Stimulants", value: 10 },
    { name: "Others", value: 15 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const recentUsers = [
    { id: "U-1024", name: "Anonymous User", type: "Recovery Tracking", date: "2023-05-17" },
    { id: "U-1023", name: "Anonymous User", type: "Risk Assessment", date: "2023-05-17" },
    { id: "U-1022", name: "Anonymous User", type: "Counselor Communication", date: "2023-05-16" },
    { id: "U-1021", name: "Anonymous User", type: "Anonymous Report", date: "2023-05-16" },
    { id: "U-1020", name: "Anonymous User", type: "Awareness Hub", date: "2023-05-15" },
  ];

  /* ────────────────────────
        RENDER
  ──────────────────────── */
  return (
    <AdminLayout>
      <div className="admin-dashboard">
        {/* ───── Header ───── */}
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="date-filter">
            <span>
              <Clock size={16} /> Last updated: May 18, 2023, 10:30 AM
            </span>
          </div>
        </div>

        {/* ───── Stat Cards ───── */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon users">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <p className="stat-value">{totalUsers.toLocaleString()}</p>
              <p className={`stat-change ${growthPercent >= 0 ? "increase" : "decrease"}`}>
                {growthPercent >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(growthPercent)}% from last month
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon reports">
              <FileText size={24} />
            </div>
            <div className="stat-content">
              <h3>Reports Filed</h3>
              <p className="stat-value">587</p>
              <p className="stat-change increase">
                <ArrowUp size={14} /> 8% from last month
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon cases">
              <AlertTriangle size={24} />
            </div>
            <div className="stat-content">
              <h3>Active Cases</h3>
              <p className="stat-value">1,245</p>
              <p className="stat-change decrease">
                <ArrowDown size={14} /> 3% from last month
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon recoveries">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>Recoveries</h3>
              <p className="stat-value">876</p>
              <p className="stat-change increase">
                <ArrowUp size={14} /> 15% from last month
              </p>
            </div>
          </div>
        </div>

        {/* ───── Chart Grid ───── */}
        <div className="chart-grid">
          {/* Monthly Trends */}
          <div className="chart-card wide">
            <h2>Monthly Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cases" stroke="#FF8042" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="recoveries" stroke="#00C49F" />
                <Line type="monotone" dataKey="reports" stroke="#0088FE" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Substance Distribution */}
          <div className="chart-card">
            <h2>Substance Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={substanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {substanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* District Comparison */}
          <div className="chart-card">
            <h2>District Comparison</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={districtData.slice(0, 7)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cases" fill="#FF8042" />
                <Bar dataKey="recoveries" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
            <div className="view-more">
              <Link to="/admin/reports">View all districts</Link>
            </div>
          </div>
        </div>

        {/* ───── Tables Grid ───── */}
        <div className="tables-grid">
          {/* Recent Reports */}
          <div className="table-card">
            <div className="table-header">
              <h2>Recent Reports</h2>
              <Link to="/admin/reports" className="view-all">View All</Link>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>District</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>Loading…</td>
                    </tr>
                  ) : (
                    recentReports.map((report) => (
                      <tr key={report.id}>
                        <td>{report.id}</td>
                        <td>{report.district}</td>
                        <td>{report.type}</td>
                        <td>
                          <span className={`status-badge ${report.status.toLowerCase()}`}>
                            {report.status}
                          </span>
                        </td>
                        <td>{report.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent User Activity */}
          <div className="table-card">
            <div className="table-header">
              <h2>Recent User Activity</h2>
              <Link to="/admin/users" className="view-all">View All</Link>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Activity</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.type}</td>
                      <td>{user.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ───── Quick Actions ───── */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/admin/reports/new" className="action-button">
              <FileText size={20} />
              <span>Create Report</span>
            </Link>
            <Link to="/admin/users/new" className="action-button">
              <Users size={20} />
              <span>Add User</span>
            </Link>
            <Link to="/admin/content/new" className="action-button">
              <FileText size={20} />
              <span>Add Content</span>
            </Link>
            <Link to="/admin/settings" className="action-button">
              <Activity size={20} />
              <span>System Status</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;