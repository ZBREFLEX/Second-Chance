// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";           // Axios instance with JWT interceptor

const ProtectedRoute = ({ children }) => {
  const [ok, setOk] = useState(null);   // null = loading → true / false

  useEffect(() => {
    (async () => {
      try {
        // Axios hits http://localhost:3000/api/counselor/profile
        // and returns JSON as { status: 'approved' | ... }
        const { data } = await API.get("/counselor/application-status");
        setOk(data.status === "approved");
      } catch (err) {
        console.error(err);
        setOk(false);                   // treat any error as “not approved”
      }
    })();
  }, []);

  if (ok === null) return null;         // TODO: add a spinner if you like
  if (!ok)      return <Navigate to="/counselor/application-status" replace />;
  return children;
};

export default ProtectedRoute;
