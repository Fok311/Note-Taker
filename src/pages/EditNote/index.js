import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationDialog from '../DeleteNote';

export default function EditNoteDialog({ open, onClose, id, onDelete}) {
    const notes = JSON.parse(localStorage.getItem("notes"));

    const selectedNote = notes.find((p) => p.id === id);

    const [title, setTitle] = useState(selectedNote ? selectedNote.name : "");
    const [content, setContent] = useState(selectedNote ? selectedNote.content : "");
    const [category, setCategory] = useState(selectedNote ? selectedNote.category : "");
    const [openDialog, setOpenDialog] = useState(false);

    let categories = JSON.parse(localStorage.getItem("category"));
    if (!categories) categories = [];


    const handleCloseDialog = () => {
        setOpenDialog(false);
      };
      
    
      const handleDeleteClick = (e) => {
        setOpenDialog(true);
      };
    
      const handleConfirmDelete = () => {
        const updatedNotes = notes.filter((note) => note.id !== id);

        localStorage.setItem("notes", JSON.stringify(updatedNotes));

        onClose();
        setOpenDialog(false);
        window.location.reload();
    };


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
        <div>
        <Dialog open={open} onClose={onClose}>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid black', justifyContent: "space-between" }}>
            <DialogTitle style={{ fontWeight: 'bold' }}>Edit Note</DialogTitle>
                <IconButton aria-label="delete" style={{marginBottom:"3px", marginRight:"15px", color:"#D04848"}} onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </div>
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
                <FormControl fullWidth margin="dense">
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
            <DialogActions style={{marginBottom: "10px", marginRight: "15px"}}>
                <Button onClick={onClose} color="error" variant="contained">
                    Cancel
                </Button>
                <Button onClick={updateNote} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
            </Dialog>
            <DeleteConfirmationDialog open={openDialog} onClose={handleCloseDialog} onConfirm={handleConfirmDelete} />
        </div>
    );
};
