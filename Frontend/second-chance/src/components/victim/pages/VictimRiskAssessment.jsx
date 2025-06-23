"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, Check, AlertTriangle, Info } from "react-feather"
import Sidebar from "../components/Sidebar"
import { predictRiskLevel } from "../components/utils/riskPredictionModel"
import "../styles/RiskAssessment.css"

const RiskAssessment = ({ onLogout }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [previousAssessments, setPreviousAssessments] = useState([])
  const [showInfo, setShowInfo] = useState(false)

  // Fetch previous assessments on component mount
  useEffect(() => {
    const fetchPreviousAssessments = async () => {
      try {
        // In a real app, you would fetch this from your API
        // For now, we'll use mock data
        const mockPreviousAssessments = [
          {
            date: "2023-04-15",
            score: 8,
            maxScore: 20,
            riskLevel: "Low",
          },
          {
            date: "2023-05-01",
            score: 12,
            maxScore: 20,
            riskLevel: "Moderate",
          },
        ]

        setPreviousAssessments(mockPreviousAssessments)
      } catch (error) {
        console.error("Error fetching previous assessments:", error)
      }
    }

    fetchPreviousAssessments()
  }, [])

  // Sample questions for the risk assessment
  const questions = [
    {
      id: "frequency",
      question: "How often have you used substances in the past month?",
      info: "This helps us understand your current usage patterns.",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Once or twice" },
        { value: 2, label: "Weekly" },
        { value: 3, label: "Several times a week" },
        { value: 4, label: "Daily" },
      ],
    },
    {
      id: "cravings",
      question: "How strong are your cravings or urges to use substances?",
      info: "Cravings are a normal part of recovery and understanding their intensity helps in treatment planning.",
      options: [
        { value: 0, label: "None" },
        { value: 1, label: "Mild" },
        { value: 2, label: "Moderate" },
        { value: 3, label: "Strong" },
        { value: 4, label: "Very strong" },
      ],
    },
    {
      id: "control",
      question: "How difficult is it for you to stop using once you start?",
      info: "This question helps assess your level of control over substance use.",
      options: [
        { value: 0, label: "Not difficult" },
        { value: 1, label: "Slightly difficult" },
        { value: 2, label: "Moderately difficult" },
        { value: 3, label: "Very difficult" },
        { value: 4, label: "Extremely difficult/impossible" },
      ],
    },
    {
      id: "withdrawal",
      question: "Do you experience withdrawal symptoms when you stop using?",
      info: "Withdrawal symptoms can include anxiety, irritability, nausea, or physical discomfort.",
      options: [
        { value: 0, label: "Never" },
        { value: 1, label: "Rarely" },
        { value: 2, label: "Sometimes" },
        { value: 3, label: "Often" },
        { value: 4, label: "Always" },
      ],
    },
    {
      id: "impact",
      question: "How much has substance use negatively impacted your daily life?",
      info: "This includes effects on relationships, work, health, or other important areas of your life.",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Slightly" },
        { value: 2, label: "Moderately" },
        { value: 3, label: "Considerably" },
        { value: 4, label: "Severely" },
      ],
    },
  ]

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, you would send the answers to your API for analysis
      // Here we'll use our ML model to analyze the results
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call

      // Extract the values from answers object
      const answerValues = Object.values(answers)

      // Calculate basic score
      const totalScore = answerValues.reduce((sum, value) => sum + value, 0)
      const maxPossibleScore = questions.length * 4

      // Use ML model to predict risk level
      const mlPrediction = await predictRiskLevel({
        frequency: answers.frequency || 0,
        cravings: answers.cravings || 0,
        control: answers.control || 0,
        withdrawal: answers.withdrawal || 0,
        impact: answers.impact || 0,
      })

      // Set the result with ML prediction
      setResult({
        score: totalScore,
        maxScore: maxPossibleScore,
        percentage: (totalScore / maxPossibleScore) * 100,
        riskLevel: mlPrediction.riskLevel,
        riskProbability: mlPrediction.probability,
        riskFactors: mlPrediction.riskFactors,
        date: new Date().toISOString().split("T")[0],
      })

      // In a real app, you would save this assessment to the user's history
    } catch (error) {
      console.error("Error submitting assessment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetAssessment = () => {
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className="dashboard-layout">
      <Sidebar onLogout={onLogout} />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Risk Assessment</h1>
          <p className="assessment-subtitle">
            Answer honestly to get an accurate assessment of your current risk level
          </p>
        </header>

        {!result ? (
          <div className="assessment-container">
            <div className="assessment-progress">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`progress-step ${index === currentStep ? "active" : ""} ${
                    index < currentStep ? "completed" : ""
                  }`}
                >
                  {index < currentStep ? <Check size={16} /> : index + 1}
                </div>
              ))}
            </div>

            <div className="assessment-question">
              <div className="question-header">
                <h2>{questions[currentStep].question}</h2>
                <button type="button" className="info-button" onClick={toggleInfo}>
                  <Info size={18} />
                </button>
              </div>

              {showInfo && (
                <div className="question-info">
                  <p>{questions[currentStep].info}</p>
                </div>
              )}

              <div className="answer-options">
                {questions[currentStep].options.map((option) => (
                  <label
                    key={option.value}
                    className={`answer-option ${answers[questions[currentStep].id] === option.value ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name={questions[currentStep].id}
                      value={option.value}
                      checked={answers[questions[currentStep].id] === option.value}
                      onChange={() => handleAnswer(questions[currentStep].id, option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="assessment-actions">
              <button className="assessment-btn previous" onClick={handlePrevious} disabled={currentStep === 0}>
                <ArrowLeft size={16} />
                Previous
              </button>

              <button
                className="assessment-btn next"
                onClick={handleNext}
                disabled={answers[questions[currentStep].id] === undefined || isSubmitting}
              >
                {currentStep < questions.length - 1 ? (
                  <>
                    Next
                    <ArrowRight size={16} />
                  </>
                ) : isSubmitting ? (
                  "Analyzing..."
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="assessment-result">
            <div className="result-header">
              <h2>Your Risk Assessment Results</h2>
              <p>Completed on {new Date(result.date).toLocaleDateString()}</p>
            </div>

            <div className="result-card">
              <div
                className="result-level"
                style={{
                  backgroundColor:
                    result.riskLevel === "Low" ? "#4CAF50" : result.riskLevel === "Moderate" ? "#FF9800" : "#F44336",
                }}
              >
                <h3>{result.riskLevel} Risk</h3>
                <p>
                  {result.score} out of {result.maxScore} points
                </p>
                <div className="risk-probability">
                  <span>Confidence: {Math.round(result.riskProbability * 100)}%</span>
                </div>
              </div>

              <div className="result-details">
                <div className="result-meter">
                  <div className="meter-bar">
                    <div className="meter-fill" style={{ width: `${result.percentage}%` }}></div>
                  </div>
                  <div className="meter-labels">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="result-interpretation">
                  {result.riskLevel === "Low" && (
                    <p>
                      Your responses indicate a low risk level. Continue with your current strategies and stay vigilant.
                      Regular check-ins with your counselor are still recommended.
                    </p>
                  )}

                  {result.riskLevel === "Moderate" && (
                    <p>
                      Your responses indicate a moderate risk level. Consider increasing the frequency of counseling
                      sessions and be mindful of potential triggers. Review your coping strategies with your counselor.
                    </p>
                  )}

                  {result.riskLevel === "High" && (
                    <p>
                      Your responses indicate a high risk level. It's strongly recommended to contact your counselor
                      immediately and consider more intensive support options. You're not alone in this journey.
                    </p>
                  )}
                </div>

                {result.riskFactors && result.riskFactors.length > 0 && (
                  <div className="risk-factors">
                    <h4>
                      <AlertTriangle size={16} /> Key Risk Factors
                    </h4>
                    <ul>
                      {result.riskFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {previousAssessments.length > 0 && (
              <div className="previous-assessments">
                <h3>Previous Assessments</h3>
                <div className="assessment-history">
                  {previousAssessments.map((assessment, index) => (
                    <div key={index} className={`history-item ${assessment.riskLevel.toLowerCase()}`}>
                      <div className="history-date">{new Date(assessment.date).toLocaleDateString()}</div>
                      <div className="history-level">{assessment.riskLevel}</div>
                      <div className="history-score">
                        {assessment.score}/{assessment.maxScore}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="result-actions">
              <button className="assessment-btn" onClick={resetAssessment}>
                Take Assessment Again
              </button>
              <button className="assessment-btn primary">Schedule Counselor Session</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default RiskAssessment
