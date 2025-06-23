"use client"

import { useState, useEffect } from "react"
import "./css/NgoDashboard.css"
import NGOLayout from "./component/NGOLayout"
import StatCard from "./component/StatCard"
import RecentActivity from "./component/RecentActivity"
import ContentOverview from "./component/ContentOverview"
import CampaignOverview from "./component/CampaignOverview"

function Dashboard() {
  const [stats, setStats] = useState({
    contentUploaded: 0,
    activeCampaigns: 0,
    peopleReached: 0,
    successStories: 0,
  })

  // Simulate fetching data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setStats({
        contentUploaded: 124,
        activeCampaigns: 8,
        peopleReached: 12450,
        successStories: 56,
      })
    }, 1000)
  }, [])

  return (
    <NGOLayout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>NGO Dashboard</h1>
          <div className="date-filter">
            <select defaultValue="month">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        <div className="stats-container">
          <StatCard
            title="Content Uploaded"
            value={stats.contentUploaded}
            icon="fas fa-file-alt"
            change="+12%"
            period="from last month"
          />
          <StatCard
            title="Active Campaigns"
            value={stats.activeCampaigns}
            icon="fas fa-bullhorn"
            change="+2"
            period="from last month"
          />
          <StatCard
            title="People Reached"
            value={stats.peopleReached.toLocaleString()}
            icon="fas fa-users"
            change="+24%"
            period="from last month"
          />
          <StatCard
            title="Success Stories"
            value={stats.successStories}
            icon="fas fa-heart"
            change="+8"
            period="from last month"
          />
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card campaign-overview">
            <div className="card-header">
              <h2>Campaign Overview</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <CampaignOverview />
          </div>

          <div className="dashboard-card content-overview">
            <div className="card-header">
              <h2>Content Overview</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <ContentOverview />
          </div>

          <div className="dashboard-card recent-activity">
            <div className="card-header">
              <h2>Recent Activity</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <RecentActivity />
          </div>

          <div className="dashboard-card impact-map">
            <div className="card-header">
              <h2>Impact Map</h2>
              <div className="map-controls">
                <button className="map-control active">All</button>
                <button className="map-control">Campaigns</button>
                <button className="map-control">Reports</button>
              </div>
            </div>
            <div className="map-container">
              <div className="map-placeholder">
                <i className="fas fa-map-marked-alt"></i>
                <p>Geographic distribution of your impact</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NGOLayout>
  )
}

export default Dashboard
