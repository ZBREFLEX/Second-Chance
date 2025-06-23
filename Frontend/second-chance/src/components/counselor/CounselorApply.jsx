import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import API from "./api/api";

const CounselorApply = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    qualifications: '',
    experience_years: '',
    certifications: '',
    resume: null,
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = e =>
    setForm({ ...form, resume: e.target.files[0] || null });

  const handleSubmit = async e => {
    e.preventDefault();
    const body = new FormData();
    body.append('qualifications', form.qualifications);
    body.append('experience_years', String(form.experience_years));
    body.append('certifications', form.certifications);
    if (form.resume) body.append('resume', form.resume);

    try {
      await API.post('/counselor/apply', body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/counselor/application-status');
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.statusText ||
        err.message;
      alert(`Application failed: ${msg}`);
    }
  };


  return (
    <Layout title="Counselor Application">
      <form onSubmit={handleSubmit} className="apply-form">
        <label>Qualifications
          <textarea name="qualifications" value={form.qualifications} onChange={handleChange}/>
        </label>
        <label>Years of Experience
          <input name="experience_years" value={form.experience_years} onChange={handleChange} type="number"/>
        </label>
        <label>Certifications
          <textarea name="certifications" value={form.certifications} onChange={handleChange}/>
        </label>
        <label>Resume (PDF)
          <input type="file" accept=".pdf" onChange={handleFile}/>
        </label>
        <button type="submit">Submit Application</button>
      </form>
    </Layout>
  );
};
export default CounselorApply;
