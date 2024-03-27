import { nanoid } from "nanoid";
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function AddNoteDialog({ open, onClose}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("")


    const handleSubmit = (event) => {
        event.preventDefault();
        let stringNotes = localStorage.getItem("notes");
        let notes = JSON.parse(stringNotes)

        if (!notes) notes = []

        notes.push({
            id: nanoid(),
            name: title,
            content: content,
            category: category,
        })

        let convertedNotes = JSON.stringify(notes)
        localStorage.setItem("notes", convertedNotes)

        onClose()

        setTitle("");
        setContent("");
        setCategory("");

    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{ fontWeight: 'bold', borderBottom: '2px solid black', marginBottom: '8px' }}>Add New Note</DialogTitle>
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
                        <MenuItem value="work">Work</MenuItem>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="personal">Personal</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error" variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

