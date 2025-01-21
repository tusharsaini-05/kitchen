import React, { useState, useEffect } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';

export const HotelManagement: React.FC = () => {
  const [hotels, setHotels] = useState<
    { id: string; hotelName: string; created_at: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [newHotel, setNewHotel] = useState({
    hotelName: '',
  });

  // Simulate fetching hotels (replace with real API call if needed)
  const fetchHotels = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockHotels = [
        {
          id: '1',
          hotelName: 'Hotel A',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          hotelName: 'Hotel B',
          created_at: new Date().toISOString(),
        },
      ];
      setHotels(mockHotels);
      setError(null);
    } catch (err: any) {
      setError('Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Handle hotel creation
  const handleSubmit = async () => {
    try {
      const newHotelEntry = {
        id: String(hotels.length + 1),
        hotelName: newHotel.hotelName,
        created_at: new Date().toISOString(),
      };
      setHotels([...hotels, newHotelEntry]);
      setOpen(false);
      setSuccessMessage('Hotel created successfully');
      setNewHotel({ hotelName: '' });
    } catch (err: any) {
      setError('Failed to create hotel');
    }
  };

  // Handle hotel deletion
  const handleDelete = async (hotelId: string) => {
    try {
      setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
      setSuccessMessage('Hotel deleted successfully');
    } catch (err: any) {
      setError('Failed to delete hotel');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccessMessage(null)}
        >
          {successMessage}
        </Alert>
      )}

      <Paper sx={{ p: 2 }}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">Hotel Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Hotel
          </Button>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hotel Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hotels.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell>{hotel.hotelName}</TableCell>
                  <TableCell>
                    {format(new Date(hotel.created_at), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => handleDelete(hotel.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Hotel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Hotel Name"
            fullWidth
            value={newHotel.hotelName}
            onChange={(e) =>
              setNewHotel({ ...newHotel, hotelName: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Hotel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
