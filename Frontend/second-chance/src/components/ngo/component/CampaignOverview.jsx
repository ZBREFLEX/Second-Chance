import "./CampaignOverview.css"

function CampaignOverview() {
  const campaigns = [
    {
      id: 1,
      name: "Drug Free Campus",
      status: "active",
      startDate: "2023-05-01",
      endDate: "2023-06-30",
      progress: 45,
      participants: 1250,
    },
    {
      id: 2,
      name: "Community Awareness Drive",
      status: "active",
      startDate: "2023-04-15",
      endDate: "2023-07-15",
      progress: 60,
      participants: 3450,
    },
    {
      id: 3,
      name: "Parent Education Program",
      status: "upcoming",
      startDate: "2023-06-01",
      endDate: "2023-08-30",
      progress: 0,
      participants: 500,
    },
    {
      id: 4,
      name: "Youth Rehabilitation Workshop",
      status: "completed",
      startDate: "2023-02-15",
      endDate: "2023-04-15",
      progress: 100,
      participants: 750,
    },
  ]

  return (
    <div className="campaign-list">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="campaign-item">
          <div className="campaign-header">
            <h3>{campaign.name}</h3>
            <span className={`campaign-status ${campaign.status}`}>
              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            </span>
          </div>

          <div className="campaign-dates">
            <span>
              <i className="fas fa-calendar-alt"></i>
              {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
            </span>
          </div>

          <div className="campaign-progress">
            <div className="progress-label">
              <span>Progress</span>
              <span>{campaign.progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${campaign.progress}%`, backgroundColor: getProgressColor(campaign.progress) }}
              ></div>
            </div>
          </div>

          <div className="campaign-participants">
            <i className="fas fa-users"></i> {campaign.participants.toLocaleString()} participants
          </div>
        </div>
      ))}
    </div>
  )
}

function getProgressColor(progress) {
  if (progress < 25) return "#FF5722"
  if (progress < 50) return "#FFC107"
  if (progress < 75) return "#2196F3"
  return "#4CAF50"
}

export default CampaignOverview
