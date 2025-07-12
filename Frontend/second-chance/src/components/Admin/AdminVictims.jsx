import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Users,
  Search,
  Filter,
  Download,
  RefreshCw,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldCheck,
  Heart,
} from "lucide-react";
import AdminLayout from "./AdminLayout";

const AdminVictims = () => {
  const [victims, setVictims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVictims, setSelectedVictims] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [victimsPerPage] = useState(10);

  const [filterDrug, setFilterDrug] = useState("all");
  const [filterAge, setFilterAge] = useState("all");

  const [counselors, setCounselors] = useState([]);
  const [assignModal, setAssignModal] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [viewModal, setViewModal] = useState(null);

  const loadVictims = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5000/api/admin/victims", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVictims(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching victims:", err);
      setError("Failed to fetch victim data");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCounselors = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5000/api/admin/victims/counselors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCounselors(res.data);
    } catch (err) {
      console.error("Error fetching counselors:", err);
    }
  };

  const assignCounselor = async () => {
    if (!assignModal || !selectedCounselor) return;
    try {
      await axios.put("http://localhost:5000/api/admin/victims/assign", {
        victim_id: assignModal.user_id,
        counselor_id: selectedCounselor,
      });
      setAssignModal(null);
      loadVictims();
    } catch (err) {
      console.error("Assignment failed:", err);
    }
  };

  const deleteVictim = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this victim?")) return;
    try {
      await axios.delete("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
        data: { ids: [userId] },
      });
      loadVictims();
    } catch (err) {
      console.error("Error deleting victim:", err);
    }
  };

  useEffect(() => {
    loadVictims();
    loadCounselors();
  }, [loadVictims]);

  const filteredVictims = victims.filter((v) => {
    const matchSearch = `${v.username} ${v.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAge =
      filterAge === "all" ||
      (filterAge === "<18" && v.age < 18) ||
      (filterAge === "18-30" && v.age >= 18 && v.age <= 30) ||
      (filterAge === "31-50" && v.age >= 31 && v.age <= 50) ||
      (filterAge === ">50" && v.age > 50);
    const matchDrug = filterDrug === "all" || v.drug_type === filterDrug;
    return matchSearch && matchAge && matchDrug;
  });

  const indexOfLast = currentPage * victimsPerPage;
  const indexOfFirst = indexOfLast - victimsPerPage;
  const currentVictims = filteredVictims.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredVictims.length / victimsPerPage);

  return (
    <AdminLayout>
      <div className="admin-users">
        <div className="page-header">
          <h1>Victim Management</h1>
          <div className="header-actions">
            <button className="action-button" onClick={loadVictims}>
              <RefreshCw size={16} /> <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="filters-bar">
          <div className="search-filter">
            <Search size={18} />
            <input
              placeholder="Search victims…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-select">
            <label>Age:</label>
            <select value={filterAge} onChange={(e) => setFilterAge(e.target.value)}>
              <option value="all">All</option>
              <option value="<18">Under 18</option>
              <option value="18-30">18-30</option>
              <option value="31-50">31-50</option>
              <option value=">50">Above 50</option>
            </select>
          </div>
          <div className="filter-select">
            <label>Drug Type:</label>
            <select value={filterDrug} onChange={(e) => setFilterDrug(e.target.value)}>
              <option value="all">All</option>
              {[...new Set(victims.map((v) => v.drug_type))].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Age</th>
                <th>Drug</th>
                <th>Risk</th>
                <th>Submitted</th>
                <th>Counselor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentVictims.map((v, i) => (
                <tr key={v.id}>
                  <td>{indexOfFirst + i + 1}</td>
                  <td>{v.username}</td>
                  <td>{v.email}</td>
                  <td>{v.age}</td>
                  <td>{v.drug_type}</td>
                  <td>{v.risk_score ?? "N/A"}</td>
                  <td>{new Date(v.submitted_at).toLocaleDateString()}</td>
                  <td>{v.counselor_name ?? "Not Assigned"}</td>
                  <td>
                    <button className="table-action" onClick={() => setViewModal(v)}>
                      <Eye size={16} />
                    </button>
                    <button className="table-action" onClick={() => setAssignModal(v)}>
                      <UserPlus size={16} />
                    </button>
                    <button className="table-action delete" onClick={() => deleteVictim(v.user_id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {assignModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Assign Counselor</h2>
              <p>Assigning to: <strong>{assignModal.username}</strong></p>
              <select value={selectedCounselor} onChange={(e) => setSelectedCounselor(e.target.value)}>
                <option value="">Select counselor</option>
                {counselors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
              <div className="modal-actions">
                <button className="modal-close" onClick={() => setAssignModal(null)}>Cancel</button>
                <button className="modal-confirm" disabled={!selectedCounselor} onClick={assignCounselor}>Assign</button>
              </div>
            </div>
          </div>
        )}

        {viewModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Victim Details</h2>
              <ul>
                <li><strong>Username:</strong> {viewModal.username}</li>
                <li><strong>Email:</strong> {viewModal.email}</li>
                <li><strong>Age:</strong> {viewModal.age}</li>
                <li><strong>Gender:</strong> {viewModal.gender}</li>
                <li><strong>Location:</strong> {viewModal.location}</li>
                <li><strong>Occupation:</strong> {viewModal.occupation}</li>
                <li><strong>Drug Type:</strong> {viewModal.drug_type}</li>
                <li><strong>Frequency:</strong> {viewModal.frequency}</li>
                <li><strong>Last Use Date:</strong> {viewModal.last_use_date}</li>
                <li><strong>Mental Health Issues:</strong> {viewModal.mental_health_issues}</li>
                <li><strong>Physical Health Issues:</strong> {viewModal.physical_health_issues}</li>
                <li><strong>Support System:</strong> {viewModal.support_system}</li>
                <li><strong>Risk Score:</strong> {viewModal.risk_score}</li>
              </ul>
              <div className="modal-actions">
                <button className="modal-close" onClick={() => setViewModal(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminVictims;
