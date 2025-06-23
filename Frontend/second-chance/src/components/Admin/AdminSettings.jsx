"use client"

import { useState } from "react"
import { Settings, User, Bell, Shield, Database, Globe, Mail, FileText, Save, RefreshCw, HelpCircle } from 'lucide-react'
import AdminLayout from "./AdminLayout"
import "./css/AdminDashboard.css"

const AdminSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Kerala Drug Data Portal",
    siteDescription: "Official portal for drug usage and recovery data in Kerala",
    contactEmail: "admin@keraladrugsdata.gov.in",
    supportPhone: "+91 1234567890",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    reportAlerts: true,
    userRegistrations: true,
    systemUpdates: true,
    dailyDigest: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    ipRestriction: false,
  })

  const [dataSettings, setDataSettings] = useState({
    dataRetention: "365",
    autoBackup: true,
    backupFrequency: "daily",
    anonymizeData: true,
  })

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    })
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    })
  }

  const handleSecuritySettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setSecuritySettings({
      ...securitySettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleDataSettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setDataSettings({
      ...dataSettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save settings logic would go here
    alert("Settings saved successfully!")
  }

  return (
    <AdminLayout>
      <div className="admin-settings">
        <div className="page-header">
          <h1>System Settings</h1>
          <div className="header-actions">
            <button className="action-button primary" onClick={handleSubmit}>
              <Save size={16} />
              <span>Save All Settings</span>
            </button>
            <button className="action-button">
              <RefreshCw size={16} />
              <span>Reset to Default</span>
            </button>
            <button className="action-button">
              <HelpCircle size={16} />
              <span>Help</span>
            </button>
          </div>
        </div>

        <div className="settings-grid">
          <div className="settings-card">
            <h2>
              <Settings size={20} /> General Settings
            </h2>
            <form className="settings-form">
              <div className="form-group">
                <label htmlFor="siteName">Portal Name</label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralSettingsChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="siteDescription">Portal Description</label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralSettingsChange}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="contactEmail">Contact Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={generalSettings.contactEmail}
                  onChange={handleGeneralSettingsChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="supportPhone">Support Phone</label>
                <input
                  type="tel"
                  id="supportPhone"
                  name="supportPhone"
                  value={generalSettings.supportPhone}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
            </form>
          </div>

          <div className="settings-card">
            <h2>
              <Bell size={20} /> Notification Settings
            </h2>
            <form className="settings-form">
              <div className="form-group">
                <div className="toggle-setting">
                  <div>
                    <label htmlFor="emailNotifications">Email Notifications</label>
                    <p className="setting-description">Receive notifications via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div className="toggle-setting">
                  <div>
                    <label htmlFor="reportAlerts">Report Alerts</label>
                    <p className="setting-description">Get alerts for new reports</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="reportAlerts"
                      name="reportAlerts"
                      checked={notificationSettings.reportAlerts}
                      onChange={handleNotificationChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div className="toggle-setting">
                  <div>
                    <label htmlFor="userRegistrations">User Registrations</label>
                    <p className="setting-description">Get notified about new user registrations</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="userRegistrations"
                      name="userRegistrations"
                      checked={notificationSettings.userRegistrations}
                      onChange={handleNotificationChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div className="toggle-setting">
                  <div>
                    <label htmlFor="systemUpdates">System Updates</label>
                    <p className="setting-description">Get notified about system updates</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="systemUpdates"
                      name="systemUpdates"
                      checked={notificationSettings.systemUpdates}
                      onChange={handleNotificationChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div className="toggle-setting">
                  <div>
                    <label htmlFor="dailyDigest">Daily Digest</label>
                    <p className="setting-description">Receive a daily summary of activities</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="dailyDigest"
                      name="dailyDigest"
                      checked={notificationSettings.dailyDigest}
                      onChange={handleNotificationChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          <div className="settings-card">
            <h2>
              <Shield size={20} /> Security Settings
            </h2>
            <form className="settings-form">
              <div className="form-group">
                <div className="toggle-setting">
                  <div>
                    <label htmlFor="twoFactorAuth">Two-Factor Authentication</label>
                    <p className="setting-description">Require 2FA for admin accounts</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="twoFactorAuth"
                      name="twoFactorAuth"
                      checked={securitySettings.twoFactorAuth}
                      onChange={handleSecuritySettingsChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="sessionTimeout">Session Timeout (minutes)</label>
                <input
                  type="number"
                  id="sessionTimeout"
                  name="sessionTimeout"
                  value={securitySettings.sessionTimeout}
                  onChange={handleSecuritySettingsChange}
                  min="5"
                  max="120"
                />
              </div>

              <div className="form-group">
                <label htmlFor="passwordExpiry">Password Expiry (days)</label>
                <input
                  type="number"
                  id="passwordExpiry"
                  name="passwordExpiry"
                  value={securitySettings.passwordExpiry}
                  onChange={handleSecuritySettingsChange}
                  min="30"
                  max="365"
                />
              </div>

              <div className="form-group">
                <div className="toggle-setting">
                  <div>
                    <label htmlFor="ipRestriction">IP Restriction</label>
                    <p className="setting-description">Restrict admin access to specific IPs</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="ipRestriction"
                      name="ipRestriction"
                      checked={securitySettings.ipRestriction}
                      onChange={handleSecuritySettingsChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          <div className="settings-card">
            <h2>
              <Database size={20} /> Data Management
            </h2>
            <form className="settings-form">
              <div className="form-group">
                <label htmlFor="dataRetention">Data Retention Period (days)</label>
                <input
                  type="number"
                  id="dataRetention"
                  name="dataRetention"
                  value={dataSettings.dataRetention}
                  onChange={handleDataSettingsChange}
                  min="30"
                  max="3650"
                />
              </div>

              <div className="form-group">
                <div className="toggle-setting">
                  <div>
                    <label htmlFor="autoBackup">Automatic Backups</label>
                    <p className="setting-description">Enable scheduled database backups</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="autoBackup"
                      name="autoBackup"
                      checked={dataSettings.autoBackup}
                      onChange={handleDataSettingsChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="backupFrequency">Backup Frequency</label>
                <select
                  id="backupFrequency"
                  name="backupFrequency"
                  value={dataSettings.backupFrequency}
                  onChange={handleDataSettingsChange}
                  disabled={!dataSettings.autoBackup}
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="form-group">
                <div className="toggle-setting">
                  <div>
                    <label htmlFor="anonymizeData">Anonymize User Data</label>
                    <p className="setting-description">Automatically anonymize sensitive user data</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      id="anonymizeData"
                      name="anonymizeData"
                      checked={dataSettings.anonymizeData}
                      onChange={handleDataSettingsChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          <div className="settings-card">
            <h2>
              <Globe size={20} /> Regional Settings
            </h2>
            <form className="settings-form">
              <div className="form-group">
                <label htmlFor="language">Default Language</label>
                <select id="language" name="language">
                  <option value="en">English</option>
                  <option value="ml">Malayalam</option>
                  <option value="hi">Hindi</option>
                  <option value="ta">Tamil</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <select id="timezone" name="timezone">
                  <option value="IST">Indian Standard Time (IST)</option>
                  <option value="UTC">Coordinated Universal Time (UTC)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dateFormat">Date Format</label>
                <select id="dateFormat" name="dateFormat">
                  <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                  <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </form>
          </div>

          <div className="settings-card">
            <h2>
              <Mail size={20} /> Email Configuration
            </h2>
            <form className="settings-form">
              <div className="form-group">
                <label htmlFor="smtpServer">SMTP Server</label>
                <input type="text" id="smtpServer" name="smtpServer" value="smtp.keraladrugsdata.gov.in" />
              </div>

              <div className="form-group">
                <label htmlFor="smtpPort">SMTP Port</label>
                <input type="number" id="smtpPort" name="smtpPort" value="587" />
              </div>

              <div className="form-group">
                <label htmlFor="smtpUsername">SMTP Username</label>
                <input type="text" id="smtpUsername" name="smtpUsername" value="notifications@keraladrugsdata.gov.in" />
              </div>

              <div className="form-group">
                <label htmlFor="smtpPassword">SMTP Password</label>
                <input type="password" id="smtpPassword" name="smtpPassword" value="••••••••••••" />
              </div>

              <div className="form-actions">
                <button type="button" className="action-button">
                  Test Connection
                </button>
              </div>
            </form>
          </div>

          <div className="settings-card">
            <h2>
              <FileText size={20} /> System Logs
            </h2>
            <form className="settings-form">
              <div className="form-group">
                <label htmlFor="logLevel">Log Level</label>
                <select id="logLevel" name="logLevel">
                  <option value="error">Error</option>
                  <option value="warning">Warning</option>
                  <option value="info" selected>
                    Info
                  </option>
                  <option value="debug">Debug</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="logRetention">Log Retention (days)</label>
                <input type="number" id="logRetention" name="logRetention" value="30" min="1" max="365" />
              </div>

              <div className="form-actions">
                <button type="button" className="action-button">
                  View Logs
                </button>
                <button type="button" className="action-button">
                  Download Logs
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminSettings
