"use client"


import { useState } from "react";
import axios from "axios";
import "./css/AnonymousReport.css";

// ① define the template *once* outside the component
const emptyForm = {
  reportType: "",
  district: "",
  location: "",
  description: "",
  date: "",
  time: "",
  involvedPersons: "",
  additionalInfo: "",
  contactOptional: "",
};

function AnonymousReport() {
  // ② use the template here
  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [reportId,  setReportId]  = useState("");
  

  const [checkId, setCheckId] = useState("");
const [reportStatus, setReportStatus] = useState(null);
const [checking, setChecking] = useState(false);

const handleStatusCheck = async (e) => {
  e.preventDefault();
  if (!checkId.trim()) return alert("Please enter a Report ID.");
  setChecking(true);
  setReportStatus(null);
  try {
    const { data } = await axios.get(`http://localhost:3000/api/reports/status/${checkId}`);
    setReportStatus(data);
  } catch (err) {
    setReportStatus({ error: err.response?.data?.message || "Report not found." });
  } finally {
    setChecking(false);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/reports/anonymous",
        {
          reportType:      formData.reportType,
          district:        formData.district,
          location:        formData.location,
          description:     formData.description,
          date:            formData.date,
          time:            formData.time,
          involvedPersons: formData.involvedPersons,
          additionalInfo:  formData.additionalInfo,
          contactOptional: formData.contactOptional,
        }
      );
      setReportId(data.reportUuid || data.reportId);
      setSubmitted(true);
      setFormData(emptyForm);          // reset
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while submitting your report."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewReport = () => {
    setSubmitted(false);
    setReportId("");
  };


  /* …rest of JSX stays exactly as you already have… */


  return (
    <div className="report-page">
      <header className="report-header">
        <div className="header-content">
          <h1>Anonymous Reporting</h1>
          <p>
            Submit information about drug-related incidents or concerns without revealing your identity. Your report
            helps us take action against drug abuse in our communities.
          </p>
        </div>
      </header>

      <div className="container">
        <div className="report-container">
          <div className="form-panel">
            <div className="info-section">
              <h2>Why Report Anonymously?</h2>
              <ul>
                <li>Your identity remains completely confidential</li>
                <li>Help protect your community from drug-related issues</li>
                <li>Provide valuable information to authorities</li>
                <li>Support prevention and intervention efforts</li>
              </ul>
            </div>

            <div className="info-section">
              <h2>What Happens to Your Report</h2>
              <ol>
                <li>Your report is encrypted and anonymized</li>
                <li>Information is reviewed by authorized personnel only</li>
                <li>Appropriate action is taken based on the report</li>
                <li>No identifying information is shared with third parties</li>
              </ol>
            </div>

            <div className="info-section emergency-info">
              <h2>Need Immediate Help?</h2>
              <p>If you're witnessing an emergency situation that requires immediate attention:</p>
              <div className="emergency-contacts">
                <div className="emergency-contact">
                  <h3>Police Emergency</h3>
                  <p className="emergency-number">100</p>
                </div>
                <div className="emergency-contact">
                  <h3>Ambulance</h3>
                  <p className="emergency-number">108</p>
                </div>
                <div className="emergency-contact">
                  <h3>Drug Helpline</h3>
                  <p className="emergency-number">1800-11-0031</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-panel">
            {!submitted ? (
              <>
                <div className="form-header">
                  <div className="check-status-section">
  <h2>Check Report Status</h2>
  <p>Enter your Report ID to check the current status of your anonymous report.</p>
  <form onSubmit={handleStatusCheck} className="status-check-form">
    <input
      type="text"
      name="checkId"
      placeholder="Enter your Report ID"
      value={checkId}
      onChange={(e) => setCheckId(e.target.value)}
      required
    />
    <button type="submit" className="btn-status-check" disabled={checking}>
      {checking ? "Checking..." : "Check Status"}
    </button>
  </form>

  {reportStatus && (
    <div className="status-result">
      {reportStatus.error ? (
        <p className="error-message">{reportStatus.error}</p>
      ) : (
        <div className="status-details">
          <p><strong>Report ID:</strong> {reportStatus.reportId || checkId}</p>
          <p><strong>Type:</strong> {reportStatus.type}</p>
          <p><strong>District:</strong> {reportStatus.district}</p>
          <p><strong>Date:</strong> {reportStatus.date}</p>
          <p><strong>Status:</strong> {reportStatus.status}</p>
        </div>
      )}
    </div>
  )}
</div>

                  <h2>Submit Anonymous Report</h2>
                  <p>Fields marked with * are required. All other fields are optional but helpful.</p>
                </div>

                <form onSubmit={handleSubmit} className="report-form">
                  <div className="form-group">
                    <label htmlFor="reportType">Type of Report *</label>
                    <select
                      id="reportType"
                      name="reportType"
                      value={formData.reportType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select report type</option>
                      <option value="drugSale">Drug Sale/Distribution</option>
                      <option value="drugUse">Drug Use in Public</option>
                      <option value="suspiciousActivity">Suspicious Activity</option>
                      <option value="concernedPerson">Concerned About Someone</option>
                      <option value="drugHotspot">Drug Hotspot Location</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="district">District *</label>
                      <select id="district" name="district" value={formData.district} onChange={handleChange} required>
                        <option value="">Select district</option>
                        <option value="thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="kollam">Kollam</option>
                        <option value="pathanamthitta">Pathanamthitta</option>
                        <option value="alappuzha">Alappuzha</option>
                        <option value="kottayam">Kottayam</option>
                        <option value="idukki">Idukki</option>
                        <option value="ernakulam">Ernakulam</option>
                        <option value="thrissur">Thrissur</option>
                        <option value="palakkad">Palakkad</option>
                        <option value="malappuram">Malappuram</option>
                        <option value="kozhikode">Kozhikode</option>
                        <option value="wayanad">Wayanad</option>
                        <option value="kannur">Kannur</option>
                        <option value="kasaragod">Kasaragod</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="location">Specific Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Street, landmark, or area"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description of Incident/Concern *</label>
                    <textarea
                      id="description"
                      name="description"
                      rows="5"
                      placeholder="Please provide as much detail as possible"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date">Date of Incident</label>
                      <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="time">Time of Incident</label>
                      <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="involvedPersons">Persons Involved</label>
                    <textarea
                      id="involvedPersons"
                      name="involvedPersons"
                      rows="3"
                      placeholder="Description of individuals involved (no names required)"
                      value={formData.involvedPersons}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="additionalInfo">Additional Information</label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows="3"
                      placeholder="Any other details that might be helpful"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactOptional">
                      Contact Information (Optional)
                      <span className="optional-note">
                        This is completely optional. If provided, it will be used only if clarification is needed.
                      </span>
                    </label>
                    <input
                      type="text"
                      id="contactOptional"
                      name="contactOptional"
                      placeholder="Email or phone number"
                      value={formData.contactOptional}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="privacy-notice">
                    <p>
                      <strong>Privacy Assurance:</strong> Your report is anonymous. We do not track IP addresses or
                      collect identifying information. Any optional contact information you provide is encrypted and
                      only accessible to authorized personnel.
                    </p>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-submit" disabled={loading}>
                      {loading ? "Submitting..." : "Submit Anonymous Report"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>Report Submitted Successfully</h2>
                <p>Thank you for helping to keep our communities safe.</p>
                <div className="report-id-container">
                  <p>Your Report ID:</p>
                  <div className="report-id">{reportId}</div>
                  <p className="id-note">
                    Please save this ID for your reference. You can use it to check the status of your report or provide
                    additional information.
                  </p>
                </div>
                <div className="success-actions">
                  <button onClick={handleNewReport} className="btn-new-report">
                    Submit Another Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Is my report really anonymous?</h3>
              <p>
                Yes. We do not collect IP addresses, require login credentials, or gather any personally identifying
                information. The system is designed to protect your identity.
              </p>
            </div>
            <div className="faq-item">
              <h3>What information should I include?</h3>
              <p>
                Include as much detail as possible about the incident, location, time, and descriptions of activities or
                persons involved. The more specific your information, the more helpful it is.
              </p>
            </div>
            <div className="faq-item">
              <h3>How quickly will my report be reviewed?</h3>
              <p>
                All reports are reviewed within 24-48 hours by authorized personnel. High-priority reports involving
                immediate dangers are escalated for faster review.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I check the status of my report?</h3>
              <p>
                Yes. You can use your Report ID to check the status through our secure portal. No personal information
                is required to check status.
              </p>
            </div>
            <div className="faq-item">
              <h3>Who has access to my report?</h3>
              <p>
                Only authorized personnel involved in drug prevention and law enforcement have access to report details.
                All personnel are bound by strict confidentiality protocols.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I add information to my report later?</h3>
              <p>
                Yes. Using your Report ID, you can submit additional information to an existing report without
                compromising your anonymity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="report-footer">
        <div className="container">
          <p>
            This anonymous reporting system is maintained by the Kerala State Drug Prevention Authority. If you have
            questions about the reporting process, please contact our support team at{" "}
            <a href="mailto:support@ksdpa.org">support@ksdpa.org</a>.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default AnonymousReport
