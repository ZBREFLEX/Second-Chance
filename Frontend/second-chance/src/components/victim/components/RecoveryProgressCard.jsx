import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import "../styles/RecoveryProgressCard.css"

const RecoveryProgressCard = ({ progressData }) => {
  // If no data is provided, use sample data
  const data = progressData || [
    { name: "Week 1", progress: 20 },
    { name: "Week 2", progress: 35 },
    { name: "Week 3", progress: 30 },
    { name: "Week 4", progress: 45 },
    { name: "Week 5", progress: 60 },
    { name: "Week 6", progress: 75 },
  ]

  const currentProgress = data[data.length - 1]?.progress || 0

  return (
    <div className="recovery-progress-card">
      <div className="recovery-progress-header">
        <h3>Recovery Progress</h3>
        <span className="current-progress">{currentProgress}% Complete</span>
      </div>

      <div className="recovery-progress-chart">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="recovery-progress-footer">
        <button className="view-details-btn">View Detailed Progress</button>
      </div>
    </div>
  )
}

export default RecoveryProgressCard
