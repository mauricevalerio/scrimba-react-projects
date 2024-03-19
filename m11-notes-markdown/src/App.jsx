import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { query, orderBy, addDoc, setDoc, deleteDoc, onSnapshot, doc } from "firebase/firestore"
import { db, notesRef } from "./firebase"

export default function App() {
  const [notes, setNotes] = useState([])

  const [currentNoteId, setCurrentNoteId] = useState("")

  const [tempNoteText, setTempNoteText] = useState("")

  const currentNote = notes.find((note) => note.id === currentNoteId) 
  || notes[0]

  useEffect(() => {
    //onSnapshot creates a web socket connection to the DB.
    //everytime the component unmounts, it must unsubscribe to the web socket
    //so that it will stop listening for changes
    const q = query(notesRef, orderBy("updatedAt", "desc"))
    const unsub = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    return unsub
  
  }, [])

  useEffect(() => {
    if (!currentNoteId) {
        setCurrentNoteId(notes[0]?.id)
    }
  }, [notes])

  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body)
    }
  }, [currentNote])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote?.body) {
        updateNote(tempNoteText)
    }
    }, 500)
    return () => clearTimeout(timeoutId)
}, [tempNoteText])

  async function createNewNote() {
    const newNoteRef = await addDoc(notesRef, 
      {
        body: "# Type your markdown note's title here",
        createdAt: Date.now(),
        updatedAt: Date.now()
      })
    setCurrentNoteId(newNoteRef.id)
  }

  async function updateNote(text) {
    await setDoc(
      doc(db, "notes", currentNoteId), 
      { body: text, updatedAt: Date.now() },
      { merge: true })
  }

  async function deleteNote(noteId) {
    await deleteDoc(doc(db, "notes", noteId))
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
            <Editor 
            currentNote={tempNoteText} //currentNote
            updateNote={setTempNoteText} //updateNote
            />
        </Split>
      ) : (
        <div className="App">
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button className="first-note" onClick={createNewNote}>
              Create one now
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
