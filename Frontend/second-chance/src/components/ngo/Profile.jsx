"use client"

import { useState } from "react"
import "./css/Profile.css"
import NGOLayout from "./component/NGOLayout"

function Profile() {
  const [activeTab, setActiveTab] = useState("details")
  const [isEditing, setIsEditing] = useState(false)

  const ngoDetails = {
    name: "Hope Foundation",
    email: "contact@hopefoundation.org",
    phone: "+1 (555) 123-4567",
    website: "www.hopefoundation.org",
    address: "123 Main Street, Cityville, State, 12345",
    founded: "2005",
    mission: "To combat drug abuse through education, prevention, and rehabilitation programs.",
    vision: "A drug-free society where individuals lead healthy, productive lives.",
    description:
      "Hope Foundation is a non-profit organization dedicated to fighting drug abuse through comprehensive education, prevention, and rehabilitation programs. We work with communities, schools, and families to raise awareness about the dangers of drug abuse and provide support to those affected by addiction.",
    areas: ["Education", "Prevention", "Rehabilitation", "Community Outreach", "Research"],
    socialMedia: {
      facebook: "facebook.com/hopefoundation",
      twitter: "twitter.com/hopefoundation",
      instagram: "instagram.com/hopefoundation",
      linkedin: "linkedin.com/company/hopefoundation",
    },
  }

  return (
    <NGOLayout>
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-cover">
            <img src="/placeholder.svg?height=200&width=1000" alt="Cover" />
            <button className="edit-cover-btn">
              <i className="fas fa-camera"></i>
            </button>
          </div>

          <div className="profile-info">
            <div className="profile-avatar">
              <img src="/placeholder.svg?height=120&width=120" alt="NGO Logo" />
              <button className="edit-avatar-btn">
                <i className="fas fa-camera"></i>
              </button>
            </div>

            <div className="profile-details">
              <h1>{ngoDetails.name}</h1>
              <p className="profile-tagline">{ngoDetails.mission}</p>
              <div className="profile-meta">
                <span>
                  <i className="fas fa-map-marker-alt"></i> {ngoDetails.address}
                </span>
                <span>
                  <i className="fas fa-globe"></i> {ngoDetails.website}
                </span>
                <span>
                  <i className="fas fa-calendar-alt"></i> Founded in {ngoDetails.founded}
                </span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-tabs">
            <button className={activeTab === "details" ? "active" : ""} onClick={() => setActiveTab("details")}>
              NGO Details
            </button>
            <button className={activeTab === "team" ? "active" : ""} onClick={() => setActiveTab("team")}>
              Team Members
            </button>
            <button className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>
              Account Settings
            </button>
          </div>

          <div className="profile-tab-content">
            {activeTab === "details" && (
              <div className="ngo-details">
                <div className="details-section">
                  <h2>About Us</h2>
                  <p>{ngoDetails.description}</p>
                </div>

                <div className="details-section">
                  <h2>Mission & Vision</h2>
                  <div className="mission-vision">
                    <div className="mission">
                      <h3>
                        <i className="fas fa-bullseye"></i> Mission
                      </h3>
                      <p>{ngoDetails.mission}</p>
                    </div>
                    <div className="vision">
                      <h3>
                        <i className="fas fa-eye"></i> Vision
                      </h3>
                      <p>{ngoDetails.vision}</p>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h2>Areas of Focus</h2>
                  <div className="focus-areas">
                    {ngoDetails.areas.map((area, index) => (
                      <div key={index} className="focus-area">
                        <i className="fas fa-check-circle"></i> {area}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="details-section">
                  <h2>Contact Information</h2>
                  <div className="contact-info">
                    <div className="contact-item">
                      <i className="fas fa-envelope"></i>
                      <div>
                        <label>Email</label>
                        <p>{ngoDetails.email}</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-phone"></i>
                      <div>
                        <label>Phone</label>
                        <p>{ngoDetails.phone}</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <div>
                        <label>Address</label>
                        <p>{ngoDetails.address}</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-globe"></i>
                      <div>
                        <label>Website</label>
                        <p>{ngoDetails.website}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h2>Social Media</h2>
                  <div className="social-media">
                    <a href={`https://${ngoDetails.socialMedia.facebook}`} className="social-link facebook">
                      <i className="fab fa-facebook-f"></i> Facebook
                    </a>
                    <a href={`https://${ngoDetails.socialMedia.twitter}`} className="social-link twitter">
                      <i className="fab fa-twitter"></i> Twitter
                    </a>
                    <a href={`https://${ngoDetails.socialMedia.instagram}`} className="social-link instagram">
                      <i className="fab fa-instagram"></i> Instagram
                    </a>
                    <a href={`https://${ngoDetails.socialMedia.linkedin}`} className="social-link linkedin">
                      <i className="fab fa-linkedin-in"></i> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div className="team-members">
                <div className="team-header">
                  <h2>Team Members</h2>
                  <button className="add-member-btn">
                    <i className="fas fa-plus"></i> Add Member
                  </button>
                </div>

                <div className="team-list">
                  <div className="team-member">
                    <img src="/placeholder.svg?height=80&width=80" alt="Team Member" />
                    <div className="member-info">
                      <h3>Dr. Sarah Johnson</h3>
                      <p className="member-role">Executive Director</p>
                      <p className="member-bio">
                        Dr. Johnson has over 15 years of experience in addiction counseling and rehabilitation programs.
                      </p>
                      <div className="member-contact">
                        <a href="mailto:sarah@hopefoundation.org">
                          <i className="fas fa-envelope"></i>
                        </a>
                        <a href="tel:+15551234567">
                          <i className="fas fa-phone"></i>
                        </a>
                      </div>
                    </div>
                    <div className="member-actions">
                      <button className="edit-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="delete-btn">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>

                  <div className="team-member">
                    <img src="/placeholder.svg?height=80&width=80" alt="Team Member" />
                    <div className="member-info">
                      <h3>John Smith</h3>
                      <p className="member-role">Program Coordinator</p>
                      <p className="member-bio">
                        John specializes in developing and implementing prevention programs for schools and communities.
                      </p>
                      <div className="member-contact">
                        <a href="mailto:john@hopefoundation.org">
                          <i className="fas fa-envelope"></i>
                        </a>
                        <a href="tel:+15551234568">
                          <i className="fas fa-phone"></i>
                        </a>
                      </div>
                    </div>
                    <div className="member-actions">
                      <button className="edit-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="delete-btn">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>

                  <div className="team-member">
                    <img src="/placeholder.svg?height=80&width=80" alt="Team Member" />
                    <div className="member-info">
                      <h3>Emily Wilson</h3>
                      <p className="member-role">Outreach Specialist</p>
                      <p className="member-bio">
                        Emily leads our community outreach efforts and manages relationships with partner organizations.
                      </p>
                      <div className="member-contact">
                        <a href="mailto:emily@hopefoundation.org">
                          <i className="fas fa-envelope"></i>
                        </a>
                        <a href="tel:+15551234569">
                          <i className="fas fa-phone"></i>
                        </a>
                      </div>
                    </div>
                    <div className="member-actions">
                      <button className="edit-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="delete-btn">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="account-settings">
                <div className="settings-section">
                  <h2>Account Information</h2>
                  <div className="settings-form">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" value={ngoDetails.email} readOnly />
                      <button className="change-btn">Change</button>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" value="********" readOnly />
                      <button className="change-btn">Change</button>
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <h2>Notifications</h2>
                  <div className="notification-settings">
                    <div className="notification-option">
                      <div>
                        <h3>Email Notifications</h3>
                        <p>Receive email notifications for important updates</p>
                      </div>
                      <label className="toggle">
                        <input type="checkbox" checked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="notification-option">
                      <div>
                        <h3>Campaign Updates</h3>
                        <p>Receive notifications about campaign activities</p>
                      </div>
                      <label className="toggle">
                        <input type="checkbox" checked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="notification-option">
                      <div>
                        <h3>Content Approvals</h3>
                        <p>Receive notifications when content needs approval</p>
                      </div>
                      <label className="toggle">
                        <input type="checkbox" checked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="notification-option">
                      <div>
                        <h3>System Announcements</h3>
                        <p>Receive notifications about system updates</p>
                      </div>
                      <label className="toggle">
                        <input type="checkbox" />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <h2>Privacy & Security</h2>
                  <div className="privacy-settings">
                    <div className="privacy-option">
                      <div>
                        <h3>Two-Factor Authentication</h3>
                        <p>Add an extra layer of security to your account</p>
                      </div>
                      <button className="enable-btn">Enable</button>
                    </div>

                    <div className="privacy-option">
                      <div>
                        <h3>Public Profile Visibility</h3>
                        <p>Control who can see your organization's profile</p>
                      </div>
                      <select>
                        <option value="public">Public</option>
                        <option value="registered">Registered Users Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="settings-section danger-zone">
                  <h2>Danger Zone</h2>
                  <div className="danger-options">
                    <div className="danger-option">
                      <div>
                        <h3>Deactivate Account</h3>
                        <p>Temporarily disable your account</p>
                      </div>
                      <button className="deactivate-btn">Deactivate</button>
                    </div>

                    <div className="danger-option">
                      <div>
                        <h3>Delete Account</h3>
                        <p>Permanently delete your account and all data</p>
                      </div>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="modal-overlay">
            <div className="edit-profile-modal">
              <div className="modal-header">
                <h2>Edit NGO Profile</h2>
                <button className="close-btn" onClick={() => setIsEditing(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>NGO Name</label>
                  <input type="text" defaultValue={ngoDetails.name} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={ngoDetails.email} />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" defaultValue={ngoDetails.phone} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input type="url" defaultValue={ngoDetails.website} />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" defaultValue={ngoDetails.address} />
                </div>
                <div className="form-group">
                  <label>Year Founded</label>
                  <input type="text" defaultValue={ngoDetails.founded} />
                </div>
                <div className="form-group">
                  <label>Mission</label>
                  <textarea defaultValue={ngoDetails.mission}></textarea>
                </div>
                <div className="form-group">
                  <label>Vision</label>
                  <textarea defaultValue={ngoDetails.vision}></textarea>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea defaultValue={ngoDetails.description}></textarea>
                </div>
                <div className="form-group">
                  <label>Areas of Focus</label>
                  <input type="text" defaultValue={ngoDetails.areas.join(", ")} />
                  <small>Separate areas with commas</small>
                </div>
                <div className="form-group">
                  <label>Social Media</label>
                  <div className="social-inputs">
                    <div className="social-input">
                      <i className="fab fa-facebook-f"></i>
                      <input type="text" defaultValue={ngoDetails.socialMedia.facebook} />
                    </div>
                    <div className="social-input">
                      <i className="fab fa-twitter"></i>
                      <input type="text" defaultValue={ngoDetails.socialMedia.twitter} />
                    </div>
                    <div className="social-input">
                      <i className="fab fa-instagram"></i>
                      <input type="text" defaultValue={ngoDetails.socialMedia.instagram} />
                    </div>
                    <div className="social-input">
                      <i className="fab fa-linkedin-in"></i>
                      <input type="text" defaultValue={ngoDetails.socialMedia.linkedin} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button className="save-btn" onClick={() => setIsEditing(false)}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </NGOLayout>
  )
}

export default Profile
