"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  FileText,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Map,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import "./css/AdminDashboard.css";

const AdminReports = () => {
  /* ─────────────────────────────── state */
  const [reportsData,     setReportsData]     = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [currentPage,     setCurrentPage]     = useState(1);
  const [searchTerm,      setSearchTerm]      = useState("");
  const [filterType,      setFilterType]      = useState("all");
  const [filterStatus,    setFilterStatus]    = useState("all");
  const [filterDistrict,  setFilterDistrict]  = useState("all");
  const [sortBy,          setSortBy]          = useState("date");
  const [sortOrder,       setSortOrder]       = useState("desc");
  const [viewMode,        setViewMode]        = useState("table"); // 'table' | 'map'

  /* ─────────────────────────────── load data */
  const loadReports = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/reports");
      setReportsData(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load reports");
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  /* ─────────────────────────────── bulk helpers */
  const bulkUpdateStatus = async (newStatus) => {
    try {
      await Promise.all(
        selectedReports.map((id) =>
          axios.put(`http://localhost:5000/api/admin/reports/${id}/status`, {
            status: newStatus,
          })
        )
      );
      loadReports();
      setSelectedReports([]);
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  const bulkDelete = async () => {
    if (!window.confirm("Delete selected reports?")) return;
    try {
      await Promise.all(
        selectedReports.map((id) =>
          axios.delete(`http://localhost:5000/api/admin/reports/${id}`)
        )
      );
      loadReports();
      setSelectedReports([]);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ─────────────────────────────── filter + sort */
  const filteredReports = reportsData
    .filter((r) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        r.id.toString().toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q) ||
        (r.location || "").toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q);

      const matchesType     = filterType     === "all" || r.type   === filterType;
      const matchesStatus   = filterStatus   === "all" || r.status === filterStatus;
      const matchesDistrict = filterDistrict === "all" || r.district === filterDistrict;

      return matchesSearch && matchesType && matchesStatus && matchesDistrict;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? a[sortBy] > b[sortBy] ? 1 : -1
        : a[sortBy] < b[sortBy] ? 1 : -1
    );

  /* ─────────────────────────────── pagination */
  const reportsPerPage   = 10;
  const totalPages       = Math.ceil(filteredReports.length / reportsPerPage);
  const indexOfLast      = currentPage * reportsPerPage;
  const indexOfFirst     = indexOfLast - reportsPerPage;
  const currentReports   = filteredReports.slice(indexOfFirst, indexOfLast);

  /* ─────────────────────────────── UI helpers */
  const handleSelectAll = (e) =>
    setSelectedReports(
      e.target.checked ? currentReports.map((r) => r.id) : []
    );

  const handleSelectReport = (id) =>
    setSelectedReports((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleSort = (col) => {
    if (sortBy === col) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(col);
      setSortOrder("desc");
    }
  };

  const getStatusIcon = (s) =>
    s === "Resolved"
      ? <CheckCircle size={16}/>
      : s === "Pending"
      ? <Clock size={16}/>
      : <AlertTriangle size={16}/>;

  const getSeverityClass = (sev) => ({
    Low:"severity-low",
    Medium:"severity-medium",
    High:"severity-high",
    Critical:"severity-critical",
  }[sev] || "");

  /* ─────────────────────────────── districts list */
  const districts = [
    "Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam","Kottayam",
    "Kozhikode","Malappuram","Palakkad","Pathanamthitta",
    "Thiruvananthapuram","Thrissur","Wayanad",
  ];

  /* ─────────────────────────────── render */
  return (
    <AdminLayout>
      <div className="admin-reports">
        {/* ─── header */}
        <div className="page-header">
          <h1>Reports Management</h1>
          <div className="header-actions">
            <button className="action-button primary">
              <FileText size={16}/> <span>New Report</span>
            </button>
            <button className="action-button">
              <Download size={16}/> <span>Export</span>
            </button>
            <button className="action-button" onClick={loadReports}>
              <RefreshCw size={16}/> <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* ─── filters */}
        <div className="filters-bar">
          <div className="search-filter">
            <Search size={18}/>
            <input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <div className="filter-select">
              <label>Type:</label>
              <select value={filterType} onChange={(e)=>setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="Dealing">Dealing</option>
                <option value="Usage">Usage</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
            </div>

            <div className="filter-select">
              <label>Status:</label>
              <select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Investigating">Investigating</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="filter-select">
              <label>District:</label>
              <select value={filterDistrict} onChange={(e)=>setFilterDistrict(e.target.value)}>
                <option value="all">All Districts</option>
                {districts.map((d)=>(
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <button className="filter-button">
              <Filter size={16}/> <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* ─── view toggle */}
        <div className="view-toggle">
          <button
            className={`view-button ${viewMode==="table"?"active":""}`}
            onClick={()=>setViewMode("table")}
          >
            <FileText size={16}/> <span>Table View</span>
          </button>
          <button
            className={`view-button ${viewMode==="map"?"active":""}`}
            onClick={()=>setViewMode("map")}
          >
            <Map size={16}/> <span>Map View</span>
          </button>
        </div>

        {/* ─── table / map */}
        {viewMode==="table" ? (
          <div className="reports-table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedReports.length===currentReports.length &&
                        currentReports.length>0
                      }
                    />
                  </th>
                  <th onClick={()=>handleSort("id")}>ID {sortBy==="id" && (sortOrder==="asc"?"↑":"↓")}</th>
                  <th onClick={()=>handleSort("district")}>District {sortBy==="district" && (sortOrder==="asc"?"↑":"↓")}</th>
                  <th onClick={()=>handleSort("location")}>Location {sortBy==="location" && (sortOrder==="asc"?"↑":"↓")}</th>
                  <th onClick={()=>handleSort("type")}>Type {sortBy==="type" && (sortOrder==="asc"?"↑":"↓")}</th>

                  {/* comment out these two lines if you don't have severity in DB
                  <th onClick={()=>handleSort("severity")}>Severity {sortBy==="severity" && (sortOrder==="asc"?"↑":"↓")}</th>
                  */}

                  <th onClick={()=>handleSort("status")}>Status {sortBy==="status" && (sortOrder==="asc"?"↑":"↓")}</th>
                  <th onClick={()=>handleSort("date")}>Date {sortBy==="date" && (sortOrder==="asc"?"↑":"↓")}</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentReports.map((r)=>(
                  <tr key={r.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(r.id)}
                        onChange={()=>handleSelectReport(r.id)}
                      />
                    </td>
                    <td>{r.id}</td>
                    <td>{r.district}</td>
                    <td>{r.location}</td>
                    <td><span className={`type-badge ${r.type?.toLowerCase()}`}>{r.type}</span></td>

                    {/* comment this TD if severity not present
                    <td><span className={`severity-badge ${getSeverityClass(r.severity)}`}>{r.severity}</span></td>
                    */}

                    <td>
                      <span className={`status-badge ${r.status?.toLowerCase()}`}>
                        {getStatusIcon(r.status)} {r.status}
                      </span>
                    </td>
                    <td>{r.date}</td>
                    <td className="actions-cell">
                      <button className="table-action view"><Eye size={16}/></button>
                      <button className="table-action edit"><CheckCircle size={16}/></button>
                      <button className="table-action delete"><XCircle size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="map-view">
            {/* Your placeholder map */}
            <h3>Kerala District Map (placeholder)</h3>
          </div>
        )}

        {/* ─── pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Showing {indexOfFirst+1}‑{Math.min(indexOfLast,filteredReports.length)} of {filteredReports.length} reports
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-button"
              disabled={currentPage===1}
              onClick={()=>setCurrentPage(currentPage-1)}
            ><ChevronLeft size={16}/></button>

            {Array.from({length:totalPages},(_,i)=>i+1)
              .filter(p=>p===1||p===totalPages||(p>=currentPage-1&&p<=currentPage+1))
              .map((p,i,arr)=>(
                <React.Fragment key={p}>
                  {i>0 && arr[i-1]!==p-1 && <span className="pagination-ellipsis">…</span>}
                  <button
                    className={`pagination-button ${currentPage===p?"active":""}`}
                    onClick={()=>setCurrentPage(p)}
                  >{p}</button>
                </React.Fragment>
              ))}

            <button
              className="pagination-button"
              disabled={currentPage===totalPages}
              onClick={()=>setCurrentPage(currentPage+1)}
            ><ChevronRight size={16}/></button>
          </div>
        </div>

        {/* ─── bulk actions */}
        {selectedReports.length>0 && (
          <div className="bulk-actions">
            <span>{selectedReports.length} reports selected</span>
            <div className="bulk-buttons">
              <button className="bulk-button" onClick={()=>bulkUpdateStatus("Resolved")}>Mark as Resolved</button>
              <button className="bulk-button" onClick={()=>bulkUpdateStatus("Investigating")}>Mark as Investigating</button>
              <button className="bulk-button delete" onClick={bulkDelete}>Delete Selected</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminReports;