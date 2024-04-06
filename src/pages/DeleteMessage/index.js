import { Dialog, DialogContent, Typography } from '@mui/material';
import { useState } from 'react';

export default function DeleteMessage({ open, onClose }) {

    const [showDialog, setShowDialog] = useState(open);

    const handleClose = () => {
        setShowDialog(false);
        onClose();
    };

    // Update showDialog state whenever the open prop changes
    if (open !== showDialog) {
        setShowDialog(open);
    }

    // Set a timer to close the dialog after 3 seconds
    if (showDialog) {
        setTimeout(() => {
            setShowDialog(false);
            onClose();
        }, 1000);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent sx={{ padding: '60px', borderRadius: '8px'}}>
            <Typography>Note has Been Deleted Successfully!</Typography>
          </DialogContent>
        </Dialog>
      );
}