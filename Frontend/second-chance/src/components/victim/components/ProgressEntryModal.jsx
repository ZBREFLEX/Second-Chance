import { useState } from "react";
import "../styles/Modal.css";

const ProgressEntryModal = ({ isOpen, onClose, onSubmit }) => {
  const [date, setDate] = useState("");
  const [wellbeing, setWellbeing] = useState(50);
  const [cravings, setCravings] = useState(50);

  const handleSubmit = () => {
    onSubmit({ date, wellbeing, cravings });
    setDate("");
    setWellbeing(50);
    setCravings(50);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>Add Weekly Progress</h3>
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Wellbeing (0-100)</label>
        <input type="number" value={wellbeing} min="0" max="100" onChange={(e) => setWellbeing(e.target.value)} />

        <label>Cravings (0-100)</label>
        <input type="number" value={cravings} min="0" max="100" onChange={(e) => setCravings(e.target.value)} />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProgressEntryModal;
