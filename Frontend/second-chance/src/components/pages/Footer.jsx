import React from "react";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="footerContent">
          <div className="footerSection">
            <h3 className="footerTitle">Second Chance</h3>
            <p className="footerText">
              A digital platform dedicated to drug abuse prevention, awareness, and support through collaboration.
            </p>
          </div>

          <div className="footerSection">
            <h3 className="footerTitle">Quick Links</h3>
            <ul className="footerLinks">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/awareness-hub">Awareness Hub</a></li>
              <li><a href="/anonymous-report">Report</a></li>
            </ul>
          </div>

          <div className="footerSection">
            <h3 className="footerTitle">Contact</h3>
            <ul className="footerLinks">
              <li>Email: contact@secondchance.org</li>
              <li>Phone: +1 (800) 555-HELP</li>
              <li>Emergency: 1-800-123-SAFE</li>
            </ul>
          </div>
        </div>

        <div className="footerBottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Second Chance. All rights reserved.
          </p>
          <div className="footerBottomLinks">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
