"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import "./css/KeralaMap.css";

// Function to determine color class based on drug usage percentage
const getUsageClass = (percentage) => {
  if (percentage < 10) return "usage-low";
  if (percentage < 20) return "usage-medium";
  return "usage-high";
};

// Function to determine recovery class for the indicator
const getRecoveryClass = (percentage) => {
  if (percentage < 30) return "recovery-low";
  if (percentage < 60) return "recovery-medium";
  return "recovery-high";
};

function KeralaMap() {
  const [districtData, setDistrictData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reports/district-stats")
      .then((res) => {
        setDistrictData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
        setLoading(false);
      });
  }, []);

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
  };

  const filteredDistricts = Object.keys(districtData).filter((district) =>
    districtData[district].name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">Kerala Drug Usage and Recovery Data</h1>
      <div className="grid-layout">
        <div className="info-panel">
          <div className="legend-card">
            <div className="card-header">
              <h2 className="card-title">Data Legend</h2>
              <p className="card-description">Color representation for districts</p>
            </div>
            <div className="card-content">
              <div className="legend-items">
                <div className="legend-item">
                  <div className="color-box usage-low"></div>
                  <span>Low Drug Usage (&lt;10%)</span>
                </div>
                <div className="legend-item">
                  <div className="color-box usage-medium"></div>
                  <span>Moderate Drug Usage (10-20%)</span>
                </div>
                <div className="legend-item">
                  <div className="color-box usage-high"></div>
                  <span>High Drug Usage (&gt;20%)</span>
                </div>
                <div className="legend-divider"></div>
                <h3 className="legend-subtitle">Recovery Rate</h3>
                <div className="legend-item">
                  <div className="color-box recovery-low"></div>
                  <span>Low Recovery (&lt;30%)</span>
                </div>
                <div className="legend-item">
                  <div className="color-box recovery-medium"></div>
                  <span>Moderate Recovery (30-60%)</span>
                </div>
                <div className="legend-item">
                  <div className="color-box recovery-high"></div>
                  <span>High Recovery (&gt;60%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-header">
              <h2 className="card-title">State Overview</h2>
              <p className="card-description">Kerala's drug situation summary</p>
            </div>
            <div className="card-content">
              <div className="overview-items">
                <div className="overview-item">
                  <span>Average Drug Usage:</span>
                  <span className="overview-value">15.2%</span>
                </div>
                <div className="overview-item">
                  <span>Average Recovery Rate:</span>
                  <span className="overview-value">48.7%</span>
                </div>
                <div className="overview-item">
                  <span>Most Affected District:</span>
                  <span className="overview-value">Ernakulam</span>
                </div>
                <div className="overview-item">
                  <span>Highest Recovery:</span>
                  <span className="overview-value">Thiruvananthapuram</span>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div className="card-header">
              <h2 className="card-title">Quick Stats</h2>
              <p className="card-description">Key metrics at a glance</p>
            </div>
            <div className="card-content">
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-value">14</div>
                  <div className="stat-label">Districts</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">3</div>
                  <div className="stat-label">High Risk Districts</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">5</div>
                  <div className="stat-label">Low Risk Districts</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">4</div>
                  <div className="stat-label">High Recovery Districts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="districts-card">
            <div className="card-header">
              <h2 className="card-title">Kerala Districts</h2>
              <p className="card-description">Click on a district to view detailed statistics</p>
            </div>
            <div className="card-content">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search districts..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {loading ? (
                <p>Loading data...</p>
              ) : (
                <div className="districts-grid">
                  {filteredDistricts.map((district) => (
                    <div
                      key={district}
                      className={`district-item ${selectedDistrict === district ? "selected" : ""} ${getUsageClass(
                        districtData[district].usage
                      )}`}
                      onClick={() => handleDistrictClick(district)}
                    >
                      <span className="district-name">{districtData[district].name}</span>
                      <div className="district-indicators">
                        <span className="district-usage">{districtData[district].usage}%</span>
                        <span className="district-recovery">{districtData[district].recovery}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={`details-box ${selectedDistrict ? "active" : ""}`}>
            {selectedDistrict ? (
              <>
                <div className="details-header">
                  <h3 className="details-title">{districtData[selectedDistrict].name}</h3>
                  <button className="close-button" onClick={() => setSelectedDistrict(null)}>
                    ×
                  </button>
                </div>
                <div className="details-content">
                  <div className="details-section">
                    <h4 className="details-subtitle">Drug Usage</h4>
                    <div className="details-stat">
                      <div className="stat-value usage-value">
                        {districtData[selectedDistrict].usage}%
                      </div>
                      <div
                        className={`stat-indicator ${getUsageClass(
                          districtData[selectedDistrict].usage
                        )}`}
                      ></div>
                    </div>
                    <div className="details-description">
                      {districtData[selectedDistrict].usage < 10
                        ? "Low drug usage compared to other districts"
                        : districtData[selectedDistrict].usage < 20
                        ? "Moderate drug usage requiring attention"
                        : "High drug usage requiring immediate intervention"}
                    </div>
                  </div>

                  <div className="details-section">
                    <h4 className="details-subtitle">Recovery Rate</h4>
                    <div className="details-stat">
                      <div className="stat-value recovery-value">
                        {districtData[selectedDistrict].recovery}%
                      </div>
                      <div
                        className={`stat-indicator ${getRecoveryClass(
                          districtData[selectedDistrict].recovery
                        )}`}
                      ></div>
                    </div>
                    <div className="recovery-progress-container">
                      <div
                        className="recovery-progress-bar"
                        style={{
                          width: `${districtData[selectedDistrict].recovery}%`,
                        }}
                      ></div>
                    </div>
                    <div className="details-description">
                      {districtData[selectedDistrict].recovery < 30
                        ? "Low recovery rate - needs improved programs"
                        : districtData[selectedDistrict].recovery < 60
                        ? "Moderate recovery rate - programs showing results"
                        : "High recovery rate - successful rehabilitation programs"}
                    </div>
                  </div>

                  <div className="details-actions">
                    <button className="action-button">View Full Report</button>
                    <button className="action-button secondary">Compare</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="details-placeholder">
                <p>Click on a district to view detailed information</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeralaMap;
