import { AppBar, Toolbar, Typography, TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AddNoteDialog from '../AddNote';
import { useState } from 'react';
import Note from '../Note';

export default function Home() {
    const [openDialog, setOpenDialog] = useState(false);
    const stringNotes = localStorage.getItem("notes");
  // convert the string version into array
    let notes = JSON.parse(stringNotes);

  if (!notes) notes = [];

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddNote = (Data) => {
        // Handle adding the note here
        console.log('Added note:', Data);
        handleCloseDialog();
    };
    return (
        <>
        <AppBar position="fixed" style={{ backgroundColor: '#3BB9FF' }}>
            <Toolbar>
                <IconButton color="inherit" edge="end" >
                    <SearchIcon />
                </IconButton>
                <Box sx={{ marginLeft: 1 }}>
                    <TextField
                        placeholder='Search your note...'
                        variant="outlined"
                        size="small"
                        sx={{
                            borderRadius: '8px',
                            backgroundColor: '#FFFFFF',
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                    <IconButton color="inherit" onClick={handleOpenDialog}>
                        <AddIcon />
                    </IconButton>
                    <Typography variant="body1" color="inherit" onClick={handleOpenDialog} style={{ cursor: 'pointer' }}>
                        Add new note
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
        <Typography variant="body1" style={{ marginTop: '74px', fontWeight: 'bold' }}>
                <span style={{ marginLeft:'16px' ,marginRight: '16px' }}>All</span>
                <span style={{ marginRight: '16px' }}>Daily</span>
                <span style={{ marginRight: '16px' }}>Work</span>
                <span style={{ marginRight: '16px' }}>Personal</span>
            </Typography>
            <div style={{ marginTop: '16px', padding: '0 16px' }}>
                {notes.map((note, index) => (
                    <Note key={index} note={note} />
                ))}
            </div>
            <AddNoteDialog open={openDialog} onClose={handleCloseDialog} onSubmit={handleAddNote} />
        </>
    );
}
