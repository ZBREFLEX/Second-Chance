import { Navigate } from "react-router-dom"

const ProtectedChatRoute = ({ children }) => {
  // Check if a counselor has been selected
  const selectedCounselor = localStorage.getItem("selectedCounselor")

  if (!selectedCounselor) {
    // If no counselor is selected, redirect to the counselor selection page
    return <Navigate to="/victim/counselor-selection" />
  }

  // If a counselor is selected, render the chat component
  return children
}

export default ProtectedChatRoute
