import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Button, TextField } from "@mui/material";
import { nanoid } from "nanoid";
import AppBars from "../../components/AppBar";

export default function AddCategory() {
  
  let categories = JSON.parse(localStorage.getItem("category"));
  if (!categories) categories = [];
  const [newItem, setNewItem] = useState("");

  const handleAddNewItem = () => {
    const newCategories = [...categories];
    newCategories.push({
      id: nanoid(),
      label: newItem,
    });
    localStorage.setItem("category", JSON.stringify(newCategories));
    // reset the text field
    setNewItem("");
  };
  return (
    <div>
      <AppBars />
      <Container maxWidth="sm">
        {categories.length > 0 ? (
          <List dense>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={category.label} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="h6">No Category added yet.</Typography>
        )}
        <Box display="flex" gap={"5px"} sx={{ paddingTop: "20px" }}>
          <TextField
            label="Add new Item"
            fullWidth
            value={newItem}
            onChange={(event) => {
              setNewItem(event.target.value);
            }}
          />
          <Button
            variant="contained"
            sx={{
              paddingLeft: "45px",
              paddingRight: "45px",
            }}
            onClick={handleAddNewItem}
          >
            <AddIcon />
          </Button>
        </Box>
      </Container>
    </div>
  );
}