import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function DeleteCategoryDialog({ open, onClose, onConfirm, category}) {

  const handleConfirm = () => {
    // 1. Get the note id from the note prop
    const categoryId = category.id;

    // 2. Retrieve notes from local storage
    const categories = JSON.parse(localStorage.getItem("category"));

    // 3. Filter out the note with the given id
    const newCategory = categories.filter(item => item.id !== categoryId);

    // 4. Update the data back to local storage
    localStorage.setItem("category", JSON.stringify(newCategory));

    // 5. Close the dialog
    onClose();

    // 6. Call the onDelete function passed from Note component with updated notes
    onConfirm(newCategory);

    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Note</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this category?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

