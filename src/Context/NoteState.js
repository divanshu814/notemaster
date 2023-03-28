// import react from "react"
import NoteContext from "./NoteContext"
import { useState } from "react"


const NoteState=(props)=>{

  const host="http://localhost:5000"

    const notesInitial=[]
    // const [state,setState] =useState(s1)
      const [notes, setNotes] = useState(notesInitial);


      // Fetch all notes.
      const getNotes= async(title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/fetchallnotes`
        , {
        method: 'GET', 
        
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem('token')
          
        },
        body: JSON.stringify(title,description,tag) 

      });
      const json =await response.json()
      // console.log(json)
      setNotes(json);


    }



      // Add a Note
      const addNote= async(title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`
        , {
        method: 'POST', 
        
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem('token')
          
        },
        body: JSON.stringify({title,description,tag}) 
      });
      const note= await response.json(); 
     
        setNotes(notes.concat(note));
        

      }

      // Delete a Note
      const deleteNote=async(id)=>{
        console.log(id);
        const response =await fetch(`${host}/api/notes/deletenote/${id}`
        , {
        method: 'DELETE', 
        
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem('token')
          
        },
       
      });
      const json= await response.json(); 
      console.log(json);

        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }



      // Edit a Note
      const editNote=async(id,title,description,tag)=>{
        // console.log(id);
        // console.log(title);

        const response =await fetch(`${host}/api/notes/updatenote/${id}`
          , {
          method: 'POST', 
          
          headers: {
            'Content-Type': 'application/json',
            "auth-token" : localStorage.getItem('token')
            
          },
          
          body: JSON.stringify({title,description,tag}) 
        }
        
        // {console.log(id)}
        );
        // console.log(id);
        const json= await response.json(); 
        console.log(json);

        // for(let index=0;index<notes.length;index++){
        //   const element =notes[index];
        //   if(element._id===id){
        //     element.title=title;
        //     element.description=description;
        //     element.tag=tag;
        //   }
        // }

        let newNotes=JSON.parse(JSON.stringify(notes));
        
        
        for(let index=0;index<newNotes.length;index++){

          const element =newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        // console.log(id, notes);
        setNotes(newNotes);

      }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,getNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
