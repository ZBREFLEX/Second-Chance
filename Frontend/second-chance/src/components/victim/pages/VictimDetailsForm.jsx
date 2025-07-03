import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/VictimDetailsForm.css"

const VictimDetailsForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    user_id: user?.id,
    age: "",
    gender: "male",
    location: "",
    occupation: "",
    drug_type: "",
    duration_of_use: "",
    frequency: "daily",
    last_use_date: "",
    mental_health_issues: "",
    physical_health_issues: "",
    support_system: "moderate"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/victim-details", formData);
      alert("Details submitted successfully.");
      navigate("/victim/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error submitting details.");
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Your Details</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <select name="gender" onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="text" name="occupation" placeholder="Occupation" onChange={handleChange} required />
        <input type="text" name="drug_type" placeholder="Drug Type" onChange={handleChange} required />
        <input type="text" name="duration_of_use" placeholder="Duration of Use" onChange={handleChange} required />
        <select name="frequency" onChange={handleChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="rarely">Rarely</option>
        </select>
        <input type="date" name="last_use_date" onChange={handleChange} required />
        <textarea name="mental_health_issues" placeholder="Mental Health Issues" onChange={handleChange} />
        <textarea name="physical_health_issues" placeholder="Physical Health Issues" onChange={handleChange} />
        <select name="support_system" onChange={handleChange}>
          <option value="strong">Strong</option>
          <option value="moderate">Moderate</option>
          <option value="weak">Weak</option>
          <option value="none">None</option>
        </select>
        <button type="submit">Submit & Continue</button>
      </form>
    </div>
  );
};

export default VictimDetailsForm;
