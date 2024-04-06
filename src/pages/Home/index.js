
import Note from '../Note';
import AppBars from '../../components/AppBar';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Container} from "@mui/material";

export default function Home() {
    const stringNotes = localStorage.getItem("notes");
  // convert the string version into array
    let notes = JSON.parse(stringNotes);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('cat')
    if (!notes) notes = [];
    
    
    if (categoryId) {
        notes = notes.filter(note => note.category === categoryId);
    }
    console.log(categoryId)
    console.log(notes)
  

    // handle edit Note function
  const handleEditNote = (editedNote) => {
    const updatedNotes = notes.map((note) => (note.id === editedNote.id ? editedNote : note));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
};
    // handle delete note function
    const handleDeleteNote = (id) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };
    return (
        <>
            <AppBars />
            <Container>
            <div style={{ marginTop: '16px', padding: '0 16px' }}>
            {notes.map((note, index) => (
                        <Note key={index} note={note} onDelete={() => handleDeleteNote(note.id)} onEdit={handleEditNote}/>
                    ))}
                </div>
                {notes.length === 0 && (
                    <Card style={{ textAlign: 'center' }}>
                        <CardContent>
                            <Typography variant="h6">No Note added yet.</Typography>
                        </CardContent>
                    </Card>
            )}
            </Container>
        </>
    );
}

