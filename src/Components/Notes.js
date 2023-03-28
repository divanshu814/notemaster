import React, { useRef } from 'react'
import { useContext } from 'react';
import NoteContext from '../Context/NoteContext';
import { useEffect } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(NoteContext);
  const {notes,getNotes,editNote}=context;
  // let loggedIn=false;
  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      // loggedIn=true;
    getNotes()
    }
    else{
      navigate("/login")

    }
  //  eslint-disable-next-line
  }, [])

  
  const ref=useRef(null);
  const refClose=useRef(null);
  const [note, setNote] = useState({id: "", etitle:"", edescription:"", etag:""});

const updateNote=(currentNote)=>{
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
}
const handleClick =(e)=>{
    // e.preventDefault();
    // console.log("updating the note... ", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    // addNote(note.title,note.description,note.tag);
}
const onChange =(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}


  
  return (
    <>
    <AddNote/>
    
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} minLength={5} required />
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />

  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />

  </div>
  {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div> */}
  {/* <button type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button> */}
</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary"  >Update Note</button>
      </div>
    </div>
  </div>
</div>



        <div className="row my-4">
        <h2>Your Notes</h2>

        <div className="container mx-2">
          {notes.length===0 && 'No notes to display'}
        </div>
        {
        notes.map((note)=>{


          return <NoteItem key={note._id} updateNote={updateNote} note={note} />
        //   note._id is used because to extract id in mongodb it uses _id
        })
        }
        
      </div>

    </>
  )
}

export default Notes