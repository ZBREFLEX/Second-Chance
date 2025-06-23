"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Plus,
  FileText,
  ImageIcon,
  Video,
  LinkIcon,
  Download,
  Upload,
  RefreshCw,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  BarChart2,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import AdminLayout from "./AdminLayout"
import "./css/AdminDashboard.css"

const AdminContent = () => {
  const [selectedContent, setSelectedContent] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [currentContent, setCurrentContent] = useState(null)
  const [bulkAction, setBulkAction] = useState("")

  // Sample content data
  const contentData = [
    {
      id: "C-1001",
      title: "Understanding Drug Addiction",
      type: "Article",
      category: "Education",
      status: "Published",
      date: "2023-05-15",
      author: "Admin",
      views: 1245,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description:
        "Comprehensive guide to understanding the science behind drug addiction and its effects on the brain.",
    },
    {
      id: "C-1002",
      title: "Signs of Drug Abuse",
      type: "Article",
      category: "Awareness",
      status: "Published",
      date: "2023-05-14",
      author: "Admin",
      views: 987,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Learn to recognize the early warning signs of drug abuse in loved ones.",
    },
    {
      id: "C-1003",
      title: "Recovery Success Stories",
      type: "Video",
      category: "Inspiration",
      status: "Published",
      date: "2023-05-13",
      author: "Admin",
      views: 1567,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Real stories from individuals who successfully overcame drug addiction.",
    },
    {
      id: "C-1004",
      title: "Drug Prevention Strategies",
      type: "Article",
      category: "Education",
      status: "Draft",
      date: "2023-05-12",
      author: "Admin",
      views: 0,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Effective strategies for preventing drug abuse in communities and schools.",
    },
    {
      id: "C-1005",
      title: "Rehabilitation Centers in Kerala",
      type: "Resource",
      category: "Support",
      status: "Published",
      date: "2023-05-11",
      author: "Admin",
      views: 876,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Directory of rehabilitation centers across Kerala with contact information and services offered.",
    },
    {
      id: "C-1006",
      title: "Effects of Substance Abuse",
      type: "Infographic",
      category: "Education",
      status: "Published",
      date: "2023-05-10",
      author: "Admin",
      views: 1432,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Visual representation of how different substances affect the human body and mind.",
    },
    {
      id: "C-1007",
      title: "How to Help a Loved One",
      type: "Article",
      category: "Support",
      status: "Published",
      date: "2023-05-09",
      author: "Admin",
      views: 1123,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Guide for family members on how to support someone struggling with addiction.",
    },
    {
      id: "C-1008",
      title: "Drug Awareness Campaign",
      type: "Video",
      category: "Awareness",
      status: "Published",
      date: "2023-05-08",
      author: "Admin",
      views: 2345,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Highlights from the recent drug awareness campaign conducted across Kerala.",
    },
    {
      id: "C-1009",
      title: "Legal Consequences of Drug Offenses",
      type: "Article",
      category: "Legal",
      status: "Draft",
      date: "2023-05-07",
      author: "Admin",
      views: 0,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Overview of legal penalties and consequences for drug-related offenses in Kerala.",
    },
    {
      id: "C-1010",
      title: "Substance Abuse Prevention in Schools",
      type: "Resource",
      category: "Education",
      status: "Published",
      date: "2023-05-06",
      author: "Admin",
      views: 765,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Resources and programs for implementing drug prevention education in schools.",
    },
    {
      id: "C-1011",
      title: "Drug Trends in Kerala",
      type: "Infographic",
      category: "Statistics",
      status: "Published",
      date: "2023-05-05",
      author: "Admin",
      views: 1876,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Statistical analysis of current drug usage trends across different districts in Kerala.",
    },
    {
      id: "C-1012",
      title: "Recovery Journey",
      type: "Video",
      category: "Inspiration",
      status: "Published",
      date: "2023-05-04",
      author: "Admin",
      views: 2134,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Documentary following the recovery journey of former addicts.",
    },
    {
      id: "C-1013",
      title: "Mental Health and Addiction",
      type: "Article",
      category: "Education",
      status: "Review",
      date: "2023-05-03",
      author: "Admin",
      views: 0,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Exploring the connection between mental health disorders and substance abuse.",
    },
    {
      id: "C-1014",
      title: "Family Support Groups",
      type: "Resource",
      category: "Support",
      status: "Published",
      date: "2023-05-02",
      author: "Admin",
      views: 543,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Directory of support groups for families affected by addiction.",
    },
    {
      id: "C-1015",
      title: "Substance Abuse Statistics",
      type: "Infographic",
      category: "Statistics",
      status: "Published",
      date: "2023-05-01",
      author: "Admin",
      views: 1654,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Comprehensive statistics on substance abuse in Kerala over the past decade.",
    },
    {
      id: "C-1016",
      title: "Addiction Treatment Options",
      type: "Article",
      category: "Support",
      status: "Published",
      date: "2023-04-30",
      author: "Admin",
      views: 876,
      thumbnail: "/placeholder.svg?height=200&width=300",
      description: "Overview of different treatment approaches for substance use disorders.",
    },
  ]

  // Content categories and types for filters
  const categories = ["Education", "Awareness", "Support", "Inspiration", "Legal", "Statistics"]
  const types = ["Article", "Video", "Resource", "Infographic"]
  const statuses = ["Published", "Draft", "Review", "Archived"]

  // Filter and sort content
  const filteredContent = contentData
    .filter((content) => {
      const matchesSearch =
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = filterType === "all" || content.type === filterType
      const matchesCategory = filterCategory === "all" || content.category === filterCategory
      const matchesStatus = filterStatus === "all" || content.status === filterStatus

      return matchesSearch && matchesType && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "views" || sortBy === "date") {
        // For numeric or date values
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1
        }
      } else {
        // For string values
        if (sortOrder === "asc") {
          return a[sortBy].localeCompare(b[sortBy])
        } else {
          return b[sortBy].localeCompare(a[sortBy])
        }
      }
    })

  // Pagination
  const contentPerPage = viewMode === "grid" ? 8 : 10
  const totalPages = Math.ceil(filteredContent.length / contentPerPage)
  const indexOfLastContent = currentPage * contentPerPage
  const indexOfFirstContent = indexOfLastContent - contentPerPage
  const currentPageContent = filteredContent.slice(indexOfFirstContent, indexOfLastContent)

  // Handle checkbox selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedContent(currentPageContent.map((content) => content.id))
    } else {
      setSelectedContent([])
    }
  }

  const handleSelectContent = (contentId) => {
    if (selectedContent.includes(contentId)) {
      setSelectedContent(selectedContent.filter((id) => id !== contentId))
    } else {
      setSelectedContent([...selectedContent, contentId])
    }
  }

  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Handle bulk actions
  const handleBulkAction = () => {
    if (!bulkAction || selectedContent.length === 0) return

    // Implement bulk action logic here
    console.log(`Performing ${bulkAction} on:`, selectedContent)

    // Reset selection after action
    setSelectedContent([])
    setBulkAction("")
  }

  // Handle content actions
  const handleViewContent = (content) => {
    setCurrentContent(content)
    setShowPreviewModal(true)
  }

  const handleEditContent = (content) => {
    setCurrentContent(content)
    setShowEditModal(true)
  }

  const handleDeleteContent = (content) => {
    setCurrentContent(content)
    setShowDeleteModal(true)
  }

  // Get content type icon
  const getContentTypeIcon = (type) => {
    switch (type) {
      case "Article":
        return <FileText size={16} />
      case "Video":
        return <Video size={16} />
      case "Resource":
        return <LinkIcon size={16} />
      case "Infographic":
        return <ImageIcon size={16} />
      default:
        return <FileText size={16} />
    }
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return (
          <span className="status-badge published">
            <CheckCircle size={12} /> Published
          </span>
        )
      case "Draft":
        return (
          <span className="status-badge draft">
            <AlertCircle size={12} /> Draft
          </span>
        )
      case "Review":
        return (
          <span className="status-badge review">
            <Eye size={12} /> In Review
          </span>
        )
      case "Archived":
        return (
          <span className="status-badge archived">
            <XCircle size={12} /> Archived
          </span>
        )
      default:
        return <span className="status-badge">{status}</span>
    }
  }

  return (
    <AdminLayout>
      <div className="admin-content-page">
        <div className="page-header">
          <h1>Content Management</h1>
          <div className="header-actions">
            <button className="action-button primary" onClick={() => setShowAddModal(true)}>
              <Plus size={16} />
              <span>Add Content</span>
            </button>
            <button className="action-button">
              <Upload size={16} />
              <span>Import</span>
            </button>
            <button className="action-button">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button className="action-button">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="content-summary">
          <div className="summary-card">
            <h3>Total Content</h3>
            <p className="summary-value">{contentData.length}</p>
          </div>
          <div className="summary-card">
            <h3>Published</h3>
            <p className="summary-value">{contentData.filter((c) => c.status === "Published").length}</p>
          </div>
          <div className="summary-card">
            <h3>Drafts</h3>
            <p className="summary-value">{contentData.filter((c) => c.status === "Draft").length}</p>
          </div>
          <div className="summary-card">
            <h3>In Review</h3>
            <p className="summary-value">{contentData.filter((c) => c.status === "Review").length}</p>
          </div>
        </div>

        <div className="filters-bar">
          <div className="search-filter">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <div className="filter-select">
              <label>Type:</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-select">
              <label>Category:</label>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-select">
              <label>Status:</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <button className="filter-button">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {selectedContent.length > 0 && (
          <div className="bulk-actions">
            <p>{selectedContent.length} items selected</p>
            <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)}>
              <option value="">Bulk Actions</option>
              <option value="publish">Publish</option>
              <option value="draft">Move to Draft</option>
              <option value="archive">Archive</option>
              <option value="delete">Delete</option>
            </select>
            <button className="action-button" onClick={handleBulkAction} disabled={!bulkAction}>
              Apply
            </button>
            <button className="action-button" onClick={() => setSelectedContent([])}>
              Clear Selection
            </button>
          </div>
        )}

        <div className="view-toggle">
          <button className={`view-button ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>
            <Grid size={16} />
            <span>Grid View</span>
          </button>
          <button className={`view-button ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>
            <List size={16} />
            <span>List View</span>
          </button>
        </div>

        {viewMode === "grid" ? (
          <div className="content-grid">
            {currentPageContent.map((content) => (
              <div key={content.id} className="content-card">
                <div className="content-card-header">
                  <input
                    type="checkbox"
                    checked={selectedContent.includes(content.id)}
                    onChange={() => handleSelectContent(content.id)}
                  />
                  <div className="content-actions">
                    <button onClick={() => handleViewContent(content)}>
                      <Eye size={16} />
                    </button>
                    <button onClick={() => handleEditContent(content)}>
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDeleteContent(content)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="content-thumbnail">
                  <img src={content.thumbnail || "/placeholder.svg"} alt={content.title} />
                  <div className="content-type-badge">
                    {getContentTypeIcon(content.type)}
                    <span>{content.type}</span>
                  </div>
                </div>
                <div className="content-info">
                  <h3>{content.title}</h3>
                  <p className="content-description">{content.description.substring(0, 80)}...</p>
                  <div className="content-meta">
                    <span className="content-category">{content.category}</span>
                    {getStatusBadge(content.status)}
                  </div>
                  <div className="content-footer">
                    <div className="content-stats">
                      <span>
                        <Calendar size={14} /> {content.date}
                      </span>
                      <span>
                        <User size={14} /> {content.author}
                      </span>
                      <span>
                        <BarChart2 size={14} /> {content.views} views
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="content-table-container">
            <table className="content-table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={currentPageContent.length > 0 && selectedContent.length === currentPageContent.length}
                    />
                  </th>
                  <th className="id-column" onClick={() => handleSort("id")}>
                    ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("title")}>
                    Title {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("type")}>
                    Type {sortBy === "type" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("category")}>
                    Category {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("status")}>
                    Status {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("date")}>
                    Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("author")}>
                    Author {sortBy === "author" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("views")}>
                    Views {sortBy === "views" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageContent.map((content) => (
                  <tr key={content.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedContent.includes(content.id)}
                        onChange={() => handleSelectContent(content.id)}
                      />
                    </td>
                    <td>{content.id}</td>
                    <td className="title-cell">
                      <div className="content-title-with-thumbnail">
                        <img
                          src={content.thumbnail || "/placeholder.svg"}
                          alt={content.title}
                          className="mini-thumbnail"
                        />
                        <span>{content.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="content-type">
                        {getContentTypeIcon(content.type)}
                        <span>{content.type}</span>
                      </div>
                    </td>
                    <td>{content.category}</td>
                    <td>{getStatusBadge(content.status)}</td>
                    <td>{content.date}</td>
                    <td>{content.author}</td>
                    <td>{content.views}</td>
                    <td>
                      <div className="table-actions">
                        <button onClick={() => handleViewContent(content)} title="View">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => handleEditContent(content)} title="Edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeleteContent(content)} title="Delete">
                          <Trash2 size={16} />
                        </button>
                        <button title="More">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="pagination-pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-page ${currentPage === page ? "active" : ""}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Add Content Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h2>Add New Content</h2>
                <button className="close-button" onClick={() => setShowAddModal(false)}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" placeholder="Enter content title" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Type</label>
                    <select>
                      {types.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea placeholder="Enter content description" rows={3}></textarea>
                </div>

                <div className="form-group">
                  <label>Content</label>
                  <textarea placeholder="Enter content body" rows={6}></textarea>
                </div>

                <div className="form-group">
                  <label>Thumbnail</label>
                  <div className="file-upload">
                    <input type="file" id="thumbnail-upload" />
                    <label htmlFor="thumbnail-upload" className="file-upload-button">
                      <Upload size={16} />
                      <span>Choose File</span>
                    </label>
                    <span className="file-name">No file chosen</span>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Author</label>
                    <input type="text" placeholder="Enter author name" defaultValue="Admin" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Tags</label>
                  <input type="text" placeholder="Enter tags separated by commas" />
                </div>
              </div>
              <div className="modal-footer">
                <button className="action-button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className="action-button primary">Add Content</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Content Modal */}
        {showEditModal && currentContent && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h2>Edit Content</h2>
                <button className="close-button" onClick={() => setShowEditModal(false)}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" defaultValue={currentContent.title} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Type</label>
                    <select defaultValue={currentContent.type}>
                      {types.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select defaultValue={currentContent.category}>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea defaultValue={currentContent.description} rows={3}></textarea>
                </div>

                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    placeholder="Enter content body"
                    rows={6}
                    defaultValue="Sample content body text..."
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Thumbnail</label>
                  <div className="current-thumbnail">
                    <img src={currentContent.thumbnail || "/placeholder.svg"} alt={currentContent.title} />
                  </div>
                  <div className="file-upload">
                    <input type="file" id="thumbnail-upload-edit" />
                    <label htmlFor="thumbnail-upload-edit" className="file-upload-button">
                      <Upload size={16} />
                      <span>Change Thumbnail</span>
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select defaultValue={currentContent.status}>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Author</label>
                    <input type="text" defaultValue={currentContent.author} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Tags</label>
                  <input
                    type="text"
                    placeholder="Enter tags separated by commas"
                    defaultValue="drug, addiction, recovery"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="action-button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button className="action-button primary">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && currentContent && (
          <div className="modal-overlay">
            <div className="modal-container delete-modal">
              <div className="modal-header">
                <h2>Delete Content</h2>
                <button className="close-button" onClick={() => setShowDeleteModal(false)}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="delete-warning">
                  <AlertCircle size={48} />
                  <p>Are you sure you want to delete the following content?</p>
                  <h3>{currentContent.title}</h3>
                  <p className="warning-text">
                    This action cannot be undone. All data associated with this content will be permanently removed.
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button className="action-button" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="action-button delete">Delete Permanently</button>
              </div>
            </div>
          </div>
        )}

        {/* Content Preview Modal */}
        {showPreviewModal && currentContent && (
          <div className="modal-overlay">
            <div className="modal-container preview-modal">
              <div className="modal-header">
                <h2>Content Preview</h2>
                <button className="close-button" onClick={() => setShowPreviewModal(false)}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="content-preview">
                  <div className="preview-header">
                    <h1>{currentContent.title}</h1>
                    <div className="preview-meta">
                      <span>
                        <User size={14} /> {currentContent.author}
                      </span>
                      <span>
                        <Calendar size={14} /> {currentContent.date}
                      </span>
                      <span>{getStatusBadge(currentContent.status)}</span>
                    </div>
                  </div>

                  <div className="preview-thumbnail">
                    <img src={currentContent.thumbnail || "/placeholder.svg"} alt={currentContent.title} />
                  </div>

                  <div className="preview-content">
                    <p className="preview-description">{currentContent.description}</p>

                    <div className="preview-body">
                      <p>
                        This is a preview of the content body. In a real implementation, this would show the actual
                        content of the article, video, or resource.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                        tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget
                        ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                      </p>
                      <p>
                        Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl
                        eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies
                        nisl nisl eget nisl.
                      </p>
                    </div>
                  </div>

                  <div className="preview-stats">
                    <div className="stat-item">
                      <BarChart2 size={16} />
                      <span>{currentContent.views} Views</span>
                    </div>
                    <div className="stat-item">
                      <span>Category: {currentContent.category}</span>
                    </div>
                    <div className="stat-item">
                      <span>Type: {currentContent.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="action-button" onClick={() => setShowPreviewModal(false)}>
                  Close
                </button>
                <button
                  className="action-button primary"
                  onClick={() => {
                    setShowPreviewModal(false)
                    setShowEditModal(true)
                  }}
                >
                  Edit Content
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminContent
