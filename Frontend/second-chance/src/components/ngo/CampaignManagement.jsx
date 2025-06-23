"use client"

import { useState } from "react"
import "./css/CampaignManagement.css"
import NGOLayout from "./component/NGOLayout"

function CampaignManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const campaigns = [
    {
      id: 1,
      name: "Drug Free Campus",
      status: "active",
      startDate: "2023-05-01",
      endDate: "2023-06-30",
      location: "University District",
      target: "College Students",
      coordinator: "John Smith",
      progress: 45,
    },
    {
      id: 2,
      name: "Community Awareness Drive",
      status: "active",
      startDate: "2023-04-15",
      endDate: "2023-07-15",
      location: "Downtown Area",
      target: "General Public",
      coordinator: "Emily Johnson",
      progress: 60,
    },
    {
      id: 3,
      name: "Parent Education Program",
      status: "upcoming",
      startDate: "2023-06-01",
      endDate: "2023-08-30",
      location: "Community Centers",
      target: "Parents",
      coordinator: "Michael Brown",
      progress: 0,
    },
    {
      id: 4,
      name: "Youth Rehabilitation Workshop",
      status: "completed",
      startDate: "2023-02-15",
      endDate: "2023-04-15",
      location: "Youth Centers",
      target: "Teenagers",
      coordinator: "Sarah Wilson",
      progress: 100,
    },
    {
      id: 5,
      name: "School Prevention Program",
      status: "draft",
      startDate: "",
      endDate: "",
      location: "High Schools",
      target: "Students",
      coordinator: "David Lee",
      progress: 0,
    },
  ]

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesTab = activeTab === "all" || campaign.status === activeTab
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <NGOLayout>
      <div className="campaign-management">
        <div className="campaign-header">
          <h1>Campaign Management</h1>
          <button className="create-btn" onClick={() => setShowCreateModal(true)}>
            <i className="fas fa-plus"></i> Create New Campaign
          </button>
        </div>

        <div className="campaign-filters">
          <div className="campaign-tabs">
            <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
              All Campaigns
            </button>
            <button className={activeTab === "active" ? "active" : ""} onClick={() => setActiveTab("active")}>
              Active
            </button>
            <button className={activeTab === "upcoming" ? "active" : ""} onClick={() => setActiveTab("upcoming")}>
              Upcoming
            </button>
            <button className={activeTab === "completed" ? "active" : ""} onClick={() => setActiveTab("completed")}>
              Completed
            </button>
            <button className={activeTab === "draft" ? "active" : ""} onClick={() => setActiveTab("draft")}>
              Drafts
            </button>
          </div>
          <div className="campaign-search">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="campaign-list">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="campaign-card">
                <div className="campaign-card-header">
                  <h3>{campaign.name}</h3>
                  <span className={`status-badge ${campaign.status}`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </div>

                <div className="campaign-card-body">
                  <div className="campaign-info">
                    <div className="info-item">
                      <i className="fas fa-calendar-alt"></i>
                      <div>
                        <label>Duration</label>
                        <p>
                          {campaign.startDate
                            ? `${new Date(campaign.startDate).toLocaleDateString()} - ${new Date(campaign.endDate).toLocaleDateString()}`
                            : "Not scheduled"}
                        </p>
                      </div>
                    </div>

                    <div className="info-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <div>
                        <label>Location</label>
                        <p>{campaign.location}</p>
                      </div>
                    </div>

                    <div className="info-item">
                      <i className="fas fa-users"></i>
                      <div>
                        <label>Target Audience</label>
                        <p>{campaign.target}</p>
                      </div>
                    </div>

                    <div className="info-item">
                      <i className="fas fa-user"></i>
                      <div>
                        <label>Coordinator</label>
                        <p>{campaign.coordinator}</p>
                      </div>
                    </div>
                  </div>

                  {campaign.status !== "draft" && (
                    <div className="campaign-progress">
                      <div className="progress-label">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${campaign.progress}%`,
                            backgroundColor: getProgressColor(campaign.progress),
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="campaign-card-footer">
                  <button className="action-btn view-btn">
                    <i className="fas fa-eye"></i> View Details
                  </button>
                  <button className="action-btn edit-btn">
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  {campaign.status === "draft" && (
                    <button className="action-btn publish-btn">
                      <i className="fas fa-paper-plane"></i> Publish
                    </button>
                  )}
                  {campaign.status === "active" && (
                    <button className="action-btn reports-btn">
                      <i className="fas fa-chart-bar"></i> Reports
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-campaigns">
              <i className="fas fa-bullhorn"></i>
              <p>No campaigns found matching your criteria</p>
            </div>
          )}
        </div>

        {showCreateModal && (
          <div className="modal-overlay">
            <div className="create-campaign-modal">
              <div className="modal-header">
                <h2>Create New Campaign</h2>
                <button className="close-btn" onClick={() => setShowCreateModal(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Campaign Name</label>
                  <input type="text" placeholder="Enter campaign name" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="Enter location" />
                </div>
                <div className="form-group">
                  <label>Target Audience</label>
                  <input type="text" placeholder="Enter target audience" />
                </div>
                <div className="form-group">
                  <label>Coordinator</label>
                  <select>
                    <option value="">Select coordinator</option>
                    <option value="john">John Smith</option>
                    <option value="emily">Emily Johnson</option>
                    <option value="michael">Michael Brown</option>
                    <option value="sarah">Sarah Wilson</option>
                    <option value="david">David Lee</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea placeholder="Enter campaign description"></textarea>
                </div>
                <div className="form-group">
                  <label>Goals & Objectives</label>
                  <textarea placeholder="Enter campaign goals and objectives"></textarea>
                </div>
                <div className="form-group">
                  <label>Resources Needed</label>
                  <textarea placeholder="List resources needed for the campaign"></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button className="save-btn">Save as Draft</button>
                <button className="publish-btn">Create & Publish</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </NGOLayout>
  )
}

function getProgressColor(progress) {
  if (progress < 25) return "#FF5722"
  if (progress < 50) return "#FFC107"
  if (progress < 75) return "#2196F3"
  return "#4CAF50"
}

export default CampaignManagement
