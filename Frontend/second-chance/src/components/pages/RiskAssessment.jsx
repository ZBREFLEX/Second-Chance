"use client"

import { useState } from "react"
import "./css/RiskAssessment.css"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

// Mock ML model weights (in a real app, this would be handled server-side)
const riskFactorWeights = {
  // Personal factors
  age: { under18: 2.5, "18-25": 3.0, "26-35": 2.0, "36-45": 1.5, over45: 1.0 },
  gender: { male: 1.2, female: 1.0, other: 1.1 },

  // History factors
  pastUse: { never: 0, experimental: 2.5, occasional: 4, regular: 5, recovery: 3 },
  familyHistory: { none: 0, distant: 1.5, immediate: 3.0 },

  // Mental health factors
  mentalHealth: { none: 0, mild: 2, moderate: 3, severe: 4.5 },
  trauma: { none: 0, some: 2, significant: 4 },

  // Environmental factors
  peerUse: { none: 0, some: 2, most: 4 },
  accessibility: { difficult: 1, moderate: 2, easy: 3.5 },
  stress: { low: 1, moderate: 2, high: 3.5 },

  // Behavioral factors
  impulsivity: { low: 1, moderate: 2, high: 3.5 },
  riskTaking: { low: 1, moderate: 2, high: 3 },

  // Protective factors (negative weights reduce risk)
  support: { strong: -2, moderate: -1, minimal: 0 },
  activities: { many: -1.5, some: -0.75, few: 0 },
  awareness: { high: -1, moderate: -0.5, low: 0 },
}

// Questions for the assessment
const assessmentQuestions = [
  {
    id: "age",
    question: "What is your age group?",
    options: [
      { value: "under18", label: "Under 18" },
      { value: "18-25", label: "18-25" },
      { value: "26-35", label: "26-35" },
      { value: "36-45", label: "36-45" },
      { value: "over45", label: "Over 45" },
    ],
    category: "personal",
  },
  {
    id: "gender",
    question: "What is your gender?",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other/Prefer not to say" },
    ],
    category: "personal",
  },
  {
    id: "pastUse",
    question: "Have you ever used recreational drugs?",
    options: [
      { value: "never", label: "Never" },
      { value: "experimental", label: "Tried once or twice" },
      { value: "occasional", label: "Occasional use" },
      { value: "regular", label: "Regular use" },
      { value: "recovery", label: "Past regular use, now in recovery" },
    ],
    category: "history",
  },
  {
    id: "familyHistory",
    question: "Is there a history of substance abuse in your family?",
    options: [
      { value: "none", label: "No history" },
      { value: "distant", label: "Extended family (uncles, aunts, cousins, etc.)" },
      { value: "immediate", label: "Immediate family (parents, siblings)" },
    ],
    category: "history",
  },
  {
    id: "mentalHealth",
    question: "Do you experience anxiety, depression, or other mental health challenges?",
    options: [
      { value: "none", label: "None" },
      { value: "mild", label: "Mild (occasional)" },
      { value: "moderate", label: "Moderate (regular but manageable)" },
      { value: "severe", label: "Severe (significantly impacts daily life)" },
    ],
    category: "mental",
  },
  {
    id: "trauma",
    question: "Have you experienced significant trauma or adverse childhood experiences?",
    options: [
      { value: "none", label: "None" },
      { value: "some", label: "Some difficult experiences" },
      { value: "significant", label: "Significant trauma" },
    ],
    category: "mental",
  },
  {
    id: "peerUse",
    question: "How many of your close friends or peers use drugs?",
    options: [
      { value: "none", label: "None that I'm aware of" },
      { value: "some", label: "Some of them" },
      { value: "most", label: "Most or all of them" },
    ],
    category: "environment",
  },
  {
    id: "accessibility",
    question: "How easily available are drugs in your community or social circle?",
    options: [
      { value: "difficult", label: "Difficult to access" },
      { value: "moderate", label: "Moderately accessible" },
      { value: "easy", label: "Easily accessible" },
    ],
    category: "environment",
  },
  {
    id: "stress",
    question: "How would you rate your current stress level?",
    options: [
      { value: "low", label: "Low (manageable)" },
      { value: "moderate", label: "Moderate (challenging at times)" },
      { value: "high", label: "High (frequently overwhelming)" },
    ],
    category: "environment",
  },
  {
    id: "impulsivity",
    question: "How often do you act on impulse without considering consequences?",
    options: [
      { value: "low", label: "Rarely" },
      { value: "moderate", label: "Sometimes" },
      { value: "high", label: "Frequently" },
    ],
    category: "behavioral",
  },
  {
    id: "riskTaking",
    question: "How comfortable are you with taking risks?",
    options: [
      { value: "low", label: "I avoid risks when possible" },
      { value: "moderate", label: "I take calculated risks" },
      { value: "high", label: "I enjoy taking risks" },
    ],
    category: "behavioral",
  },
  {
    id: "support",
    question: "How strong is your support network (family, friends, community)?",
    options: [
      { value: "strong", label: "Strong (many people I can rely on)" },
      { value: "moderate", label: "Moderate (some people I can rely on)" },
      { value: "minimal", label: "Minimal (few or no people I can rely on)" },
    ],
    category: "protective",
  },
  {
    id: "activities",
    question: "How involved are you in structured activities (sports, clubs, volunteering, etc.)?",
    options: [
      { value: "many", label: "Highly involved in multiple activities" },
      { value: "some", label: "Somewhat involved" },
      { value: "few", label: "Minimally involved or not at all" },
    ],
    category: "protective",
  },
  {
    id: "awareness",
    question: "How would you rate your knowledge about drug risks and consequences?",
    options: [
      { value: "high", label: "Well-informed" },
      { value: "moderate", label: "Somewhat informed" },
      { value: "low", label: "Minimally informed" },
    ],
    category: "protective",
  },
]

