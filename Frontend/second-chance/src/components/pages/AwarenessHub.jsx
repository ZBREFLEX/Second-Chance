"use client"

import { useState } from "react"
import "./css/AwarenessHub.css"

// Mock data for resources
const resources = [
  {
    id: 1,
    type: "article",
    title: "Understanding Drug Addiction: Signs and Symptoms",
    description:
      "Learn to recognize the early warning signs of drug addiction and how to approach someone who might be struggling.",
    author: "Dr. Sarah Johnson",
    date: "2023-05-15",
    readTime: "8 min read",
    image: "/images/article-1.jpg",
    category: "education",
    featured: true,
  },
  {
    id: 2,
    type: "video",
    title: "The Science of Addiction Explained",
    description:
      "This video breaks down how drugs affect the brain and why addiction is considered a disease rather than a choice.",
    duration: "12:45",
    thumbnail: "/images/video-1.jpg",
    videoUrl: "https://www.youtube.com/embed/lDF2t5D7Cmg?si=TUS5DtakrT6KJxx6",
    category: "science",
    featured: true,
  },
  {
    id: 3,
    type: "infographic",
    title: "Drug Abuse Statistics in Kerala: 2023 Report",
    description: "Visual representation of current drug abuse trends across different districts in Kerala.",
    image: "/images/infographic-1.jpg",
    category: "statistics",
    downloadable: true,
    featured: false,
  },
  {
    id: 4,
    type: "article",
    title: "Effective Prevention Strategies for Communities",
    description: "Community-based approaches that have proven effective in reducing drug abuse rates among youth.",
    author: "Community Health Network",
    date: "2023-06-22",
    readTime: "12 min read",
    image: "/images/article-2.jpg",
    category: "prevention",
    featured: false,
  },
  {
    id: 5,
    type: "video",
    title: "Recovery Stories: Journey to Sobriety",
    description: "Real people share their experiences with addiction and the path to recovery.",
    duration: "24:10",
    thumbnail: "/images/video-2.jpg",
    videoUrl: "https://www.youtube.com/embed/7eJb0_dw-yw",
    category: "recovery",
    featured: true,
  },
  {
    id: 6,
    type: "pdf",
    title: "Parent's Guide to Talking About Drugs",
    description:
      "A comprehensive guide for parents on how to discuss drug abuse with children of different age groups.",
    image: "/images/pdf-1.jpg",
    category: "family",
    downloadable: true,
    featured: false,
  },
  {
    id: 7,
    type: "article",
    title: "The Role of Mental Health in Addiction",
    description: "Exploring the connection between mental health disorders and substance abuse.",
    author: "Dr. Michael Patel",
    date: "2023-04-10",
    readTime: "10 min read",
    image: "/images/article-3.jpg",
    category: "health",
    featured: false,
  },
  {
    id: 8,
    type: "video",
    title: "How to Support a Loved One in Recovery",
    description: "Practical advice for family members and friends of someone recovering from addiction.",
    duration: "18:30",
    thumbnail: "/images/video-3.jpg",
    videoUrl: "https://www.youtube.com/embed/1YLUHyKhlZA",
    category: "family",
    featured: false,
  },
  {
    id: 9,
    type: "infographic",
    title: "Common Drugs and Their Effects",
    description: "Visual guide to different substances, their effects on the body, and potential dangers.",
    image: "/images/infographic-2.jpg",
    category: "education",
    downloadable: true,
    featured: false,
  },
  {
    id: 10,
    type: "article",
    title: "School-Based Prevention Programs That Work",
    description: "Evidence-based approaches for educators to implement effective drug prevention in schools.",
    author: "Education Research Institute",
    date: "2023-07-05",
    readTime: "15 min read",
    image: "/images/article-4.jpg",
    category: "prevention",
    featured: false,
  },
  {
    id: 11,
    type: "pdf",
    title: "Recovery Resources Directory",
    description: "Comprehensive list of treatment centers, support groups, and helplines across Kerala.",
    image: "/images/pdf-2.jpg",
    category: "recovery",
    downloadable: true,
    featured: false,
  },
  {
    id: 12,
    type: "video",
    title: "Understanding Withdrawal and Detox",
    description: "Medical explanation of the withdrawal process and what to expect during detoxification.",
    duration: "15:20",
    thumbnail: "/images/video-4.jpg",
    videoUrl: "https://www.youtube.com/embed/OPmRQ9lE2Sk",
    category: "health",
    featured: false,
  },
]

// Categories for filtering
const categories = [
  { id: "all", name: "All Resources" },
  { id: "education", name: "Education" },
  { id: "prevention", name: "Prevention" },
  { id: "recovery", name: "Recovery" },
  { id: "family", name: "Family Support" },
  { id: "health", name: "Health & Science" },
  { id: "statistics", name: "Statistics" },
]

// Resource types for filtering
const resourceTypes = [
  { id: "all", name: "All Types" },
  { id: "article", name: "Articles" },
  { id: "video", name: "Videos" },
  { id: "infographic", name: "Infographics" },
  { id: "pdf", name: "Downloadable PDFs" },
]

function AwarenessHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  // Filter resources based on search, category, and type
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  // Get featured resources
  const featuredResources = resources.filter((resource) => resource.featured)

  return (
    <div className="awareness-hub">
      <header className="hub-header">
        <div className="header-content">
          <h1>Drug Abuse Awareness Hub</h1>
          <p>Access educational resources, articles, and videos about drug abuse prevention and recovery</p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </header>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Resources</h2>
          <div className="featured-grid">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="featured-card">
                <div className="featured-image">
                  <img src={resource.image || resource.thumbnail} alt={resource.title} />
                  {resource.type === "video" && <span className="video-badge">Video</span>}
                </div>
                <div className="featured-content">
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <div className="resource-meta">
                    {resource.type === "article" && <span>{resource.readTime}</span>}
                    {resource.type === "video" && <span>{resource.duration}</span>}
                    {resource.downloadable && <span className="downloadable-badge">Downloadable</span>}
                  </div>
                  <button className="btn-primary">{resource.type === "video" ? "Watch Now" : "Read More"}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="resources-section">
        <div className="container">
          <div className="filter-container">
            <div className="filter-group">
              <label>Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Resource Type:</label>
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="filter-select">
                {resourceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="section-title">All Resources</h2>

          {filteredResources.length === 0 ? (
            <div className="no-results">
              <p>No resources found matching your criteria. Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="resources-grid">
              {filteredResources.map((resource) => (
                <div key={resource.id} className={`resource-card ${resource.type}-card`}>
                  <div className="resource-image">
                    <img src={resource.image || resource.thumbnail} alt={resource.title} />
                    <span className="resource-type-badge">{resource.type}</span>
                  </div>
                  <div className="resource-content">
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                    <div className="resource-meta">
                      {resource.type === "article" && (
                        <>
                          <span className="author">{resource.author}</span>
                          <span className="read-time">{resource.readTime}</span>
                        </>
                      )}
                      {resource.type === "video" && <span className="duration">{resource.duration}</span>}
                      {resource.downloadable && <span className="downloadable-badge">Downloadable</span>}
                    </div>
                    <button className="btn-secondary">
                      {resource.type === "video" ? "Watch Video" : resource.downloadable ? "Download" : "Read More"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="video-section">
        <div className="container">
          <h2 className="section-title">Featured Videos</h2>
          <div className="video-container">
            <div className="video-player">
              <iframe
                src="https://www.youtube.com/embed/SY_5wG5WwR8"
                title="The Science of Addiction Explained"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-playlist">
              <h3>More Videos</h3>
              <div className="playlist-items">
                {resources
                  .filter((resource) => resource.type === "video")
                  .map((video) => (
                    <div key={video.id} className="playlist-item">
                      <div className="playlist-thumbnail">
                        <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} />
                        <span className="duration-badge">{video.duration}</span>
                      </div>
                      <div className="playlist-info">
                        <h4>{video.title}</h4>
                        <p>{video.description.substring(0, 60)}...</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="help-section">
        <div className="container">
          <div className="help-content">
            <h2>Need Immediate Help?</h2>
            <p>If you or someone you know is struggling with substance abuse, help is available 24/7.</p>
            <div className="helpline-container">
              <div className="helpline">
                <h3>National Helpline</h3>
                <p className="phone">1800-11-0031</p>
                <p>Toll-free, confidential, 24/7</p>
              </div>
              <div className="helpline">
                <h3>Kerala State Helpline</h3>
                <p className="phone">14416</p>
                <p>Local support services</p>
              </div>
              <div className="helpline">
                <h3>Crisis Text Line</h3>
                <p className="phone">Text HOME to 741741</p>
                <p>Connect with a counselor</p>
              </div>
            </div>
            <button className="btn-primary btn-large">Find Treatment Centers Near You</button>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Informed</h2>
            <p>Subscribe to our newsletter to receive the latest resources and updates on drug prevention.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AwarenessHub
