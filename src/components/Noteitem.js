import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updatenote } = props;

    return (
        <div className="col-md-4 my-2">
            <div 
                className="card h-100 border-0 rounded-4 p-3 bg-white"
                style={{ 
                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)", 
                    border: "1px solid #e2e8f0" 
                }}
            >
                <div className="card-body d-flex flex-column justify-content-between p-2">
                    <div>
                        {/* Tag Pill */}
                        <div className="mb-2">
                            <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-2.5 py-1.5 rounded-2">
                                {note.tag ? note.tag : "General"}
                            </span>
                        </div>

                        {/* Title */}
                        <h5 className="fw-bold text-dark mb-2">
                            {note.title}
                        </h5>

                        {/* Description */}
                        <p className="text-secondary small mb-3" style={{ lineHeight: "1.5" }}>
                            {note.description}
                        </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="d-flex justify-content-end align-items-center gap-2 pt-2 border-top border-light">
                        <button 
                            className="btn btn-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center" 
                            style={{ width: "35px", height: "35px" }}
                            onClick={() => { updatenote(note) }}
                            title="Edit Note"
                        >
                            ✏️
                        </button>
                        <button 
                            className="btn btn-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center text-danger" 
                            style={{ width: "35px", height: "35px" }}
                            onClick={() => { 
                                deleteNote(note._id); 
                                props.showAlert("Note Deleted Successfully", "danger");
                            }}
                            title="Delete Note"
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem