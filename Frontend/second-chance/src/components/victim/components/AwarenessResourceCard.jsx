"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  ExternalLink,
  BookOpen,
  Video,
  FileText,
  Headphones,
  Download
} from "react-feather"

import Sidebar from "../components/Sidebar"
import "../styles/AwarenessHub.css"

const AwarenessHub = ({ onLogout }) => {
  const [resources, setResources] = useState([])
  const [filteredResources, setFilteredResources] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState({
    type: "all",
    category: "all",
  })

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // Simulating API call with timeout
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sample data
      const resourceData = [
        {
          id: 1,
          title: "Understanding Addiction: The Science Behind Substance Abuse",
          description:
            "Learn about the neurological and psychological aspects of addiction and how substances affect the brain.",
          type: "article",
          category: "education",
          source: "National Institute on Drug Abuse",
          date: "2023-03-15",
          link: "#",
          featured: true,
        },
        {
          id: 2,
          title: "Recovery Stories: Path to Sobriety",
          description:
            "Real stories from individuals who have successfully overcome addiction and rebuilt their lives.",
          type: "video",
          category: "inspiration",
          source: "Recovery Alliance",
          date: "2023-04-10",
          link: "#",
          duration: "18:24",
          featured: true,
        },
        {
          id: 3,
          title: "Coping Mechanisms for Triggers",
          description: "Practical strategies to identify and manage triggers that may lead to substance use.",
          type: "guide",
          category: "coping",
          source: "Addiction Support Network",
          date: "2023-02-28",
          link: "#",
          featured: false,
        },
        {
          id: 4,
          title: "Mindfulness Meditation for Recovery",
          description: "Guided meditation specifically designed to help with addiction recovery and stress management.",
          type: "audio",
          category: "coping",
          source: "Mindful Recovery",
          date: "2023-01-20",
          link: "#",
          duration: "15:10",
          featured: false,
        },
        {
          id: 5,
          title: "Family Support in Recovery",
          description: "How family members can provide effective support for loved ones going through recovery.",
          type: "article",
          category: "support",
          source: "Family Recovery Center",
          date: "2023-04-25",
          link: "#",
          featured: false,
        },
        {
          id: 6,
          title: "The Neuroscience of Addiction and Recovery",
          description:
            "An in-depth look at how addiction affects the brain and the neurological processes involved in recovery.",
          type: "video",
          category: "education",
          source: "Brain Science Institute",
          date: "2023-05-05",
          link: "#",
          duration: "45:12",
          featured: true,
        },
        {
          id: 7,
          title: "Building a Sober Support Network",
          description: "Strategies for creating and maintaining relationships that support your recovery journey.",
          type: "guide",
          category: "support",
          source: "Recovery Community Alliance",
          date: "2023-03-30",
          link: "#",
          featured: false,
        },
        {
          id: 8,
          title: "Relapse Prevention Workbook",
          description:
            "Interactive workbook with exercises to help identify warning signs and develop prevention strategies.",
          type: "download",
          category: "coping",
          source: "Prevention First",
          date: "2023-02-15",
          link: "#",
          featured: false,
        },
      ]

      setResources(resourceData)
      setFilteredResources(resourceData)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    filterResources()
  }, [searchTerm, activeFilters, resources])

  const filterResources = () => {
    let filtered = [...resources]

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply type filter
    if (activeFilters.type !== "all") {
      filtered = filtered.filter((resource) => resource.type === activeFilters.type)
    }

    // Apply category filter
    if (activeFilters.category !== "all") {
      filtered = filtered.filter((resource) => resource.category === activeFilters.category)
    }

    setFilteredResources(filtered)
  }

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const getResourceIcon = (type) => {
    switch (type) {
      case "article":
        return <BookOpen size={20} />
      case "video":
        return <Video size={20} />
      case "guide":
        return <FileText size={20} />
      case "audio":
        return <Headphones size={20} />
      case "download":
        return <Download size={20} />
      default:
        return <BookOpen size={20} />
    }
  }

  const renderFeaturedResources = () => {
    const featured = resources.filter((resource) => resource.featured)

    return (
      <div className="featured-resources">
        <h2>Featured Resources</h2>
        <div className="featured-grid">
          {featured.map((resource) => (
            <div key={resource.id} className="featured-card">
              <div className="resource-type-badge">
                {getResourceIcon(resource.type)}
                <span>{resource.type}</span>
              </div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <div className="resource-meta">
                <span className="resource-source">{resource.source}</span>
                {resource.duration && <span className="resource-duration">{resource.duration}</span>}
              </div>
              <a href={resource.link} className="resource-link" target="_blank" rel="noopener noreferrer">
                View Resource <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={onLogout} />

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Awareness Hub</h1>
          <p className="hub-subtitle">Educational resources to support your recovery journey</p>
        </header>

        {isLoading ? (
          <div className="loading">Loading resources...</div>
        ) : (
          <>
            {renderFeaturedResources()}

            <div className="resource-filters">
              <div className="search-container">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-container">
                <div className="filter-group">
                  <label>
                    <Filter size={16} />
                    Type:
                  </label>
                  <select value={activeFilters.type} onChange={(e) => handleFilterChange("type", e.target.value)}>
                    <option value="all">All Types</option>
                    <option value="article">Articles</option>
                    <option value="video">Videos</option>
                    <option value="guide">Guides</option>
                    <option value="audio">Audio</option>
                    <option value="download">Downloads</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Category:</label>
                  <select
                    value={activeFilters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="education">Education</option>
                    <option value="coping">Coping Strategies</option>
                    <option value="support">Support</option>
                    <option value="inspiration">Inspiration</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="resource-list">
              <h2>All Resources</h2>
              {filteredResources.length === 0 ? (
                <div className="no-resources">
                  <p>No resources match your search criteria. Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="resource-grid">
                  {filteredResources.map((resource) => (
                    <div key={resource.id} className="resource-card">
                      <div className="resource-icon">{getResourceIcon(resource.type)}</div>
                      <div className="resource-content">
                        <h3>{resource.title}</h3>
                        <p>{resource.description}</p>
                        <div className="resource-meta">
                          <span className="resource-type">{resource.type}</span>
                          <span className="resource-source">{resource.source}</span>
                          <span className="resource-date">{new Date(resource.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <a href={resource.link} className="resource-action" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default AwarenessHub
