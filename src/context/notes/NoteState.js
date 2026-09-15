import noteContext from "./noteContext";
import { useState } from "react";
import React from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

  // 1. Get all notes
  const getnotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        }
      });
      const json = await response.json();

      // Safety Check: Sirf tab set karein jab response ek Array ho
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        setNotes([]); // Error aane par empty array rakhein taake concat crash na ho
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  }

  // 2. Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();

      // Safety Check: Sirf tab note add karein jab backend se valid note aaye
      if (response.ok && note && note._id) {
        setNotes((prevNotes) => (Array.isArray(prevNotes) ? [...prevNotes, note] : [note]));
      } else {
        console.error("Backend Error:", note);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // 3. Delete a note
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // 4. Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        if (newNotes[index]._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getnotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;