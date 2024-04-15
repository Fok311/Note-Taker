import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Snackbar} from '@mui/material';
import { useState } from 'react';

export default function DeleteConfirmationDialog({ open, onClose, onConfirm }) {

  const handleConfirm = () => {
    onConfirm(); // Call onDelete function
    onClose(); // Close the dialog
  };



  return (
    <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Note</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this note?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="error">Delete</Button>
      </DialogActions>
      </Dialog>
    </>
  );
}

