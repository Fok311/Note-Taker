import { AppBar, Toolbar, Typography, TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddNoteDialog from '../../pages/AddNote';
import React from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import Drawer from '@mui/material/Drawer';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { Link, useNavigate} from 'react-router-dom';
import Divider from '@mui/material/Divider';

export default function AppBars() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    let categories = JSON.parse(localStorage.getItem("category"));
    if (!categories) categories = [];
    
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
              <ListItem value="add" button component={Link} to={'/add'}>Add New Category</ListItem>
            </List>
            <Divider />
            <List>
                <ListItem value="all" button component={Link} to={'/'}>All</ListItem>
                {categories.map((category) => (
                      <ListItem key={category.id} button onClick={() => handleCategoryClick(category.id)}>
                          <ListItemText primary={category.label} />
                      </ListItem>
                ))}
            </List>
        </Box>
    )

    const handleCategoryClick = (categoryId) => {
        // Redirect to the route with the category ID
        navigate(`/?cat=${categoryId}`);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        
    };

    const handleAddNote = () => {
        // Handle adding the note here
        handleCloseDialog();
    };
    return (
        <>
        <AppBar position="static" style={{ backgroundColor: '#3BB9FF' }}>
                <Toolbar>
                <DensityMediumIcon onClick={toggleDrawer(true)}></DensityMediumIcon>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
                <IconButton color="inherit" edge="end" >
                    <SearchIcon />
                </IconButton>
                <Box sx={{ marginLeft: 1 }}>
                    <TextField
                        placeholder='Search your note...'
                        variant="outlined"
                        size="small"
                        // value={keyword}
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
            <AddNoteDialog open={openDialog} onClose={handleCloseDialog} onSubmit={handleAddNote} />
        </>
    )
}