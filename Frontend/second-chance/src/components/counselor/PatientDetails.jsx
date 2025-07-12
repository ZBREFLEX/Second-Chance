"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Layout from "./components/Layout"
import axios from "axios"
import "./css/PatientDetails.css"

const PatientDetails = () => {
  const { id } = useParams()
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("adminToken")
        const response = await axios.get(`http://localhost:5000/api/admin/victims/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPatient(response.data)
      } catch (err) {
        console.error("Failed to fetch victim profile", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPatient()
  }, [id])

  if (loading) {
    return (
      <Layout title="Victim Details">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading victim data...</p>
        </div>
      </Layout>
    )
  }

  if (!patient) {
    return (
      <Layout title="Victim Details">
        <div className="error-container">
          <h2>Victim Not Found</h2>
          <p>The requested victim information could not be found.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`Victim: ${patient.username}`}>
      <div className="victim-details-container">
        <div className="victim-header">
          <div className="victim-info">
            <h2>{patient.username}</h2>
            <div className="victim-meta">
              <span className="victim-id">ID: {patient.user_id}</span>
              <span className="victim-email">Email: {patient.email}</span>
              <span className="victim-gender">Gender: {patient.gender}</span>
              <span className="victim-age">Age: {patient.age}</span>
              <span className="victim-status">Status: {patient.status}</span>
              <span className="victim-role">Role: Victim</span>
            </div>
          </div>
        </div>

        <div className="victim-summary">
          <h3>Detailed Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Location</label>
              <p>{patient.location}</p>
            </div>
            <div className="info-item">
              <label>Occupation</label>
              <p>{patient.occupation}</p>
            </div>
            <div className="info-item">
              <label>Drug Type</label>
              <p>{patient.drug_type}</p>
            </div>
            <div className="info-item">
              <label>Duration of Use</label>
              <p>{patient.duration_of_use}</p>
            </div>
            <div className="info-item">
              <label>Frequency</label>
              <p>{patient.frequency}</p>
            </div>
            <div className="info-item">
              <label>Last Use Date</label>
              <p>{patient.last_use_date}</p>
            </div>
            <div className="info-item">
              <label>Mental Health Issues</label>
              <p>{patient.mental_health_issues}</p>
            </div>
            <div className="info-item">
              <label>Physical Health Issues</label>
              <p>{patient.physical_health_issues}</p>
            </div>
            <div className="info-item">
              <label>Support System</label>
              <p>{patient.support_system}</p>
            </div>
            <div className="info-item">
              <label>Risk Score</label>
              <p>{patient.risk_score}</p>
            </div>
            <div className="info-item">
              <label>Submitted At</label>
              <p>{new Date(patient.submitted_at).toLocaleString()}</p>
            </div>
            <div className="info-item">
              <label>Assigned Counselor</label>
              <p>{patient.counselor_name || "Not Assigned"}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PatientDetails
