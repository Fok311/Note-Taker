import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function DeleteConfirmationDialog({ open, onClose, onConfirm, itemId }) {

  const handleConfirm = () => {
    localStorage.removeItem(itemId);

    onConfirm();
  }

  return (
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
  );
}



// onClick={() => {
//   const answer = window.confirm(
//     "Are you sure you want to delete this item?"
//   );

//   // if answer is true, then delete the post
//   if (answer) {
//     // 1. use .filter() to remove the selected post
//     let newPosts = posts.filter(
//       (item) => item.id !== p.id
//     );

//     // 2. update the data back to local storage
//     localStorage.setItem(
//       "posts",
//       JSON.stringify(newPosts)
//     );

//     // 3 . redirect back to /manage-posts
//     navigate("/manage-posts");
//   } // end - answer
// }}
