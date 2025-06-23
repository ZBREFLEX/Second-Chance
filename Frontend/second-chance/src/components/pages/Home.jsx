import { Link } from "react-router-dom"
import "./css/Home.css"

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="heroContent">
          <h1 className="heroTitle">Drug Abuse Prevention and Monitoring System</h1>
          <p className="heroSubtitle">
            A comprehensive platform for prevention, awareness, and support in the fight against drug abuse.
          </p>
          <div className="heroCta">
            <Link to="/register" className="primaryButton">
              Get Started
            </Link>
            <Link to="/anonymous-report" className="secondaryButton">
              Report Anonymously
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="sectionTitle">How We Help</h2>

          <div className="featureGrid">
            <div className="featureCard">
              <div className="featureIcon">📝</div>
              <h3 className="featureTitle">Risk Assessment</h3>
              <p className="featureDescription">
                Take our comprehensive risk assessment to understand your vulnerability to drug abuse.
              </p>
              <Link to="/risk-assessment" className="featureButton">Learn More</Link>
            </div>

            <div className="featureCard">
              <div className="featureIcon">🔒</div>
              <h3 className="featureTitle">Anonymous Reporting</h3>
              <p className="featureDescription">
                Report drug-related activities anonymously without fear of identification.
              </p>
              <Link to="/anonymous-report" className="featureButton">Learn More</Link>
            </div>

            <div className="featureCard">
              <div className="featureIcon">📊</div>
              <h3 className="featureTitle">Recovery Tracking</h3>
              <p className="featureDescription">
                Monitor your recovery journey with personalized tracking tools and insights.
              </p>
               <Link to="/recovery-tracking" className="featureButton">Learn More</Link>
            </div>

            <div className="featureCard">
              <div className="featureIcon">💬</div>
              <h3 className="featureTitle">Counselor Communication</h3>
              <p className="featureDescription">
                Connect with certified counselors through our secure communication portal.
              </p>
              <Link to="/counselor-chat" className="featureButton">Learn More</Link>
            </div>

            <div className="featureCard">
              <div className="featureIcon">📚</div>
              <h3 className="featureTitle">Awareness Hub</h3>
              <p className="featureDescription">
                Access educational resources, articles, and videos about drug abuse prevention.
              </p>
              <Link to="/awareness-hub" className="featureButton">Learn More</Link>
            </div>

            <div className="featureCard">
              <div className="featureIcon">🗺️</div>
              <h3 className="featureTitle">Geo Mapping</h3>
              <p className="featureDescription">
                Visualize drug-related incidents and support centers on an interactive map.
              </p>
              <Link to="/KeralaMap" className="featureButton">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="statsGrid">
            <div className="statCard">
              <h3 className="statNumber">500+</h3>
              <p className="statLabel">People Helped</p>
            </div>

            <div className="statCard">
              <h3 className="statNumber">50+</h3>
              <p className="statLabel">Certified Counselors</p>
            </div>

            <div className="statCard">
              <h3 className="statNumber">25+</h3>
              <p className="statLabel">Partner NGOs</p>
            </div>

            <div className="statCard">
              <h3 className="statNumber">100%</h3>
              <p className="statLabel">Confidential</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2 className="ctaTitle">Ready to Take the First Step?</h2>
          <p className="ctaText">
            Join our platform today and get access to all the tools and resources you need for prevention and recovery.
          </p>
          <Link to="/register" className="ctaButton">
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home