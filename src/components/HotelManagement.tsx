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
import { useAuth } from '../hooks/useAuth';
import { Hotel } from '../types'
import { hotelService } from '../services/hotel/hotelService';

export const HotelManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [newHotel, setNewHotel] = useState({hotelName: ''});
  
    const [hotelItems, setHotelItems] = useState<Hotel[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const { user } = useAuth();
  
    useEffect(() => {
      const fetchHotelItems = async () => {
        try {
          const items = await hotelService.getHotels();
          setHotelItems(items);
        } catch (err) {
          setError("Failed to load menu items");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchHotelItems();
    }, []);
  
    const AddHotel = (item: Hotel) => {
      setHotelItems((prev) => {
        return [...prev, { ...item }];
      });
    };

  
  
    const handleSubmit = async () => {
      if (!user || newHotel.hotelName.length == 0 || submitting) {
        setError("Please fill the hotelName");
        return;
      }
  
      setSubmitting(true);
      setError(null);
  
      try {
        const item = {
          id: crypto.randomUUID(),
          hotel_name: newHotel.hotelName,
          created_at: new Date().toISOString(),
          
        };
        await hotelService.submitHotel(item);
        AddHotel(item);
        setSuccessMessage("hotel submitted successfully!");
      } catch (err: any) {
        setError(err.message || "Failed to add hotel");
        console.error("hotel addition error:", err);
      } finally {
        setSubmitting(false);
      }
    };

    const handleDelete = async (hotel_Id: string) => {
        try {
          await hotelService.deleteHotel(hotel_Id);
          setSuccessMessage('Order deleted successfully');
          setHotelItems((prev) => prev.filter((item) => item.id !== hotel_Id));
        } catch (err: any) {
          setError(err.message || 'Failed to delete order');
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
              {hotelItems.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell>{hotel.hotel_name}</TableCell>
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
