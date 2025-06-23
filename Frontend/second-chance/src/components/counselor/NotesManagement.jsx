"use client"

import { useState, useEffect } from "react"
import Layout from "./components/Layout"
import "./css/NotesManagement.css"

const NotesManagement = () => {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [notes, setNotes] = useState([])
  const [showNewNoteModal, setShowNewNoteModal] = useState(false)
  const [showEditNoteModal, setShowEditNoteModal] = useState(false)
  const [currentNote, setCurrentNote] = useState(null)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: [],
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTag, setFilterTag] = useState("")
  const [availableTags, setAvailableTags] = useState([
    "Medication",
    "Progress",
    "Relapse",
    "Family",
    "Crisis",
    "Treatment Plan",
  ])

  useEffect(() => {
    // Simulate API call to fetch patients
    setPatients([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Sarah Johnson" },
      { id: 3, name: "Michael Brown" },
      { id: 4, name: "Emily Wilson" },
      { id: 5, name: "Robert Garcia" },
    ])
  }, [])

  useEffect(() => {
    // Simulate API call to fetch notes for the selected patient
    if (selectedPatient) {
      const mockNotes = [
        {
          id: 1,
          patientId: selectedPatient.id,
          title: "Initial Assessment",
          content:
            "Patient shows signs of anxiety and depression. Recommended weekly counseling sessions and considering medication options.",
          createdAt: "2023-05-15T10:30:00",
          updatedAt: "2023-05-15T10:30:00",
          tags: ["Treatment Plan", "Medication"],
        },
        {
          id: 2,
          patientId: selectedPatient.id,
          title: "Progress Update",
          content:
            "Patient has been attending sessions regularly. Reports improved sleep patterns but still experiencing anxiety in social situations.",
          createdAt: "2023-05-22T11:15:00",
          updatedAt: "2023-05-22T11:15:00",
          tags: ["Progress"],
        },
        {
          id: 3,
          patientId: selectedPatient.id,
          title: "Family Session",
          content:
            "Met with patient and family members. Discussed communication strategies and support systems at home.",
          createdAt: "2023-05-29T14:00:00",
          updatedAt: "2023-05-29T14:00:00",
          tags: ["Family"],
        },
        {
          id: 4,
          patientId: selectedPatient.id,
          title: "Medication Review",
          content:
            "Patient reports side effects from current medication. Considering adjusting dosage or alternative options.",
          createdAt: "2023-06-05T09:45:00",
          updatedAt: "2023-06-05T09:45:00",
          tags: ["Medication"],
        },
        {
          id: 5,
          patientId: selectedPatient.id,
          title: "Crisis Intervention",
          content:
            "Emergency session due to relapse risk. Patient experienced significant stressors at work. Developed immediate coping strategies.",
          createdAt: "2023-06-10T16:30:00",
          updatedAt: "2023-06-10T16:30:00",
          tags: ["Crisis", "Relapse"],
        },
      ]
      setNotes(mockNotes)
    } else {
      setNotes([])
    }
  }, [selectedPatient])

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient)
  }

  const handleNewNote = () => {
    setNewNote({
      title: "",
      content: "",
      tags: [],
    })
    setShowNewNoteModal(true)
  }

  const handleEditNote = (note) => {
    setCurrentNote(note)
    setNewNote({
      title: note.title,
      content: note.content,
      tags: [...note.tags],
    })
    setShowEditNoteModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewNote({
      ...newNote,
      [name]: value,
    })
  }

  const handleTagToggle = (tag) => {
    if (newNote.tags.includes(tag)) {
      setNewNote({
        ...newNote,
        tags: newNote.tags.filter((t) => t !== tag),
      })
    } else {
      setNewNote({
        ...newNote,
        tags: [...newNote.tags, tag],
      })
    }
  }

  const handleSubmitNote = (e) => {
    e.preventDefault()

    if (!selectedPatient) return

    const now = new Date().toISOString()

    if (showEditNoteModal && currentNote) {
      // Update existing note
      const updatedNotes = notes.map((note) => {
        if (note.id === currentNote.id) {
          return {
            ...note,
            title: newNote.title,
            content: newNote.content,
            tags: newNote.tags,
            updatedAt: now,
          }
        }
        return note
      })
      setNotes(updatedNotes)
      setShowEditNoteModal(false)
    } else {
      // Create new note
      const newNoteObj = {
        id: notes.length + 1,
        patientId: selectedPatient.id,
        title: newNote.title,
        content: newNote.content,
        createdAt: now,
        updatedAt: now,
        tags: newNote.tags,
      }
      setNotes([...notes, newNoteObj])
      setShowNewNoteModal(false)
    }

    // In a real app, you would send this data to your backend
  }

  const handleDeleteNote = (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((note) => note.id !== noteId))
      // In a real app, you would send this request to your backend
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = filterTag ? note.tags.includes(filterTag) : true
    return matchesSearch && matchesTag
  })

  return (
    <Layout title="Notes Management">
      <div className="notes-management-container">
        <div className="patients-sidebar">
          <div className="sidebar-header">
            <h3>Patients</h3>
          </div>
          <div className="patients-list">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className={`patient-item ${selectedPatient?.id === patient.id ? "active" : ""}`}
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="patient-avatar"></div>
                <div className="patient-name">{patient.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="notes-content">
          {selectedPatient ? (
            <>
              <div className="notes-header">
                <h2>Notes for {selectedPatient.name}</h2>
                <button className="new-note-btn" onClick={handleNewNote}>
                  New Note
                </button>
              </div>

              <div className="notes-filters">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <div className="tag-filter">
                  <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="tag-select">
                    <option value="">All Tags</option>
                    {availableTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="notes-list">
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <div key={note.id} className="note-card">
                      <div className="note-header">
                        <h3>{note.title}</h3>
                        <div className="note-actions">
                          <button className="edit-note-btn" onClick={() => handleEditNote(note)} title="Edit Note">
                            <i className="edit-icon"></i>
                          </button>
                          <button
                            className="delete-note-btn"
                            onClick={() => handleDeleteNote(note.id)}
                            title="Delete Note"
                          >
                            <i className="delete-icon"></i>
                          </button>
                        </div>
                      </div>
                      <div className="note-meta">
                        <span className="note-date">Created: {formatDate(note.createdAt)}</span>
                        {note.updatedAt !== note.createdAt && (
                          <span className="note-date">Updated: {formatDate(note.updatedAt)}</span>
                        )}
                      </div>
                      <div className="note-content">
                        <p>{note.content}</p>
                      </div>
                      <div className="note-tags">
                        {note.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-notes">
                    <p>
                      No notes found.{" "}
                      {searchTerm || filterTag ? "Try adjusting your filters." : "Create a new note to get started."}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-patient-selected">
              <div className="no-patient-content">
                <div className="no-patient-icon"></div>
                <h3>Select a patient to view notes</h3>
                <p>Choose a patient from the list to view and manage their notes</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Note Modal */}
      {showNewNoteModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowNewNoteModal(false)}>
              &times;
            </span>
            <h2>New Note for {selectedPatient.name}</h2>
            <form onSubmit={handleSubmitNote}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newNote.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={newNote.content}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Tags</label>
                <div className="tags-container">
                  {availableTags.map((tag) => (
                    <div
                      key={tag}
                      className={`tag-option ${newNote.tags.includes(tag) ? "selected" : ""}`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowNewNoteModal(false)}>
                  Cancel
                </button>
                <button type="submit">Save Note</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {showEditNoteModal && currentNote && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditNoteModal(false)}>
              &times;
            </span>
            <h2>Edit Note for {selectedPatient.name}</h2>
            <form onSubmit={handleSubmitNote}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newNote.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={newNote.content}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Tags</label>
                <div className="tags-container">
                  {availableTags.map((tag) => (
                    <div
                      key={tag}
                      className={`tag-option ${newNote.tags.includes(tag) ? "selected" : ""}`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowEditNoteModal(false)}>
                  Cancel
                </button>
                <button type="submit">Update Note</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default NotesManagement
