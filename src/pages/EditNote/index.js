import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function EditNoteDialog({ open, onClose, id }) {
    const notes = JSON.parse(localStorage.getItem("notes"));

    const selectedNote = notes.find((p) => p.id === id);

    const [title, setTitle] = useState(selectedNote ? selectedNote.name : "");
    const [content, setContent] = useState(selectedNote ? selectedNote.content : "");
    const [category, setCategory] = useState(selectedNote ? selectedNote.category : "");

    let categories = JSON.parse(localStorage.getItem("category"));
    if (!categories) categories = [];


    const updateNote = () => {
        const updatedNote = {
            id: selectedNote.id,
            name: title,
            content: content,
            category: category,
        };

        const updatedNotes = notes.map((note) => (note.id === id ? updatedNote : note));

        // Update local storage with the modified notes array
        localStorage.setItem("notes", JSON.stringify(updatedNotes));

        onClose(); // Close the dialog
        window.location.reload();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{ fontWeight: 'bold', borderBottom: '2px solid black', marginBottom: '8px' }}>Edit Note</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="content"
                    label="Content"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                      <MenuItem value={category.id}>{category.label}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error" variant="contained">
                    Cancel
                </Button>
                <Button onClick={updateNote} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
