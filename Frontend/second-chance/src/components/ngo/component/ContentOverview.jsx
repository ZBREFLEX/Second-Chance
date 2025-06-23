import "./ContentOverview.css"

function ContentOverview() {
  const contentStats = [
    { type: "Articles", count: 45, icon: "fas fa-file-alt", color: "#4CAF50" },
    { type: "Videos", count: 23, icon: "fas fa-video", color: "#2196F3" },
    { type: "Infographics", count: 18, icon: "fas fa-image", color: "#FF9800" },
    { type: "Resources", count: 38, icon: "fas fa-book", color: "#9C27B0" },
  ]

  const recentContent = [
    {
      id: 1,
      title: "Understanding Addiction: A Guide for Parents",
      type: "Article",
      views: 1245,
      date: "2023-05-15",
    },
    {
      id: 2,
      title: "Recovery Stories: Path to Sobriety",
      type: "Video",
      views: 3456,
      date: "2023-05-10",
    },
    {
      id: 3,
      title: "Warning Signs of Drug Abuse",
      type: "Infographic",
      views: 2789,
      date: "2023-05-05",
    },
  ]

  return (
    <div className="content-overview-container">
      <div className="content-stats">
        {contentStats.map((stat, index) => (
          <div key={index} className="content-stat-item">
            <div className="content-stat-icon" style={{ backgroundColor: stat.color }}>
              <i className={stat.icon}></i>
            </div>
            <div className="content-stat-details">
              <h4>{stat.type}</h4>
              <p>{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      <h3>Recent Content</h3>
      <div className="recent-content-list">
        {recentContent.map((content) => (
          <div key={content.id} className="recent-content-item">
            <div className="content-title">{content.title}</div>
            <div className="content-meta">
              <span className="content-type">{content.type}</span>
              <span className="content-views">
                <i className="fas fa-eye"></i> {content.views}
              </span>
              <span className="content-date">{new Date(content.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContentOverview
