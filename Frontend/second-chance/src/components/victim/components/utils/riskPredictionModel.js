/**
 * A simplified machine learning model for predicting risk levels based on assessment answers.
 * In a real application, this would be a more sophisticated model, potentially using
 * TensorFlow.js or a server-side ML model via API.
 */

// Weights for each factor (these would be determined by training a real ML model)
const FACTOR_WEIGHTS = {
  frequency: 0.25,
  cravings: 0.2,
  control: 0.25,
  withdrawal: 0.15,
  impact: 0.15,
}

// Risk level thresholds
const RISK_THRESHOLDS = {
  low: 0.33,
  moderate: 0.66,
}

/**
 * Predicts the risk level based on assessment answers
 * @param {Object} answers - The user's answers to the assessment questions
 * @returns {Object} The predicted risk level, probability, and risk factors
 */
export const predictRiskLevel = async (answers) => {
  // Simulate API call or model inference time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Calculate weighted score
  let weightedScore = 0
  let maxWeightedScore = 0

  for (const [factor, weight] of Object.entries(FACTOR_WEIGHTS)) {
    weightedScore += (answers[factor] || 0) * weight
    maxWeightedScore += 4 * weight // 4 is the max value for each answer
  }

  // Normalize to 0-1 range
  const normalizedScore = weightedScore / maxWeightedScore

  // Determine risk level
  let riskLevel
  if (normalizedScore < RISK_THRESHOLDS.low) {
    riskLevel = "Low"
  } else if (normalizedScore < RISK_THRESHOLDS.moderate) {
    riskLevel = "Moderate"
  } else {
    riskLevel = "High"
  }

  // Identify key risk factors (factors with highest contribution to risk)
  const riskFactors = []
  const sortedFactors = Object.entries(answers)
    .map(([factor, value]) => ({
      factor,
      value,
      contribution: value * FACTOR_WEIGHTS[factor],
    }))
    .sort((a, b) => b.contribution - a.contribution)

  // Add top risk factors with significant contribution
  for (const { factor, value } of sortedFactors) {
    if (value >= 3) {
      // Only include factors with high values (3 or 4)
      switch (factor) {
        case "frequency":
          riskFactors.push("Frequent substance use")
          break
        case "cravings":
          riskFactors.push("Strong cravings or urges")
          break
        case "control":
          riskFactors.push("Difficulty controlling substance use")
          break
        case "withdrawal":
          riskFactors.push("Withdrawal symptoms when stopping use")
          break
        case "impact":
          riskFactors.push("Significant negative impact on daily life")
          break
      }
    }

    // Limit to top 3 factors
    if (riskFactors.length >= 3) break
  }

  // Add confidence level (probability)
  // This simulates the model's confidence in its prediction
  // In a real ML model, this would be the actual probability from the model
  let probability
  if (normalizedScore < 0.2 || normalizedScore > 0.8) {
    // High confidence for very low or very high scores
    probability = 0.9 + Math.random() * 0.1
  } else if (normalizedScore < 0.3 || normalizedScore > 0.7) {
    // Moderate-high confidence
    probability = 0.8 + Math.random() * 0.1
  } else if (normalizedScore < 0.4 || normalizedScore > 0.6) {
    // Moderate confidence
    probability = 0.7 + Math.random() * 0.1
  } else {
    // Lower confidence for borderline cases
    probability = 0.6 + Math.random() * 0.1
  }

  return {
    riskLevel,
    probability,
    riskFactors,
    normalizedScore,
  }
}
