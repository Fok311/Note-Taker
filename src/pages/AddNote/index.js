import { nanoid } from "nanoid";
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';


export default function AddNoteDialog({ open, onClose}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("")
    let categories = JSON.parse(localStorage.getItem("category"));
    if (!categories) categories = [];
    const characterLimit = 100

    const handleSubmit = (event) => {
        event.preventDefault();
        let stringNotes = localStorage.getItem("notes");
        let notes = JSON.parse(stringNotes)

        

        if (!notes) notes = []


        const noteTitle = title.trim() === "" ? "Untitled" : title;

        notes.push({
            id: nanoid(),
            name: noteTitle,
            content: content,
            category: category,
        })

        let convertedNotes = JSON.stringify(notes)
        localStorage.setItem("notes", convertedNotes)

        onClose()
        window.location.reload();

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
                    inputProps={{ maxLength : 101 }}
                    onChange={(e) => setContent(e.target.value)}
                    helperText={content.length > characterLimit ? "Exceeded character limit!" : `${characterLimit - content.length} Remaining`}
                    error={content.length > characterLimit}
                />
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        {categories.map((category) => (
                      <MenuItem value={category.id}>{category.label}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions style={{marginBottom:"10px", marginRight:"15px"}}>
                <Button onClick={onClose} color="error" variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained" disabled={content.length === 0 || content.length > 100}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

