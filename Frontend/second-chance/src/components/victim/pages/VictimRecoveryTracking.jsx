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

import Sidebar from "../components/Sidebar";
import CheckInModal from "../components/CheckInModal";
import JournalEntryModal from "../components/JournalEntryModal";
import ProgressEntryModal from "../components/ProgressEntryModal";
import axios from "axios";
import "../styles/RecoveryTracking.css";

const RecoveryTracking = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [recoveryData, setRecoveryData] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    stats: true,
    chart: true,
    milestones: false,
    journal: false,
    checkins: false,
  });
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRecoveryData = async () => {
      try {
        const res = await axios.get(`/api/recovery/${user.id}`);
        setRecoveryData(res.data);
      } catch (error) {
        console.error("Error fetching recovery data:", error);
      }
    };

    fetchRecoveryData();
  }, [user.id]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckInSubmit = async () => {
    try {
      await axios.post(`/api/recovery/${user.id}/checkin`);
      alert("Check-in saved!");
      setIsCheckInModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Check-in failed");
    }
  };

  const handleJournalSubmit = async (journalData) => {
    try {
      await axios.post(`/api/recovery/${user.id}/journal`, {
        mood: journalData.mood,
        triggers: journalData.triggers,
        content: journalData.content,
      });
      alert("Journal entry saved!");
      setIsJournalModalOpen(false);

      const res = await axios.get(`/api/recovery/${user.id}`);
      setRecoveryData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to save journal entry");
    }
  };

  const handleProgressSubmit = async (progressData) => {
    try {
      await axios.post(`/api/recovery/${user.id}/progress`, progressData);
      alert("Progress saved!");
      setIsProgressModalOpen(false);
      const res = await axios.get(`/api/recovery/${user.id}`);
      setRecoveryData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to save progress");
    }
  };

  if (!recoveryData) return <div className="loading">Loading recovery data...</div>;

  const renderSectionHeader = (title, section) => (
    <div className="section-header" onClick={() => toggleSection(section)}>
      <h3>{title}</h3>
      <button className="toggle-btn">
        {expandedSections[section] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>
  );

  const renderOverview = () => (
    <div className="recovery-overview">
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
                <span className="stat-value">{recoveryData.daysInRecovery}</span>
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
                  {recoveryData.milestones.filter((m) => m.achieved).length}/
                  {recoveryData.milestones.length}
                </span>
                <p className="stat-detail">
                  Next: {recoveryData.milestones.find((m) => !m.achieved)?.title || "All achieved!"}
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
                  {recoveryData.dailyCheckins.filter((c) => c.completed).length}/
                  {recoveryData.dailyCheckins.length}
                </span>
                <p className="stat-detail">Last 7 days</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="recovery-section">
        {renderSectionHeader("Recovery Progress", "chart")}
        {expandedSections.chart && (
          <div className="recovery-chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={recoveryData.progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="wellbeing" stroke="#4CAF50" strokeWidth={2} />
                <Line type="monotone" dataKey="cravings" stroke="#F44336" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="recovery-actions">
        <button className="recovery-action-btn" onClick={() => setIsCheckInModalOpen(true)}>
          Complete Today's Check-in
        </button>
        <button className="recovery-action-btn" onClick={() => setIsJournalModalOpen(true)}>
          Add Journal Entry
        </button>
        <button className="recovery-action-btn" onClick={() => setIsProgressModalOpen(true)}>
          Add Weekly Progress
        </button>
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="recovery-section">
      {renderSectionHeader("Recovery Milestones", "milestones")}
      {expandedSections.milestones && (
        <div className="recovery-milestones">
          <div className="milestone-timeline">
            {recoveryData.milestones.map((milestone, index) => (
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

  const renderJournal = () => (
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
            {recoveryData.journalEntries.map((entry) => (
              <div key={entry.id} className="journal-entry">
                <div className="entry-header">
                  <h4>{new Date(entry.date).toLocaleDateString()}</h4>
                  <span className={`mood-indicator mood-${entry.mood?.toLowerCase()}`}>
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

  const renderCheckins = () => (
    <div className="recovery-section">
      {renderSectionHeader("Daily Check-ins", "checkins")}
      {expandedSections.checkins && (
        <div className="recovery-checkins">
          <div className="checkin-calendar">
            {recoveryData.dailyCheckins.map((checkin) => (
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
        <ProgressEntryModal
          isOpen={isProgressModalOpen}
          onClose={() => setIsProgressModalOpen(false)}
          onSubmit={handleProgressSubmit}
        />
      </main>
    </div>
  );
};

export default RecoveryTracking;
