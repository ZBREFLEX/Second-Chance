import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const CheckVictimDetails = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const checkDetails = async () => {
      if (!user || user.role !== "victim") {
        console.log("User not found or not victim");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/victim-details/${user.id}`);
        if (res.status === 200 && res.data) {
          console.log("Details found, navigating to dashboard");
          navigate("/victim/dashboard"); // ✅ important
        } else {
          console.log("Details not found, navigating to form");
          navigate("/victim/victim-details");
        }
      } catch (error) {
        console.error("API error:", error);
        navigate("/victim/victim-details");
      }
    };

    checkDetails();
  }, [navigate, user]);

  return <p>Checking details...</p>;
};

export default CheckVictimDetails;