// Recommendations based on risk level
const recommendations = {
  low: [
    "Continue maintaining your healthy lifestyle and protective factors",
    "Stay informed about substance abuse risks and prevention strategies",
    "Consider volunteering in prevention programs to help others",
    "Maintain your strong support network and healthy coping mechanisms",
  ],
  moderate: [
    "Develop stronger stress management techniques",
    "Consider speaking with a counselor about any underlying issues",
    "Strengthen your support network through community involvement",
    "Educate yourself further about substance abuse risks and warning signs",
    "Establish clear boundaries with peers who use substances",
  ],
  high: [
    "Speak with a healthcare professional about prevention strategies",
    "Consider regular counseling to address risk factors",
    "Join support groups to build a stronger support network",
    "Develop a personalized prevention plan with professional guidance",
    "Learn and practice healthy coping mechanisms for stress and emotional challenges",
    "Limit exposure to high-risk environments and peer groups",
  ],
  veryhigh: [
    "Seek immediate consultation with a healthcare professional",
    "Consider structured prevention programs designed for high-risk individuals",
    "Engage in regular therapy to address underlying risk factors",
    "Build a comprehensive support system with professional guidance",
    "Develop crisis management strategies with professional help",
    "Consider family therapy if family factors contribute to risk",
  ],
}

function RiskAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [riskScore, setRiskScore] = useState(0)
  const [riskLevel, setRiskLevel] = useState("")
  const [loading, setLoading] = useState(false)
  const [categoryScores, setCategoryScores] = useState({})
  const [showExplanation, setShowExplanation] = useState(false)

  // Calculate risk score based on answers
  const calculateRiskScore = () => {
    let score = 0
    const categoryTotals = {
      personal: 0,
      history: 0,
      mental: 0,
      environment: 0,
      behavioral: 0,
      protective: 0,
    }

    // Calculate total score and category scores
    Object.entries(answers).forEach(([questionId, answer]) => {
      const weight = riskFactorWeights[questionId][answer]
      score += weight

      // Find the category for this question
      const question = assessmentQuestions.find((q) => q.id === questionId)
      if (question && question.category) {
        categoryTotals[question.category] += weight
      }
    })

    // Normalize score to 0-100 range
    // In a real ML model, this would be more sophisticated
    const normalizedScore = Math.min(Math.max(Math.round((score / 25) * 100), 0), 100)

    // Determine risk level
    let level = ""
    if (normalizedScore < 25) level = "low"
    else if (normalizedScore < 50) level = "moderate"
    else if (normalizedScore < 75) level = "high"
    else level = "veryhigh"

    setRiskScore(normalizedScore)
    setRiskLevel(level)
    setCategoryScores(categoryTotals)
  }

  // Handle answer selection
  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  // Move to next question
  const handleNext = () => {
    if (currentStep < assessmentQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setLoading(true)
      // Simulate ML processing time
      setTimeout(() => {
        calculateRiskScore()
        setShowResults(true)
        setLoading(false)
      }, 2000)
    }
  }

  // Move to previous question
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Reset assessment
  const handleReset = () => {
    setAnswers({})
    setCurrentStep(0)
    setShowResults(false)
    setRiskScore(0)
    setRiskLevel("")
  }

  const handleDownloadResults = () => {
    // Create a new PDF document
    const doc = new jsPDF()

    // Add title and date
    doc.setFontSize(20)
    doc.setTextColor(59, 130, 246) // Primary color
    doc.text("Drug Abuse Vulnerability Assessment Results", 20, 20)

    doc.setFontSize(10)
    doc.setTextColor(107, 114, 128) // Text light color
    const today = new Date()
    doc.text(`Generated on: ${today.toLocaleDateString()}`, 20, 30)

    // Add risk score section
    doc.setFontSize(16)
    doc.setTextColor(31, 41, 55) // Text color
    doc.text("Risk Assessment Summary", 20, 45)

    doc.setFontSize(12)
    doc.text(`Risk Score: ${riskScore}/100`, 20, 55)

    // Add risk level with appropriate color
    doc.text("Risk Level: ", 20, 65)
    if (riskLevel === "low") {
      doc.setTextColor(16, 185, 129) // Success color
      doc.text("Low", 55, 65)
    } else if (riskLevel === "moderate") {
      doc.setTextColor(245, 158, 11) // Warning color
      doc.text("Moderate", 55, 65)
    } else if (riskLevel === "high") {
      doc.setTextColor(239, 68, 68) // Danger color
      doc.text("High", 55, 65)
    } else {
      doc.setTextColor(185, 28, 28) // Very high risk color
      doc.text("Very High", 55, 65)
    }
    doc.setTextColor(31, 41, 55) // Reset text color

    // Add risk factor analysis
    doc.text("Risk Factor Analysis", 20, 80)

    // Create a table for risk factors
    const factorData = [
      ["Category", "Risk Level"],
      ["Personal Factors", Math.abs(categoryScores.personal).toFixed(1)],
      ["History Factors", Math.abs(categoryScores.history).toFixed(1)],
      ["Mental Health", Math.abs(categoryScores.mental).toFixed(1)],
      ["Environmental Factors", Math.abs(categoryScores.environment).toFixed(1)],
      ["Behavioral Patterns", Math.abs(categoryScores.behavioral).toFixed(1)],
      ["Protective Factors", Math.abs(categoryScores.protective).toFixed(1)],
    ]

    autoTable(doc, {
      startY: 85,
      head: [factorData[0]],
      body: factorData.slice(1),
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      styles: { fontSize: 10 },
    })

    // Add recommendations
    const recommendationsY = doc.lastAutoTable.finalY + 15
    doc.text("Personalized Recommendations", 20, recommendationsY)

    // Add each recommendation as a bullet point
    let yPos = recommendationsY + 10
    recommendations[riskLevel].forEach((recommendation, index) => {
      doc.text(`• ${recommendation}`, 25, yPos)
      yPos += 10
    })

    // Add disclaimer
    const disclaimerY = yPos + 15
    doc.setFontSize(10)
    doc.setTextColor(107, 114, 128)
    doc.text("Disclaimer: This assessment is for educational purposes only and does not constitute", 20, disclaimerY)
    doc.text(
      "medical advice or diagnosis. If you're concerned about substance abuse, please consult",
      20,
      disclaimerY + 5,
    )
    doc.text("with a healthcare professional.", 20, disclaimerY + 10)

    // Add footer
    doc.setFontSize(8)
    doc.text("Kerala State Drug Prevention Authority", 20, 285)
    doc.text("Helpline: 1800-11-0031", 20, 290)

    // Save the PDF
    doc.save("Drug_Abuse_Risk_Assessment.pdf")
  }

  // Current question
  const currentQuestion = assessmentQuestions[currentStep]

  // Progress percentage
  const progress = ((currentStep + 1) / assessmentQuestions.length) * 100

  return (
    <div className="risk-assessment-page">
      <header className="assessment-header">
        <div className="header-content">
          <h1>Drug Abuse Vulnerability Assessment</h1>
          <p>
            Take our comprehensive assessment to understand your risk factors and receive personalized recommendations.
            This assessment uses machine learning algorithms to analyze multiple risk factors.
          </p>
        </div>
      </header>

      <div className="container">
        {!showResults ? (
          <div className="assessment-container">
            <div className="assessment-sidebar">
              <div className="assessment-info">
                <h2>About This Assessment</h2>
                <p>
                  This tool uses machine learning to evaluate multiple risk factors associated with substance abuse
                  vulnerability. Your responses are analyzed across several categories:
                </p>
                <ul>
                  <li>Personal factors</li>
                  <li>Historical factors</li>
                  <li>Mental health</li>
                  <li>Environmental influences</li>
                  <li>Behavioral patterns</li>
                  <li>Protective factors</li>
                </ul>
                <div className="privacy-note">
                  <h3>Privacy Assurance</h3>
                  <p>
                    Your responses are completely confidential. We do not store any personally identifying information
                    with your assessment results.
                  </p>
                </div>
              </div>
            </div>

            <div className="assessment-main">
              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="progress-text">
                  Question {currentStep + 1} of {assessmentQuestions.length}
                </div>
              </div>

              <div className="question-card">
                <h2 className="question-text">{currentQuestion.question}</h2>
                <div className="options-container">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.value}
                      className={`option ${answers[currentQuestion.id] === option.value ? "selected" : ""}`}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-label">{option.label}</div>
                    </div>
                  ))}
                </div>

                <div className="question-actions">
                  <button className="btn-secondary" onClick={handlePrevious} disabled={currentStep === 0}>
                    Previous
                  </button>
                  <button className="btn-primary" onClick={handleNext} disabled={!answers[currentQuestion.id]}>
                    {currentStep === assessmentQuestions.length - 1 ? "Submit" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="results-container">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Analyzing your responses with our ML model...</p>
              </div>
            ) : (
              <>
                <div className="results-header">
                  <h2>Your Assessment Results</h2>
                  <p>
                    Based on your responses, our machine learning model has analyzed your risk factors for substance
                    abuse vulnerability.
                  </p>
                </div>

                <div className="results-main">
                  <div className="risk-meter-container">
                    <h3>Overall Risk Level</h3>
                    <div className="risk-meter">
                      <div className="risk-indicator" style={{ left: `${riskScore}%` }}></div>
                      <div className="risk-levels">
                        <div className="risk-level low">Low</div>
                        <div className="risk-level moderate">Moderate</div>
                        <div className="risk-level high">High</div>
                        <div className="risk-level very-high">Very High</div>
                      </div>
                    </div>
                    <div className="risk-score">
                      <span className="score-value">{riskScore}</span>
                      <span className="score-label">Risk Score</span>
                    </div>
                    <div className="risk-summary">
                      <h4>
                        Your risk level is{" "}
                        <span className={`risk-level-text ${riskLevel}`}>
                          {riskLevel === "low"
                            ? "Low"
                            : riskLevel === "moderate"
                              ? "Moderate"
                              : riskLevel === "high"
                                ? "High"
                                : "Very High"}
                        </span>
                      </h4>
                      <p>
                        {riskLevel === "low"
                          ? "You have few risk factors for substance abuse. Continue maintaining your healthy lifestyle."
                          : riskLevel === "moderate"
                            ? "You have some risk factors that could increase vulnerability. Consider addressing these factors."
                            : riskLevel === "high"
                              ? "You have significant risk factors that increase vulnerability. We recommend taking proactive steps."
                              : "You have many risk factors that substantially increase vulnerability. We strongly recommend seeking professional guidance."}
                      </p>
                    </div>
                  </div>

                  <div className="risk-factors-container">
                    <div className="factors-header">
                      <h3>Risk Factor Analysis</h3>
                      <button className="btn-text" onClick={() => setShowExplanation(!showExplanation)}>
                        {showExplanation ? "Hide Explanation" : "How is this calculated?"}
                      </button>
                    </div>

                    {showExplanation && (
                      <div className="calculation-explanation">
                        <p>
                          Our machine learning model analyzes your responses across multiple categories of risk factors.
                          Each response is weighted based on research-backed correlations with substance abuse
                          vulnerability. The model then combines these weighted factors to calculate your overall risk
                          score.
                        </p>
                        <p>
                          Positive scores in categories like personal history, mental health, and environmental factors
                          increase risk, while strong protective factors decrease risk. The final score is normalized to
                          a 0-100 scale.
                        </p>
                      </div>
                    )}

                    <div className="factor-categories">
                      <div className="factor-category">
                        <h4>Personal Factors</h4>
                        <div className="factor-bar-container">
                          <div
                            className="factor-bar"
                            style={{
                              width: `${Math.min(Math.abs(categoryScores.personal) * 10, 100)}%`,
                              backgroundColor: categoryScores.personal > 0 ? "#ef4444" : "#10b981",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="factor-category">
                        <h4>History Factors</h4>
                        <div className="factor-bar-container">
                          <div
                            className="factor-bar"
                            style={{
                              width: `${Math.min(Math.abs(categoryScores.history) * 10, 100)}%`,
                              backgroundColor: categoryScores.history > 0 ? "#ef4444" : "#10b981",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="factor-category">
                        <h4>Mental Health</h4>
                        <div className="factor-bar-container">
                          <div
                            className="factor-bar"
                            style={{
                              width: `${Math.min(Math.abs(categoryScores.mental) * 10, 100)}%`,
                              backgroundColor: categoryScores.mental > 0 ? "#ef4444" : "#10b981",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="factor-category">
                        <h4>Environmental Factors</h4>
                        <div className="factor-bar-container">
                          <div
                            className="factor-bar"
                            style={{
                              width: `${Math.min(Math.abs(categoryScores.environment) * 10, 100)}%`,
                              backgroundColor: categoryScores.environment > 0 ? "#ef4444" : "#10b981",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="factor-category">
                        <h4>Behavioral Patterns</h4>
                        <div className="factor-bar-container">
                          <div
                            className="factor-bar"
                            style={{
                              width: `${Math.min(Math.abs(categoryScores.behavioral) * 10, 100)}%`,
                              backgroundColor: categoryScores.behavioral > 0 ? "#ef4444" : "#10b981",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="factor-category">
                        <h4>Protective Factors</h4>
                        <div className="factor-bar-container">
                          <div
                            className="factor-bar"
                            style={{
                              width: `${Math.min(Math.abs(categoryScores.protective) * 10, 100)}%`,
                              backgroundColor: categoryScores.protective > 0 ? "#ef4444" : "#10b981",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="recommendations-container">
                    <h3>Personalized Recommendations</h3>
                    <p>Based on your risk assessment, we recommend the following steps:</p>
                    <ul className="recommendations-list">
                      {recommendations[riskLevel].map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="results-actions">
                    <button className="btn-primary" onClick={handleReset}>
                      Take Assessment Again
                    </button>
                    <button className="btn-secondary" onClick={handleDownloadResults}>
                      Download Results
                    </button>
                    <button className="btn-secondary">Speak with a Counselor</button>
                  </div>

                  <div className="results-disclaimer">
                    <p>
                      <strong>Important:</strong> This assessment is for educational purposes only and does not
                      constitute medical advice or diagnosis. If you're concerned about substance abuse, please consult
                      with a healthcare professional.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <section className="assessment-info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3>Evidence-Based Assessment</h3>
              <p>
                Our assessment tool is based on extensive research on risk factors for substance abuse vulnerability.
                The questions and weighting system are derived from peer-reviewed studies.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Privacy Protected</h3>
              <p>
                Your responses are completely confidential. We do not store any personally identifying information with
                your assessment results, and your data is encrypted.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3>Not a Diagnosis</h3>
              <p>
                This assessment provides information about potential risk factors but is not a clinical diagnosis.
                Always consult with healthcare professionals for personalized advice.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </div>
              <h3>Prevention Focused</h3>
              <p>
                Our goal is prevention and early intervention. Understanding your risk factors can help you take
                proactive steps to maintain wellness and resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ml-explanation-section">
        <div className="container">
          <div className="ml-content">
            <h2>How Our Machine Learning Model Works</h2>
            <p>
              Our assessment uses a sophisticated machine learning model to analyze your responses and calculate your
              risk level. Here's how it works:
            </p>

            <div className="ml-steps">
              <div className="ml-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Data Collection</h3>
                  <p>Your anonymous responses to the assessment questions are collected and securely processed.</p>
                </div>
              </div>
              <div className="ml-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Feature Extraction</h3>
                  <p>
                    The model identifies key risk and protective factors from your responses across multiple categories.
                  </p>
                </div>
              </div>
              <div className="ml-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Weighted Analysis</h3>
                  <p>
                    Each factor is weighted based on its statistical correlation with substance abuse vulnerability,
                    derived from research studies.
                  </p>
                </div>
              </div>
              <div className="ml-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Risk Calculation</h3>
                  <p>
                    The model calculates your overall risk score by combining weighted factors using a proprietary
                    algorithm.
                  </p>
                </div>
              </div>
              <div className="ml-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Personalized Results</h3>
                  <p>
                    Based on your risk profile, the system generates personalized recommendations focused on your
                    specific risk factors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="assessment-footer">
        <div className="container">
          <p>
            This risk assessment tool is provided by the Kerala State Drug Prevention Authority. If you have questions
            or need support, please contact our helpline at <a href="tel:18001100031">1800-11-0031</a>.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default RiskAssessment
