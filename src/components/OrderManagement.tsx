import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Alert,
} from '@mui/material';
import { Delete as DeleteIcon, FileDownload } from '@mui/icons-material';
import { format } from 'date-fns';
import { orderService } from '../services/order/orderService';
import { Order } from '../types';
import LoadingSpinner from './common/LoadingSpinner';
import { ErrorMessage } from './common/ErrorMessage';
import { exportOrders } from '../utils/export/orderExport';
import { formatCurrency } from '../utils/date/dateHelpers';

export const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const [year, month] = selectedMonth.split('-');
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59); // Adjusted to include the entire last day of the month

      
      console.log('Fetching orders from:', startDate.toISOString(), 'to:', endDate.toISOString());

      const data = await orderService.getOrders(startDate, endDate);
      console.log('Fetched orders:', data); // Debugging line

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.warn('Fetched data is not an array:', data);
        setOrders([]);
      }
      setError(null);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedMonth]);

  const handleDelete = async (orderId: string) => {
    try {
      await orderService.deleteOrder(orderId);
      setSuccessMessage('Order deleted successfully');
      fetchOrders(); // Refresh orders after deletion
    } catch (err: any) {
      setError(err.message || 'Failed to delete order');
    }
  };

  const handleExport = async () => {
    try {
      const [year, month] = selectedMonth.split('-');
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59); 
  
      const orders = await orderService.getOrders(startDate, endDate); // Fetch orders for the selected month
  
      await exportOrders(new Date(parseInt(year), parseInt(month) - 1), orders); // Pass the fetched orders to export
      setSuccessMessage('Orders exported successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to export orders');
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
          <Typography variant="h5">Order Management</Typography>
          <div className="flex gap-4 items-center">
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Month</InputLabel>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                label="Month"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const date = new Date(2025, i, 1);
                  return (
                    <MenuItem key={i} value={format(date, 'yyyy-MM')}>
                      {format(date, 'MMMM yyyy')}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<FileDownload />}
              onClick={handleExport}
            >
              Export Orders
            </Button>
          </div>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{format(new Date(order.timestamp), 'dd/MM/yyyy HH:mm')}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-sm ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          {item.nameEn} ({item.nameTh}) x{item.quantity}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(order.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography>No orders found for the selected month.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
