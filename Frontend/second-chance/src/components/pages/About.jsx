import { Link } from "react-router-dom";
import "./css/About.css";

const About = () => {
  return (
    <div className="aboutPage">
      <section className="aboutHero">
        <h1 className="aboutTitle">About Second Chance</h1>
        <p className="aboutSubtitle">
          Empowering communities through technology to prevent, report, and recover from drug abuse.
        </p>
      </section>

      <section className="aboutContent container">
        <h2>Our Mission</h2>
        <p>
          Our goal is to provide a safe, accessible, and collaborative platform that brings together individuals, counselors, NGOs, and communities to fight the growing problem of drug abuse. Through anonymous reporting, data-driven risk analysis, and real-time recovery support, we aim to save lives and build awareness.
        </p>

        <h2>Our Vision</h2>
        <p>
          To create a society where early intervention, empathy, and support replace fear and stigma. We envision a future where technology bridges the gap between victims and help, giving everyone a second chance.
        </p>
      </section>

      <section className="aboutGrid container">
        <div className="aboutCard">
          <h3>🧠 Awareness Campaigns</h3>
          <p>Collaborating with NGOs to educate and inform communities through videos, articles, and events.</p>
        </div>

        <div className="aboutCard">
          <h3>🛡️ Privacy First</h3>
          <p>Our platform allows for completely anonymous reporting and data protection through secure systems.</p>
        </div>

        <div className="aboutCard">
          <h3>🤝 Our Partners</h3>
          <p>Working hand-in-hand with certified counselors, local health groups, and support networks nationwide.</p>
        </div>
      </section>

      <section className="aboutCTA">
        <h2>Want to Get Involved?</h2>
        <p>
          Whether you're a volunteer, counselor, NGO, or someone in need — we're here for you.
        </p>
        <Link to="/register" className="ctaButton">Join Us</Link>
      </section>
    </div>
  );
};

export default About;
