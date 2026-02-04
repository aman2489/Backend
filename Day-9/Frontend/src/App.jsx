import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([]);

  const baseUrl = "https://backend-whua.onrender.com/"
  function fetchNotes(){
    axios.get(`${baseUrl}api/notes`)
    .then(res => {
      setNotes(res.data.notes);
      console.log(res.data.notes);
    })
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  function submitHandler(e){
    e.preventDefault();
    const [title, description] = e.target.elements  
    console.log(title.value, description.value);

    axios.post(`${baseUrl}api/notes`, {
      title: title.value.trim(),
      description: description.value.trim()
    })
    .then(res => {
      console.log(res.data);
      fetchNotes();
    })
    title.value = ""
    description.value = ""
  }

  function deleteHandler(noteId){
    axios.delete(`${baseUrl}api/notes/${noteId}`)
    .then(res => {
      console.log(res.data)
      fetchNotes();
    })
    console.log(noteId);
  }

  function updateHandler(noteId){
    const updatedDes = prompt("Enter the description");
    axios.patch(`${baseUrl}api/notes/${noteId}`, {
      description: updatedDes.trim()
    })
    .then(res => {
      console.log(res.data);
      fetchNotes();
    })
  }
  
  return (
    <>
      <form action="" onSubmit={submitHandler}>
        <input type="text" required placeholder='Enter title' />
        <input type="text" required placeholder='Enter description' />
        <button>Create Note</button>
      </form>
      <div className="cards">
        {notes.map((note) => {
          return <div key={note._id} className="card">
                  <input type='text' 
                  value={note.title} 
                  placeholder='Enter title'
                  disabled/>
                  <h5>{note.description}</h5>
                  <button
                  className='delete'
                  onClick={() => {deleteHandler(note._id)}}
                  >Delete</button>
                  <button
                  onClick={() => {updateHandler(note._id)}}
                  >Update</button>
                 </div>
        })}
      </div>
    </>
  )
}

export default App
