import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  ChevronLeft,
  ChevronRight,
  Trash2,
  UserX,
} from "lucide-react";
import AdminLayout from "./AdminLayout";

const AdminVictims = () => {
  const [victims, setVictims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("submitted_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [victimsPerPage] = useState(10);
  const [filterAge, setFilterAge] = useState("all");
  const [filterDrug, setFilterDrug] = useState("all");
  const [selectedVictim, setSelectedVictim] = useState(null);

  const buildQuery = () => {
    return new URLSearchParams({
      search: searchTerm,
      sortBy,
      sortOrder,
    }).toString();
  };

  const loadVictims = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `http://localhost:5000/api/admin/victims?${buildQuery()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (Array.isArray(response.data)) {
        setVictims(response.data);
        setError(null);
      } else throw new Error("Invalid data format");
    } catch (e) {
      console.error("Error loading victims:", e);
      setError(e.message || "Failed to load victim details");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, sortBy, sortOrder]);

  useEffect(() => {
    loadVictims();
  }, [loadVictims]);

  const filteredVictims = victims.filter((v) => {
    const inSearch = `${v.username} ${v.email} ${v.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const inAge =
      filterAge === "all" ||
      (filterAge === "<18" && v.age < 18) ||
      (filterAge === "18-30" && v.age >= 18 && v.age <= 30) ||
      (filterAge === "31-50" && v.age >= 31 && v.age <= 50) ||
      (filterAge === ">50" && v.age > 50);
    const inDrug = filterDrug === "all" || v.drug_type === filterDrug;
    return inSearch && inAge && inDrug;
  });

  const sortedVictims = [...filteredVictims].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (sortBy.includes("date") || sortBy.includes("at")) {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }
    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  });

  const indexOfLast = currentPage * victimsPerPage;
  const indexOfFirst = indexOfLast - victimsPerPage;
  const currentVictims = sortedVictims.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedVictims.length / victimsPerPage);

  const handleSort = (col) => {
    if (sortBy === col) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(col);
      setSortOrder("asc");
    }
  };

  const exportCSV = () => {
    const csv = [
      [
        "Username",
        "Email",
        "Age",
        "Gender",
        "Location",
        "Drug Type",
        "Frequency",
        "Support",
        "Risk",
        "Submitted"
      ],
      ...filteredVictims.map((v) => [
        v.username,
        v.email,
        v.age,
        v.gender,
        v.location,
        v.drug_type,
        v.frequency,
        v.support_system,
        v.risk_score,
        new Date(v.submitted_at).toLocaleDateString("en-IN")
      ])
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "victims.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const deactivateVictim = async (userId) => {
    if (!window.confirm("Are you sure you want to deactivate this victim?")) return;
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${userId}`, {
        status: "inactive",
      });
      loadVictims();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteVictim = async (userId) => {
    if (!window.confirm("Are you sure you want to permanently delete this victim?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users`, {
        data: { ids: [userId] },
      });
      loadVictims();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-users">
        <div className="page-header">
          <h1>Victim Management</h1>
          <div className="header-actions">
            <button className="action-button" onClick={exportCSV}>
              <Download size={16} /> <span>Export</span>
            </button>
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
                <option key={type}>{type}</option>
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
                  <td>
                    <button
                      className="table-action view"
                      onClick={() => setSelectedVictim(v)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="table-action"
                      onClick={() => deactivateVictim(v.user_id)}
                    >
                      <UserX size={16} />
                    </button>
                    <button
                      className="table-action delete"
                      onClick={() => deleteVictim(v.user_id)}
                    >
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

        {selectedVictim && (
          <div className="modal">
            <div className="modal-content">
              <h2>Victim Profile</h2>
              <p><strong>Username:</strong> {selectedVictim.username}</p>
              <p><strong>Email:</strong> {selectedVictim.email}</p>
              <p><strong>Age:</strong> {selectedVictim.age}</p>
              <p><strong>Gender:</strong> {selectedVictim.gender}</p>
              <p><strong>Location:</strong> {selectedVictim.location}</p>
              <p><strong>Drug Type:</strong> {selectedVictim.drug_type}</p>
              <p><strong>Frequency:</strong> {selectedVictim.frequency}</p>
              <p><strong>Duration:</strong> {selectedVictim.duration_of_use}</p>
              <p><strong>Last Use:</strong> {selectedVictim.last_use_date}</p>
              <p><strong>Support:</strong> {selectedVictim.support_system}</p>
              <p><strong>Risk Score:</strong> {selectedVictim.risk_score}</p>
              <button className="modal-close" onClick={() => setSelectedVictim(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminVictims;