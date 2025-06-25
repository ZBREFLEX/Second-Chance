// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";           // Axios instance with JWT interceptor

const ProtectedRoute = ({ children }) => {
  const [ok, setOk] = useState(null);   // null = loading → true / false

  useEffect(() => {
    (async () => {
      try {
<<<<<<< HEAD
        // Axios hits http://localhost:5000/api/counselors/application-status
=======
        // Axios hits http://localhost:5000/api/counselor/profile
>>>>>>> 9d9ad94 (updates code)
        // and returns JSON as { status: 'approved' | ... }
        const { data } = await API.get("/counselors/application-status");
        setOk(data.status === "approved");
      } catch (err) {
        console.error(err);
        setOk(false);                   // treat any error as "not approved"
      }
    })();
  }, []);

  if (ok === null) return null;         // TODO: add a spinner if you like
  if (!ok)      return <Navigate to="/counselor/application-status" replace />;
  return children;
};

export default ProtectedRoute;