import "./RecentActivity.css"

function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "content",
      title: "New article published",
      description: '"Understanding Addiction: A Guide for Parents" was published',
      time: "2 hours ago",
      icon: "fas fa-file-alt",
    },
    {
      id: 2,
      type: "campaign",
      title: "Campaign started",
      description: '"Drug Free Campus" campaign has been launched',
      time: "1 day ago",
      icon: "fas fa-bullhorn",
    },
    {
      id: 3,
      type: "user",
      title: "New counselor joined",
      description: "Dr. Sarah Johnson joined your organization",
      time: "2 days ago",
      icon: "fas fa-user",
    },
    {
      id: 4,
      type: "content",
      title: "Video uploaded",
      description: '"Recovery Stories: Path to Sobriety" video was uploaded',
      time: "3 days ago",
      icon: "fas fa-video",
    },
    {
      id: 5,
      type: "report",
      title: "Monthly report generated",
      description: "April 2023 impact report is ready for review",
      time: "5 days ago",
      icon: "fas fa-chart-line",
    },
  ]

  return (
    <div className="recent-activity-list">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <div className={`activity-icon ${activity.type}`}>
            <i className={activity.icon}></i>
          </div>
          <div className="activity-content">
            <h4>{activity.title}</h4>
            <p>{activity.description}</p>
            <span className="activity-time">{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecentActivity
