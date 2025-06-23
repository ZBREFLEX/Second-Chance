import "./StatCard.css"

function StatCard({ title, value, icon, change, period }) {
  const isPositive = change && change.startsWith("+")

  return (
    <div className="stat-card">
      <div className="stat-icon">
        <i className={icon}></i>
      </div>
      <div className="stat-details">
        <h3>{title}</h3>
        <div className="stat-value">{value}</div>
        {change && (
          <div className={`stat-change ${isPositive ? "positive" : "negative"}`}>
            <span>{change}</span> {period}
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard
