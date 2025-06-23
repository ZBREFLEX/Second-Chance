"use client"

import { useState } from "react"
import "./css/ContentManagement.css"
import NGOLayout from "./component/NGOLayout"

function ContentManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)

  const contentItems = [
    {
      id: 1,
      title: "Understanding Addiction: A Guide for Parents",
      type: "article",
      status: "published",
      date: "2023-05-15",
      views: 1245,
      author: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      title: "Recovery Stories: Path to Sobriety",
      type: "video",
      status: "published",
      date: "2023-05-10",
      views: 3456,
      author: "Recovery Team",
    },
    {
      id: 3,
      title: "Warning Signs of Drug Abuse",
      type: "infographic",
      status: "published",
      date: "2023-05-05",
      views: 2789,
      author: "Prevention Dept.",
    },
    {
      id: 4,
      title: "Talking to Your Teen About Drugs",
      type: "article",
      status: "draft",
      date: "2023-05-18",
      views: 0,
      author: "Dr. Sarah Johnson",
    },
    {
      id: 5,
      title: "Community Support Systems",
      type: "resource",
      status: "review",
      date: "2023-05-12",
      views: 0,
      author: "Community Outreach",
    },
  ]

  const filteredContent = contentItems.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <NGOLayout>
      <div className="content-management">
        <div className="content-header">
          <h1>Content Management</h1>
          <button className="upload-btn" onClick={() => setShowUploadModal(true)}>
            <i className="fas fa-plus"></i> Upload New Content
          </button>
        </div>

        <div className="content-filters">
          <div className="content-tabs">
            <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
              All Content
            </button>
            <button className={activeTab === "article" ? "active" : ""} onClick={() => setActiveTab("article")}>
              Articles
            </button>
            <button className={activeTab === "video" ? "active" : ""} onClick={() => setActiveTab("video")}>
              Videos
            </button>
            <button className={activeTab === "infographic" ? "active" : ""} onClick={() => setActiveTab("infographic")}>
              Infographics
            </button>
            <button className={activeTab === "resource" ? "active" : ""} onClick={() => setActiveTab("resource")}>
              Resources
            </button>
          </div>
          <div className="content-search">
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="content-list">
          <div className="content-list-header">
            <div className="content-title-header">Title</div>
            <div className="content-type-header">Type</div>
            <div className="content-status-header">Status</div>
            <div className="content-date-header">Date</div>
            <div className="content-views-header">Views</div>
            <div className="content-author-header">Author</div>
            <div className="content-actions-header">Actions</div>
          </div>

          {filteredContent.length > 0 ? (
            filteredContent.map((item) => (
              <div key={item.id} className="content-item">
                <div className="content-title">{item.title}</div>
                <div className="content-type">
                  <span className={`type-badge ${item.type}`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
                <div className="content-status">
                  <span className={`status-badge ${item.status}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                <div className="content-date">{new Date(item.date).toLocaleDateString()}</div>
                <div className="content-views">{item.views.toLocaleString()}</div>
                <div className="content-author">{item.author}</div>
                <div className="content-actions">
                  <button className="action-btn edit-btn" title="Edit">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="action-btn view-btn" title="View">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="action-btn delete-btn" title="Delete">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-content">
              <i className="fas fa-search"></i>
              <p>No content found matching your criteria</p>
            </div>
          )}
        </div>

        {showUploadModal && (
          <div className="modal-overlay">
            <div className="upload-modal">
              <div className="modal-header">
                <h2>Upload New Content</h2>
                <button className="close-btn" onClick={() => setShowUploadModal(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Content Title</label>
                  <input type="text" placeholder="Enter title" />
                </div>
                <div className="form-group">
                  <label>Content Type</label>
                  <select>
                    <option value="">Select type</option>
                    <option value="article">Article</option>
                    <option value="video">Video</option>
                    <option value="infographic">Infographic</option>
                    <option value="resource">Resource</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Content Description</label>
                  <textarea placeholder="Enter description"></textarea>
                </div>
                <div className="form-group">
                  <label>Upload File</label>
                  <div className="file-upload">
                    <input type="file" id="content-file" />
                    <label htmlFor="content-file">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <span>Choose a file or drag it here</span>
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Tags</label>
                  <input type="text" placeholder="Enter tags separated by commas" />
                </div>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </button>
                <button className="save-btn">Save as Draft</button>
                <button className="publish-btn">Publish</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </NGOLayout>
  )
}

export default ContentManagement
