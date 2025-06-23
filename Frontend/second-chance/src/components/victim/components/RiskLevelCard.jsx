import "../styles/RiskLevelCard.css"

const RiskLevelCard = ({ riskLevel, lastAssessment }) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case "Low":
        return "#4CAF50"
      case "Moderate":
        return "#FF9800"
      case "High":
        return "#F44336"
      default:
        return "#9E9E9E"
    }
  }

  const getRiskMessage = () => {
    switch (riskLevel) {
      case "Low":
        return "You are currently at low risk. Keep up the good work!"
      case "Moderate":
        return "You are at moderate risk. Consider speaking with a counselor."
      case "High":
        return "You are at high risk. Please connect with a counselor immediately."
      default:
        return "Take the risk assessment to see your current status."
    }
  }

  return (
    <div className="risk-level-card">
      <div className="risk-level-header">
        <h3>Current Risk Level</h3>
        <span className="last-assessment">Last assessment: {lastAssessment || "Not taken yet"}</span>
      </div>

      <div className="risk-level-content">
        <div className="risk-level-indicator" style={{ backgroundColor: getRiskColor() }}>
          <span>{riskLevel || "Unknown"}</span>
        </div>
        <p className="risk-message">{getRiskMessage()}</p>
      </div>

      <div className="risk-level-footer">
        <button className="take-assessment-btn">{riskLevel ? "Retake Assessment" : "Take Assessment"}</button>
      </div>
    </div>
  )
}

export default RiskLevelCard
