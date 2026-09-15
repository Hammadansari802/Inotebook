import React from 'react'
import Noteitem from './Noteitem'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Addnote from './Addnote'
import { useEffect ,useRef ,useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Note = (props) => {
  const navigate = useNavigate()
 const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
  // restructure the notes to be an array of objects
  const context = useContext(noteContext)
  const {notes, getnotes,editNote} = context
 
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes()
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
  // useRef is used to get the reference of the button and click it programmatically
  const ref = useRef(null)
  const refclose = useRef(null)
  
  // Pencil icon click hone par yeh chalega

  const updatenote = (currentNote) => {
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    ref.current.click();
   
   
  }
  // handleclick is used to add a note when the form is submitted
const handleclick = (e) => {
  editNote(note.id, note.etitle, note.edescription, note.etag)

    refclose.current.click();
    e.preventDefault();
      props.showAlert("Note updated successfully", "success");
   
  }
  const onchange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
     
  }

  
  return (
    <>
   <Addnote showAlert={props.showAlert} />
    <button type="button" ref={ref} className="btn btn-primary d-none my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
                <form>
            
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    {/* onchange is called  */}
                    <input type="text" className="form-control" id="title" name="etitle" value={note.etitle}  onChange={onchange}  minLength={5} required aria-describedby="titleHelp"/>
                     
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="edescription" value={note.edescription} minLength={5} required onChange={onchange}  />
                    
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="etag" value={note.etag} minLength={5} required onChange={onchange}  />
                    
                  </div>
            </form>
          </div>
          <div className="modal-footer">
            {/* ref is used to get the reference of the button */}
            <button type="button" ref={refclose}  className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button 
            type="button" 
            disabled={(note.etitle?.length || 0) < 5 || (note.edescription?.length || 0) < 5} 
            onClick={handleclick} 
            className="btn btn-primary"
          >
            Update Note
        </button>      
        </div>
        </div>
      </div>
    </div>
    
 
    <div className="row my-3">
      <h1>Your notes</h1>
      {/* map through the notes and display them in a card */}
      <div className="mx-2 container">
 
     </div>
{Array.isArray(notes) && notes.map((note, index) => (
    <Noteitem key={note._id || index} updatenote={updatenote} showAlert={props.showAlert} note={note}
     />
     
     
))}
    </div>
    </>
  )
}
export default Note