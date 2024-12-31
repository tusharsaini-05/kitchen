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

export const MenuManagement: React.FC = () => {
  const { items, loading, error, addMenuItem, deleteMenuItem } = useMenu();
  const [open, setOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState({
    nameEn: '',
    nameTh: '',
    price: 0,
    category: 'main',
  });

  const handleSubmit = async () => {
    if (!newItem.nameEn || !newItem.nameTh || !newItem.price) return;

    await addMenuItem({
      ...newItem,
      id: Date.now(),
      nameEn: newItem.nameEn,
      nameTh: newItem.nameTh,
      price: Number(newItem.price),
      category: newItem.category,
    });

    setOpen(false);
    setNewItem({
      nameEn: '',
      nameTh: '',
      price: 0,
      category: 'main',
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading...</Typography>
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
                  <Typography variant="h6">{item.nameEn}</Typography>
                  <Typography variant="subtitle1">{item.nameTh}</Typography>
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
            value={newItem.nameEn}
            onChange={(e) => setNewItem({ ...newItem, nameEn: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Name (Thai)"
            fullWidth
            value={newItem.nameTh}
            onChange={(e) => setNewItem({ ...newItem, nameTh: e.target.value })}
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
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
            >
              <MuiMenuItem value="main">Main Dishes</MuiMenuItem>
              <MuiMenuItem value="appetizer">Appetizers</MuiMenuItem>
              <MuiMenuItem value="dessert">Desserts</MuiMenuItem>
              <MuiMenuItem value="beverage">Beverages</MuiMenuItem>
            </Select>
          </FormControl>
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