import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Container,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import { nanoid } from "nanoid";
import AppBars from "../../components/AppBar";

export default function AddCategory() {

  // Retrieve categories from local storage or initialize as empty array
  let categories = JSON.parse(localStorage.getItem("category"));
  if (!categories) categories = [];

  // State for new category input
  const [newItem, setNewItem] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Function to handle adding a new category
  const handleAddNewItem = () => {
    // Clone existing categories array
    const newCategories = [...categories];

    // Add new category object to array
    newCategories.push({
      id: nanoid(),
      label: newItem,
    });

    // Save updated categories to local storage
    localStorage.setItem("category", JSON.stringify(newCategories));

    // Reset the text field
    setNewItem("");
  };

  const handleDeleteClick = (categoryId) => {
    setCategoryToDelete(categoryId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryToDelete
    );
    categories = updatedCategories; // Update categories directly without state
    localStorage.setItem("category", JSON.stringify(updatedCategories));
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <AppBars />
      <Container maxWidth="md">
        <Card variant="outlined" sx={{ marginTop: '50px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Categories
            </Typography>
            <List>
              {categories.map((category) => (
                <ListItem key={category.id}>
                  <ListItemText primary={category.label} />
                  <IconButton edge="start" aria-label="edit" style={{ backgroundColor: '#C68E17' , borderRadius: '10px', marginRight: '4px', color: 'white' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" style={{ backgroundColor: '#9F000F' , borderRadius: '10px', color: 'white'}} onClick={() => handleDeleteClick(category.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            {categories.length === 0 && (
              <Typography variant="h6">No categories added yet.</Typography>
            )}
            <Box mt={3}>
              <TextField
                label="Add new category"
                fullWidth
                value={newItem}
                onChange={(event) => setNewItem(event.target.value)}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                fullWidth
                onClick={handleAddNewItem}
                sx={{ mt: 2 }}
                style={{ backgroundColor: newItem.length > 0 ? '#3BB9FF' : '#CCCCCC', // Blue if length > 0, Gray otherwise
                color: '#FFFFFF' }}
                disabled={newItem.length === 0}
              >
                Add
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this category?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
