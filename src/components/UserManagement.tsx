import React, { useState, useEffect } from "react";
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
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { userService } from "../services/user/userService";
import { Hotel, User } from "../types";
import LoadingSpinner from "./common/LoadingSpinner";
import { ErrorMessage } from "./common/ErrorMessage";
import { format } from "date-fns";
import { hotelService } from "../services/hotel/hotelService";

export const UserManagement: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [newUser, setNewUser] = useState({
    email: "",
    password: "", // Added password field
    name: "",
    hotelName: "",
    role: "",
  });

  const roles = ["admin", "order_taker", "order_receiver"];

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsData = await hotelService.getHotels();
        setHotels(hotelsData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch hotels");
      }
    };

    fetchHotels();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    try {
      await userService.createUser(
        newUser.email,
        newUser.password, // Include password
        newUser.role,
        newUser.name,
        newUser.hotelName 
      );
      setOpen(false);
      setSuccessMessage('User created successfully');
      fetchUsers();
      setNewUser({
        email: '',
        password: '', // Reset password field
        name: '',
        hotelName: '',
        role: 'order_taker',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await userService.deleteUser(userId);
      setSuccessMessage("User deleted successfully");
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Failed to delete user");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && <ErrorMessage message={error} />}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      <Paper sx={{ p: 2 }}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">User Management</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
            Add User
          </Button>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Hotel Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.filter((user) => user.role !== "admin").map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.hotel || "N/A"}</TableCell>
                  <TableCell>{format(new Date(user.created_at), "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <Button startIcon={<DeleteIcon />} color="error" onClick={() => handleDelete(user.user_id)}>
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
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Hotel Name</InputLabel>
            <Select
              value={newUser.hotelName}
              onChange={(e) => setNewUser({ ...newUser, hotelName: e.target.value })}
            >
              {hotels.map((hotel) => (
                <MenuItem key={hotel.id} value={hotel.name}>{hotel.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add User</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
