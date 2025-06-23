// src/pages/ApplicationStatus.jsx            ← adjust path if different
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import API from "./api/api";

const ApplicationStatus = () => {
  const [status, setStatus] = useState("loading");  // 'loading' | 'pending' | 'approved' | 'rejected' | 'none' | 'error'
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      try {
        // Axios automatically sends the JWT (thanks to api.js interceptor)
        const { data } = await API.get("/counselor/application-status");
        // Expected payload: { status: 'pending' | 'approved' | 'rejected' | 'not_applied' }
        setStatus(data.status || "none");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    })();
  }, []);

  // ─── UI states ──────────────────────────────────────────────────────────
  if (status === "loading")   return <Layout>Loading…</Layout>;
  if (status === "error")     return <Layout>Unable to load status.</Layout>;
  if (status === "rejected")
    return (
      <Layout>
        <h2>Your application was rejected.</h2>
        <p>
          Please review the feedback emailed to you and apply again if you wish.
        </p>
      </Layout>
    );
  if (status === "pending")
    return (
      <Layout>
        <h2>Application Pending</h2>
        <p>Thanks for applying! An admin will review it soon.</p>
      </Layout>
    );
  if (status === "approved") {
     navigate('/counselor');
    return (
      <Layout>
        <h2>Congratulations!</h2>
        <p>Your application is approved. You now have counselor access.</p>
      </Layout>
    );
  }
  // status === 'not_applied' or anything else
  return (
    <Layout>
      <h2>No Application</h2>
      <p>
        You haven’t applied yet.{" "}
        <a href="/counselor/counselorapply">Apply now →</a>
      </p>
    </Layout>
  );
};

export default ApplicationStatus;
