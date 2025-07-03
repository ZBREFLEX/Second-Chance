"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Award,
  TrendingUp,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "react-feather";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import CheckInModal from "../components/CheckInModal";
import JournalEntryModal from "../components/JournalEntryModal";
import "../styles/RecoveryTracking.css";

const RecoveryTracking = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [recoveryData, setRecoveryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    stats: true,
    chart: true,
    milestones: false,
    journal: false,
    checkins: false,
  });
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      setError("User ID not found");
      setIsLoading(false);
      return;
    }

    axios
      .get(`/api/recovery/${userId}`)
      .then((res) => {
        setRecoveryData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recovery data", err);
        setIsLoading(false);
        setError("Failed to load data");
      });
  }, [userId]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderSectionHeader = (title, section) => (
    <div className="section-header" onClick={() => toggleSection(section)}>
      <h3>{title}</h3>
      <button className="toggle-btn">
        {expandedSections[section] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>
  );

  const handleCheckInSubmit = async (checkInData) => {
  try {
    await axios.post(`/api/recovery/${userId}/checkin`, checkInData);
    alert("Check-in saved successfully!");
    window.location.reload();
  } catch (err) {
    console.error("Check-in error:", err);
  }
};
  const handleJournalSubmit = (journalData) => {
    const newEntry = {
      id: (recoveryData.journalEntries?.length || 0) + 1,
      date: new Date().toISOString().split("T")[0],
      mood: journalData.mood,
      triggers: journalData.triggers || "None",
      notes: journalData.content,
    };

    const updatedEntries = [newEntry, ...(recoveryData.journalEntries || [])];

    setRecoveryData({
      ...recoveryData,
      journalEntries: updatedEntries,
    });

    alert("Journal entry saved successfully!");
  };

  const renderOverview = () => {
    if (isLoading) return <div className="loading">Loading recovery data...</div>;
    if (!recoveryData) return <div className="error">Recovery data unavailable.</div>;

    return (
      <div className="recovery-overview">
        {/* Stats */}
        <div className="recovery-section">
          {renderSectionHeader("Recovery Statistics", "stats")}
          {expandedSections.stats && (
            <div className="recovery-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <Calendar size={20} />
                </div>
                <div className="stat-content">
                  <h3>Days in Recovery</h3>
                  <span className="stat-value">{recoveryData.daysInRecovery ?? 0}</span>
                  <p className="stat-detail">
                    Since {new Date(recoveryData.sobrietyDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <Award size={20} />
                </div>
                <div className="stat-content">
                  <h3>Milestones</h3>
                  <span className="stat-value">
                    {recoveryData.milestones?.filter((m) => m.achieved).length ?? 0}/
                    {recoveryData.milestones?.length ?? 0}
                  </span>
                  <p className="stat-detail">
                    Next:{" "}
                    {recoveryData.milestones?.find((m) => !m.achieved)?.title || "All achieved!"}
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <Clock size={20} />
                </div>
                <div className="stat-content">
                  <h3>Check-ins</h3>
                  <span className="stat-value">
                    {recoveryData.dailyCheckins?.filter((c) => c.completed).length ?? 0}/
                    {recoveryData.dailyCheckins?.length ?? 0}
                  </span>
                  <p className="stat-detail">Last 7 days</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="recovery-section">
          {renderSectionHeader("Recovery Progress", "chart")}
          {expandedSections.chart && (
            <div className="recovery-chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={recoveryData.progressData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="wellbeing" stroke="#4CAF50" strokeWidth={2} />
                  <Line type="monotone" dataKey="cravings" stroke="#F44336" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: "#4CAF50" }}></span>
                  <span>Well-being</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: "#F44336" }}></span>
                  <span>Cravings</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="recovery-actions">
          <button className="recovery-action-btn" onClick={() => setIsCheckInModalOpen(true)}>
            Complete Today's Check-in
          </button>
          <button className="recovery-action-btn" onClick={() => setIsJournalModalOpen(true)}>
            Add Journal Entry
          </button>
        </div>
      </div>
    );
  };

  const renderMilestones = () => {
    if (isLoading) return <div className="loading">Loading milestones...</div>;
    if (!recoveryData) return null;

    return (
      <div className="recovery-section">
        {renderSectionHeader("Recovery Milestones", "milestones")}
        {expandedSections.milestones && (
          <div className="recovery-milestones">
            <div className="milestone-timeline">
              {recoveryData.milestones?.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className={`milestone-item ${milestone.achieved ? "achieved" : ""}`}
                >
                  <div className="milestone-marker">
                    {milestone.achieved ? <CheckCircle size={16} /> : index + 1}
                  </div>
                  <div className="milestone-content">
                    <h4>{milestone.title}</h4>
                    <p className="milestone-date">
                      {milestone.achieved
                        ? `Achieved on ${new Date(milestone.date).toLocaleDateString()}`
                        : `Target date: ${new Date(milestone.date).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderJournal = () => {
    if (isLoading) return <div className="loading">Loading journal entries...</div>;
    if (!recoveryData) return null;

    return (
      <div className="recovery-section">
        {renderSectionHeader("Recovery Journal", "journal")}
        {expandedSections.journal && (
          <div className="recovery-journal">
            <div className="journal-header">
              <button className="new-entry-btn" onClick={() => setIsJournalModalOpen(true)}>
                New Entry
              </button>
            </div>
            <div className="journal-entries">
              {recoveryData.journalEntries?.map((entry) => (
                <div key={entry.id} className="journal-entry">
                  <div className="entry-header">
                    <h4>{new Date(entry.date).toLocaleDateString()}</h4>
                    <span className={`mood-indicator mood-${entry.mood.toLowerCase()}`}>
                      {entry.mood}
                    </span>
                  </div>
                  <div className="entry-content">
                    {entry.triggers && (
                      <div className="entry-triggers">
                        <strong>Triggers:</strong> {entry.triggers}
                      </div>
                    )}
                    <p>{entry.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCheckins = () => {
    if (isLoading) return <div className="loading">Loading check-ins...</div>;
    if (!recoveryData) return null;

    return (
      <div className="recovery-section">
        {renderSectionHeader("Daily Check-ins", "checkins")}
        {expandedSections.checkins && (
          <div className="recovery-checkins">
            <div className="checkin-calendar">
              {recoveryData.dailyCheckins?.map((checkin) => (
                <div key={checkin.date} className="checkin-day">
                  <div className="checkin-date">
                    {new Date(checkin.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className={`checkin-status ${checkin.completed ? "completed" : "missed"}`}>
                    {checkin.completed ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    <span>{checkin.completed ? "Completed" : "Missed"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Recovery Tracking</h1>
          <p className="tracking-subtitle">Monitor your progress and celebrate your achievements</p>
        </header>

        <div className="tracking-tabs">
          <button
            className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <TrendingUp size={16} />
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === "milestones" ? "active" : ""}`}
            onClick={() => setActiveTab("milestones")}
          >
            <Award size={16} />
            Milestones
          </button>
          <button
            className={`tab-btn ${activeTab === "journal" ? "active" : ""}`}
            onClick={() => setActiveTab("journal")}
          >
            <Calendar size={16} />
            Journal
          </button>
          <button
            className={`tab-btn ${activeTab === "checkins" ? "active" : ""}`}
            onClick={() => setActiveTab("checkins")}
          >
            <CheckCircle size={16} />
            Check-ins
          </button>
        </div>

        <div className="tracking-content">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "milestones" && renderMilestones()}
          {activeTab === "journal" && renderJournal()}
          {activeTab === "checkins" && renderCheckins()}
        </div>

        {/* Modals */}
        <CheckInModal
          isOpen={isCheckInModalOpen}
          onClose={() => setIsCheckInModalOpen(false)}
          onSubmit={handleCheckInSubmit}
        />
        <JournalEntryModal
          isOpen={isJournalModalOpen}
          onClose={() => setIsJournalModalOpen(false)}
          onSubmit={handleJournalSubmit}
        />
      </main>
    </div>
  );
};

export default RecoveryTracking;
