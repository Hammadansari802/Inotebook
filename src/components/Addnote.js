import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note Added Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-4">
            <div 
                className="card border-0 rounded-4 p-4 p-md-4 bg-white"
                style={{ 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.04)", 
                    border: "1px solid #e2e8f0"
                }}
            >
                {/* Header */}
                <div className="d-flex align-items-center mb-4">
                    <span className="fs-3 me-2">📝</span>
                    <div>
                        <h4 className="fw-bold text-dark m-0">Add a Note</h4>
                        <small className="text-muted">Save your ideas and notes easily</small>
                    </div>
                </div>

                {/* Form */}
                <form>
                    <div className="row g-3 mb-3">
                        <div className="col-md-8">
                            <label className="form-label fw-bold text-secondary small">TITLE</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg fs-6 rounded-3 bg-light border-0 px-3 py-2.5" 
                                id="title" 
                                name="title" 
                                value={note.title} 
                                onChange={onChange} 
                                minLength={5} 
                                required 
                                placeholder="Enter title (e.g. Work Tasks)" 
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label fw-bold text-secondary small">TAG / CATEGORY</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg fs-6 rounded-3 bg-light border-0 px-3 py-2.5" 
                                id="tag" 
                                name="tag" 
                                value={note.tag} 
                                onChange={onChange} 
                                placeholder="Personal, Work..." 
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold text-secondary small">DESCRIPTION</label>
                        <textarea 
                            className="form-control fs-6 rounded-3 bg-light border-0 px-3 py-2.5" 
                            id="description" 
                            name="description" 
                            rows="3" 
                            value={note.description} 
                            onChange={onChange} 
                            minLength={5} 
                            required 
                            placeholder="Write your note description here..."
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button 
                            disabled={note.title.length < 5 || note.description.length < 5} 
                            type="submit" 
                            className="btn btn-primary btn-lg rounded-3 px-4 py-2 fs-6 fw-bold shadow-sm" 
                            onClick={handleClick}
                        >
                            + Save Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addnote