"use client"

import React, { useState, useEffect } from "react"
import axios from "axios" // Import axios for API calls
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Clock,
} from "lucide-react"
import AdminLayout from "./AdminLayout" // Assuming AdminLayout path is correct

const AdminCounselors = () => {
  const [counselors, setCounselors] = useState([]) // Stores counselors for the current page
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalRows, setTotalRows] = useState(0) // Total count of all counselors matching filters from backend

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterExperience, setFilterExperience] = useState("all")

  // Sorting states
  const [sortBy, setSortBy] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("desc")

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [counselorsPerPage] = useState(10) // Constant number of counselors per page

  // Selection states for bulk actions
  const [selectedCounselors, setSelectedCounselors] = useState([])

  // Function to load counselors from the backend API
  const loadCounselors = async () => {
    setLoading(true) // Start loading
    setError(null) // Clear any previous errors

    try {
      // --- Get the authentication token from localStorage ---
      const token = localStorage.getItem('adminToken'); // Assuming you store your admin's JWT in 'adminToken'
      if (!token) {
        console.error("Authentication token not found. Please log in as an administrator.");
        setError("Authentication required. Please log in to view counselor applications.");
        setLoading(false);
        // Optionally, redirect to login page here, e.g., using react-router-dom's navigate
        // navigate('/admin/login');
        return;
      }

      // Construct query parameters for the API call
      const params = {
        search: searchTerm,
        status: filterStatus,
        exp: filterExperience,
        sortBy: sortBy,
        order: sortOrder,
        page: currentPage,
        limit: counselorsPerPage,
      }

      console.log("Frontend: Sending API request with params:", params); // Log params before sending

      // Make the API request with the Authorization header
      const res = await axios.get("http://localhost:5000/api/counselors", {
        params,
        headers: {
          'Authorization': `Bearer ${token}` // Attach the JWT to the Authorization header
        }
      })

      // Update state with fetched data, ensuring defaults if response is unexpected
      setCounselors(res.data.data || []) // Ensure data is an array, default to empty array
      setTotalRows(res.data.total || 0) // Ensure total is a number, default to 0

      console.log("Frontend: API response received:", res.data); // Log the full response data
      console.log("Frontend: counselors state after update:", res.data.data); // See what's actually set to state
      console.log("Frontend: totalRows state after update:", res.data.total);

    } catch (err) {
      console.error("Failed to load counselor applications:", err)
      // Differentiate error messages based on status code
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          setError("Unauthorized access. Please log in with administrator privileges.");
        } else {
          setError(`Failed to load counselor applications: ${err.response.data?.message || err.message}. Please try again.`);
        }
      } else {
        setError("Failed to load counselor applications. Please check your network and try again.");
      }
    } finally {
      setLoading(false) // End loading
    }
  }

  // useEffect hook to trigger data fetching
  // This runs on component mount and whenever any of its dependencies change
  useEffect(() => {
    loadCounselors()
  }, [searchTerm, filterStatus, filterExperience, sortBy, sortOrder, currentPage])

  // Client-side sorting on the *currently displayed* counselors
  // This is applied after data is fetched. If your backend handles sorting completely,
  // you might just use `counselors` directly as `currentCounselors`.
  // The `|| []` ensures that `counselors` is always iterable.
  const sortedCounselors = [...(counselors || [])].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]

    if (sortBy === "created_at") {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // `currentCounselors` are the counselors to display on the current page, after client-side sorting (if any).
  const currentCounselors = sortedCounselors

  // Calculate total pages based on the total count from the backend
  const totalPages = Math.ceil(totalRows / counselorsPerPage)

  // Calculate indices for pagination display message
  const indexOfFirst = (currentPage - 1) * counselorsPerPage
  const indexOfLast = indexOfFirst + currentCounselors.length

  // Handlers for sorting columns
  const handleSort = (column) => {
    setCurrentPage(1) // Reset to first page when changing sort
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  // Handler for selecting individual counselors
  const handleSelectCounselor = (counselorId) => {
    setSelectedCounselors((prev) =>
      prev.includes(counselorId) ? prev.filter((id) => id !== counselorId) : [...prev, counselorId],
    )
  }

  // Handler for selecting/deselecting all counselors on the current page
  const handleSelectAll = () => {
    if (selectedCounselors.length === currentCounselors.length && currentCounselors.length > 0) {
      setSelectedCounselors([]) // Deselect all
    } else {
      setSelectedCounselors(currentCounselors.map((counselor) => counselor.id)) // Select all
    }
  }

  // Helper function to get the auth header for axios requests
  const getAuthHeader = () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      return { headers: { Authorization: `Bearer ${token}` } };
    }
    return {};
  };

  // Handler for approving a single counselor application
  const handleApprove = async (counselorId) => {
    if (window.confirm("Are you sure you want to approve this counselor application?")) {
      setLoading(true)
      try {
        await axios.patch(`http://localhost:5000/api/counselors/${counselorId}/approve`, {}, getAuthHeader()) // API call to approve with auth
        loadCounselors() // Re-fetch data to update UI
        setSelectedCounselors((prev) => prev.filter((id) => id !== counselorId)) // Deselect if approved
      } catch (err) {
        console.error("Failed to approve counselor:", err)
        setError("Failed to approve counselor. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  // Handler for rejecting a single counselor application
  const handleReject = async (counselorId) => {
    if (window.confirm("Are you sure you want to reject this counselor application?")) {
      setLoading(true)
      try {
        await axios.patch(`http://localhost:5000/api/counselors/${counselorId}/reject`, {}, getAuthHeader()) // API call to reject with auth
        loadCounselors() // Re-fetch data to update UI
        setSelectedCounselors((prev) => prev.filter((id) => id !== counselorId)) // Deselect if rejected
      } catch (err) {
        console.error("Failed to reject counselor:", err)
        setError("Failed to reject counselor. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  // Handler for bulk approving selected counselor applications
  const bulkApprove = async () => {
    if (window.confirm(`Are you sure you want to approve ${selectedCounselors.length} counselor applications?`)) {
      setLoading(true)
      try {
        await axios.patch("http://localhost:5000/api/counselors/bulk", { ids: selectedCounselors, action: 'approve' }, getAuthHeader()) // Bulk API call with auth
        loadCounselors() // Re-fetch data
        setSelectedCounselors([]) // Clear selections after bulk action
      } catch (err) {
        console.error("Failed to bulk approve counselors:", err)
        setError("Failed to bulk approve counselors. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  // Handler for bulk rejecting selected counselor applications
  const bulkReject = async () => {
    if (window.confirm(`Are you sure you want to reject ${selectedCounselors.length} counselor applications?`)) {
      setLoading(true)
      try {
        await axios.patch("http://localhost:5000/api/counselors/bulk", { ids: selectedCounselors, action: 'reject' }, getAuthHeader()) // Bulk API call with auth
        loadCounselors() // Re-fetch data
        setSelectedCounselors([]) // Clear selections after bulk action
      } catch (err) {
        console.error("Failed to bulk reject counselors:", err)
        setError("Failed to bulk reject counselors. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  // Helper function to get status icon (using text for simplicity here, replace with actual icons if desired)
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return "✓"
      case "rejected":
        return "✕"
      case "pending":
        return "⏳"
      default:
        return "?"
    }
  }

  // Handler to download resume
  const downloadResume = (resumeUrl, username) => {
    console.log(`Attempting to download resume for ${username}: ${resumeUrl}`)
    if (resumeUrl) {
      // It's generally better to let the backend handle the file serving with proper content-disposition
      // But for a direct URL to a public file, window.open works.
      window.open(resumeUrl, "_blank") // Open resume in a new tab
    } else {
      alert("Resume URL not available for this counselor.")
    }
  }

  // Conditional rendering for loading state
  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div> {/* Add your CSS for loading spinner */}
          <p>Loading counselor applications...</p>
        </div>
      </AdminLayout>
    )
  }

  // Conditional rendering for error state
  if (error) {
    return (
      <AdminLayout>
        <div className="error-container">
          <div className="error-message">
            <h3>Error Loading Counselor Applications</h3>
            <p>{error}</p>
            <div className="error-actions">
              <button className="retry-button" onClick={loadCounselors}>
                <RefreshCw size={16} />
                Retry
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  // Main component render
  return (
    <AdminLayout>
      <div className="admin-counselors">
        {/* Header Section */}
        <div className="page-header">
          <h1>Counselor Applications</h1>
          <div className="header-actions">
            <button className="action-button">
              <Download size={16} /> <span>Export</span>
            </button>
            <button className="action-button" onClick={loadCounselors}>
              <RefreshCw size={16} /> <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="search-filter">
            <Search size={18} />
            <input
              placeholder="Search counselors..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset page on search change
              }}
            />
          </div>

          <div className="filter-group">
            <div className="filter-select">
              <label>Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value)
                  setCurrentPage(1) // Reset page on filter change
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="filter-select">
              <label>Experience:</label>
              <select
                value={filterExperience}
                onChange={(e) => {
                  setFilterExperience(e.target.value)
                  setCurrentPage(1) // Reset page on filter change
                }}
              >
                <option value="all">All Experience</option>
                <option value="junior">Junior (< 3 years)</option>
                <option value="mid">Mid (3-7 years)</option>
                <option value="senior">Senior (> 7 years)</option>
              </select>
            </div>

            <button className="filter-button">
              <Filter size={16} /> <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Counselors Table */}
        <div className="counselors-table-container">
          <table className="counselors-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedCounselors.length > 0 && selectedCounselors.length === currentCounselors.length}
                    // Indeterminate state if some but not all are selected
                    // ref={el => el && (el.indeterminate = selectedCounselors.length > 0 && selectedCounselors.length < currentCounselors.length)}
                  />
                </th>
                <th onClick={() => handleSort("id")}>
                  ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("username")}>
                  Counselor {sortBy === "username" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("qualifications")}>
                  Qualifications {sortBy === "qualifications" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("experience_years")}>
                  Experience {sortBy === "experience_years" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("status")}>
                  Status {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("created_at")}>
                  Applied {sortBy === "created_at" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentCounselors.length > 0 ? (
                currentCounselors.map((counselor) => (
                  <tr key={counselor.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedCounselors.includes(counselor.id)}
                        onChange={() => handleSelectCounselor(counselor.id)}
                      />
                    </td>
                    <td>{counselor.id}</td>
                    <td>
                      <div className="counselor-info">
                        <div className="counselor-name">{counselor.username}</div>
                        <div className="counselor-email">{counselor.email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="qualifications-cell">
                        <span className="qualifications-text" title={counselor.qualifications}>
                          {counselor.qualifications.length > 50
                            ? `${counselor.qualifications.substring(0, 50)}...`
                            : counselor.qualifications}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="experience-badge">
                        <Clock size={14} /> {counselor.experience_years} years
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${counselor.status}`}>
                        {getStatusIcon(counselor.status)} {counselor.status}
                      </span>
                    </td>
                    <td>{new Date(counselor.created_at).toLocaleDateString()}</td>
                    <td className="actions-cell">
                      <button className="table-action view" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button
                        className="table-action download"
                        title="Download Resume"
                        onClick={() => downloadResume(counselor.resume_url, counselor.username)}
                      >
                        <FileText size={16} />
                      </button>
                      {counselor.status === "pending" && (
                        <>
                          <button
                            className="table-action approve"
                            title="Approve Application"
                            onClick={() => handleApprove(counselor.id)}
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            className="table-action reject"
                            title="Reject Application"
                            onClick={() => handleReject(counselor.id)}
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data-found">
                    No counselor applications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <div className="pagination-info">
            Showing {totalRows === 0 ? 0 : indexOfFirst + 1}‑{Math.min(indexOfLast, totalRows)} of {totalRows}{" "}
            applications
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Render pagination numbers, showing ellipses for large number of pages */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === totalPages ||
                  (p >= currentPage - 1 && p <= currentPage + 1) ||
                  (p === currentPage - 2 && currentPage > 2 && p !== 1) || // Show page before current - 1 if not 1
                  (p === currentPage + 2 && currentPage < totalPages - 1 && p !== totalPages) // Show page after current + 1 if not last
              )
              .map((p, i, arr) => (
                <React.Fragment key={p}>
                  {/* Add ellipsis if there's a gap in page numbers */}
                  {i > 0 && arr[i - 1] !== p - 1 && <span className="pagination-ellipsis">…</span>}
                  <button
                    className={`pagination-button ${currentPage === p ? "active" : ""}`}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                </React.Fragment>
              ))}

            <button
              className="pagination-button"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Bulk Actions Section */}
        {selectedCounselors.length > 0 && (
          <div className="bulk-actions">
            <span>{selectedCounselors.length} applications selected</span>
            <div className="bulk-buttons">
              <button className="bulk-button approve" onClick={bulkApprove}>
                Approve Selected
              </button>
              <button className="bulk-button reject" onClick={bulkReject}>
                Reject Selected
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminCounselors