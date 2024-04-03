
import AddNoteDialog from '../AddNote';
import { useState } from 'react';
import Note from '../Note';
import Container from "@mui/material/Container";
import AppBars from '../../components/AppBar';
export default function Home(props) {
    const { notess, setNotess, category } = props;
    const stringNotes = localStorage.getItem("notes");
  // convert the string version into array
    let notes = JSON.parse(stringNotes);
    if (!notes) notes = [];
    
    const filteredNotes = category ? notes.filter(note => note.category === category) : notes;
  
  const handleEditNote = (editedNote) => {
    const updatedNotes = notess.map((note) => (note.id === editedNote.id ? editedNote : note));
    setNotess(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
};
    
    const handleDeleteNote = (id) => {
        const updatedNotes = notess.filter((note) => note.id !== id);
        setNotess(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };
    return (
        <>
            <AppBars />
            <Container>
            <div style={{ marginTop: '16px', padding: '0 16px' }}>
            {filteredNotes.map((note, index) => (
                        <Note key={index} note={note} onDelete={handleDeleteNote} onEdit={handleEditNote}/>
                    ))}
                </div>
            </Container>
        </>
    );
}

