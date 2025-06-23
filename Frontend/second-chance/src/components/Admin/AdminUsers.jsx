"use client";

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

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ----------  UI state ---------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const [selectedUsers, setSelectedUsers] = useState([]);

  /* ----------  server meta ---------- */
  const [totalUsers, setTotalUsers] = useState(0);

  /* ----------  helpers ---------- */
  const buildQuery = () => {
    const params = new URLSearchParams({
      search: searchTerm,
      role: filterRole,
      status: filterStatus,
      sortBy,
      sortOrder,
      page: currentPage,
      limit: usersPerPage,
    });
    return params.toString();
  };

  /* ----------  api ---------- */
  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/users?${buildQuery()}`,
        { 
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("adminToken")}` 
          }
        }
      );
      if (!res.ok) throw new Error("Failed to load users");
      const data = res.data;
      setUsers(data.users);
      setTotalUsers(data.total ?? data.users.length);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [
    searchTerm,
    filterRole,
    filterStatus,
    sortBy,
    sortOrder,
    currentPage,
    usersPerPage,
  ]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const bulkUpdateStatus = async (status) => {
    try {
      await axios.put("http://localhost:5000/api/admin/users/bulk-status", {
        ids: selectedUsers, 
        status
      }, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json"
        }
      });
      setSelectedUsers([]);
      loadUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const bulkDelete = async () => {
    const ok = window.confirm(
      `Are you sure you want to delete ${selectedUsers.length} user(s)?`
    );
    if (!ok) return;

    try {
      await axios.delete("http://localhost:5000/api/admin/users", {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json"
        },
        data: { ids: selectedUsers }
      });
      setSelectedUsers([]);
      loadUsers();
    } catch (e) {
      console.error(e);
    }
  };

  /* ----------  local filter / sort / paginate ---------- */
 const filteredUsers = users.filter((user) => {
  const isNotAdmin = user.role !== "admin"      // 👈 this line
  const matchesSearch =
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  const matchesRole = filterRole === "all" || user.role === filterRole
  const matchesStatus = filterStatus === "all" || user.status === filterStatus

  return isNotAdmin && matchesSearch && matchesRole && matchesStatus
})


  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (sortBy === "created_at") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }
    return sortOrder === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
  });

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  /* ----------  table helpers ---------- */
  const handleSort = (col) => {
    if (sortBy === col) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(col);
      setSortOrder("asc");
    }
  };

  const handleSelectUser = (id) =>
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleSelectAll = () =>
    setSelectedUsers(
      selectedUsers.length === currentUsers.length
        ? []
        : currentUsers.map((u) => u.id)
    );

  const getRoleIcon = (r) =>
    r === "counselor" ? (
      <ShieldCheck size={14} />
    ) : r === "ngo" ? (
      <Shield size={14} />
    ) : r === "victim" ? (
      <Heart size={14} />
    ) : (
      <Users size={14} />
    );

  const getStatusIcon = (s) =>
    s === "active" ? "●" : s === "inactive" ? "○" : s === "blocked" ? "✕" : "?";

  /* ----------  render ---------- */
  if (loading)
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Loading users…</p>
        </div>
      </AdminLayout>
    );

  if (error)
    return (
      <AdminLayout>
        <div className="error-container">
          <h3>Error loading users</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={loadUsers}>
            <RefreshCw size={16} /> Retry
          </button>
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="admin-users">
        {/* ------------ header ------------ */}
        <div className="page-header">
          <h1>User Management</h1>
          <div className="header-actions">
            <button className="action-button primary">
              <UserPlus size={16} /> <span>Add User</span>
            </button>
            <button className="action-button">
              <Download size={16} /> <span>Export</span>
            </button>
            <button className="action-button" onClick={loadUsers}>
              <RefreshCw size={16} /> <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* ------------ filters ------------ */}
        <div className="filters-bar">
          <div className="search-filter">
            <Search size={18} />
            <input
              placeholder="Search users…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <div className="filter-select">
              <label>Role:</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="victim">Victim</option>
                <option value="counselor">Counselor</option>
                <option value="ngo">NGO</option>
              </select>
            </div>

            <div className="filter-select">
              <label>Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            <button className="filter-button">
              <Filter size={16} /> <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* ------------ table ------------ */}
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedUsers.length === currentUsers.length &&
                      currentUsers.length > 0
                    }
                  />
                </th>
                <th onClick={() => handleSort("id")}>
                  ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("username")}>
                  Username{" "}
                  {sortBy === "username" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("email")}>
                  Email {sortBy === "email" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("role")}>
                  Role {sortBy === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("status")}>
                  Status{" "}
                  {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("created_at")}>
                  Created{" "}
                  {sortBy === "created_at" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(u.id)}
                      onChange={() => handleSelectUser(u.id)}
                    />
                  </td>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-badge ${u.role}`}>
                      {getRoleIcon(u.role)} {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${u.status}`}>
                      {getStatusIcon(u.status)} {u.status}
                    </span>
                  </td>
                  <td>{u.created_at}</td>
                  <td className="actions-cell">
                    <button className="table-action view">
                      <Eye size={16} />
                    </button>
                    <button className="table-action edit">
                      <Edit size={16} />
                    </button>
                    <button className="table-action delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ------------ pagination ------------ */}
        <div className="pagination">
          <div className="pagination-info">
            Showing {indexOfFirst + 1}‑{Math.min(indexOfLast, sortedUsers.length)}
            {" of "}
            {sortedUsers.length} users{/* or use totalUsers from server */}
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === totalPages ||
                  (p >= currentPage - 1 && p <= currentPage + 1)
              )
              .map((p, i, arr) => (
                <span key={p}>
                  {i > 0 && arr[i - 1] !== p - 1 && (
                    <span className="pagination-ellipsis">…</span>
                  )}
                  <button
                    className={`pagination-button ${
                      currentPage === p ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                </span>
              ))}

            <button
              className="pagination-button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ------------ bulk actions ------------ */}
        {selectedUsers.length > 0 && (
          <div className="bulk-actions">
            <span>{selectedUsers.length} users selected</span>
            <div className="bulk-buttons">
              <button
                className="bulk-button"
                onClick={() => bulkUpdateStatus("active")}
              >
                Activate Selected
              </button>
              <button
                className="bulk-button"
                onClick={() => bulkUpdateStatus("inactive")}
              >
                Deactivate Selected
              </button>
              <button
                className="bulk-button"
                onClick={() => bulkUpdateStatus("blocked")}
              >
                Block Selected
              </button>
              <button className="bulk-button delete" onClick={bulkDelete}>
                Delete Selected
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;