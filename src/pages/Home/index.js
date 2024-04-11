import { useState } from "react";
import Note from '../Note';
import AppBars from '../../components/AppBar';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Container } from "@mui/material";

export default function Home() {
    const stringNotes = localStorage.getItem("notes");
    const [notes, setNotes] = useState(JSON.parse(stringNotes) || []);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('cat');
    const [searchKeyword, setSearchKeyword] = useState("");

    const filterNotes = (notes, categoryId, keyword) => {
        let filtered = notes;
        if (categoryId) {
            filtered = filtered.filter(note => note.category === categoryId);
        }
        if (keyword) {
            filtered = filtered.filter(note =>
                (note.title && note.title.toLowerCase().includes(keyword.toLowerCase())) ||
                (note.content && note.content.toLowerCase().includes(keyword.toLowerCase()))
            );
        }
        return filtered;
    };

    const handleSearchKeywordChange = (keyword) => {
        setSearchKeyword(keyword);
    };

    const filteredNotes = filterNotes(notes, categoryId, searchKeyword);

    const handleEditNote = (editedNote) => {
        const updatedNotes = notes.map((note) => (note.id === editedNote.id ? editedNote : note));
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    const handleDeleteNote = (id) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    return (
        <>
            <AppBars setKeyword={handleSearchKeywordChange} />
            <Container>
                <div style={{ marginTop: '16px', padding: '0 16px' }}>
                    {filteredNotes.map((note, index) => (
                        <Note key={index} note={note} onDelete={() => handleDeleteNote(note.id)} onEdit={handleEditNote} />
                    ))}
                </div>
                {filteredNotes.length === 0 && (
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


