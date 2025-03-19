import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem as MuiMenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useMenu } from '../hooks/useMenu';
import { formatCurrency } from '../utils/date/dateHelpers';
import LoadingSpinner from './common/LoadingSpinner';

export const MenuManagement: React.FC = () => {
  const { items, loading, error, addMenuItem, deleteMenuItem } = useMenu();
  const [open, setOpen] = React.useState(false);
  const [customCategory, setCustomCategory] = React.useState("");
  const [isCustomCategory, setIsCustomCategory] = React.useState(false);
  const [newItem, setNewItem] = React.useState({
    name_en: '',
    name_th: '',
    price: 0,
    category: 'main',
  });

  const handleSubmit = async () => {
    if (!newItem.name_en || !newItem.name_th || !newItem.price) return;

    await addMenuItem({
      ...newItem,
      id: Date.now(),
      name_en: newItem.name_en,
      name_th: newItem.name_th,
      price: Number(newItem.price),
      category: newItem.category,
    });

    setOpen(false);
    setNewItem({
      name_en: '',
      name_th: '',
      price: 0,
      category: 'main',
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
       <LoadingSpinner/>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">Menu Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Menu Item
          </Button>
        </div>

        <Grid container spacing={3}>
          {items && items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.name_en}</Typography>
                  <Typography variant="subtitle1">{item.name_th}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Category: {item.category}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {formatCurrency(item.price)}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => deleteMenuItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name (English)"
            fullWidth
            value={newItem.name_en}
            onChange={(e) => setNewItem({ ...newItem, name_en: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Name (Thai)"
            fullWidth
            value={newItem.name_th}
            onChange={(e) => setNewItem({ ...newItem, name_th: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price (THB)"
            type="number"
            fullWidth
            value={newItem.price}
            onChange={(e) =>
              setNewItem({ ...newItem, price: Number(e.target.value) })
            }
              />
<FormControl fullWidth margin="dense">
  <InputLabel>Category</InputLabel>
  <Select
    value={isCustomCategory ? "new" : newItem.category}
    onChange={(e) => {
      if (e.target.value === "new") {
        setIsCustomCategory(true);
        setCustomCategory(""); // Allow user input
      } else {
        setNewItem({ ...newItem, category: e.target.value });
        setIsCustomCategory(false);
      }
    }}
  >
    <MuiMenuItem value="main">Main Dishes</MuiMenuItem>
    <MuiMenuItem value="appetizer">Appetizers</MuiMenuItem>
    <MuiMenuItem value="dessert">Desserts</MuiMenuItem>
    <MuiMenuItem value="beverage">Beverages</MuiMenuItem>
    <MuiMenuItem value="new">➕ Add a new category</MuiMenuItem> {/* New Option */}
  </Select>
</FormControl>

{/* Show input field only if "Add a new category" is selected */}
{isCustomCategory && (
  <TextField
    margin="dense"
    label="Enter New Category"
    fullWidth
    value={customCategory}
    onChange={(e) => setCustomCategory(e.target.value)}
    onBlur={() => {
      if (customCategory.trim()) {
        setNewItem({ ...newItem, category: customCategory.trim() });
        setIsCustomCategory(false); // Hide input after entering value
      }
    }}
  />
)}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};