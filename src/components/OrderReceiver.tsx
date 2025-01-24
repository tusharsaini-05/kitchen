import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button,
  Chip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Snackbar
} from '@mui/material';
import { Check, AccessTime, FileDownload } from '@mui/icons-material';
import { formatDate, formatCurrency } from '../utils/date/dateHelpers';
import { usePendingOrders } from '../hooks/usePendingOrders';
import { exportOrders } from '../utils/export/orderExport';
import { format } from 'date-fns';
import { useAuth } from '../hooks/useAuth';
import { useRecoilState,SetRecoilState,useSetRecoilState,useRecoilValue } from 'recoil';
import { hotelAtomName } from '../atoms/atom'

export const OrderReceiver: React.FC = () => {

  const atomValue = useRecoilValue(hotelAtomName);
  //console.log(atomValue)
  
  const { user } = useAuth();
  const { orders, loading, error, markAsCompleted } = usePendingOrders(atomValue);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleMarkAsCompleted = async (orderId: string) => {
    try {
      await markAsCompleted(orderId);
      setSuccessMessage('Order marked as completed');
    } catch (err) {
      console.error('Error completing order:', err);
    }
  };

  const handleExport = async () => {
    try {
      const [year, month] = selectedMonth.split('-');
      await exportOrders(new Date(parseInt(year), parseInt(month) - 1),orders);
      setSuccessMessage('Orders exported successfully');
    } catch (err) {
      console.error('Error exporting orders:', err);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading orders...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Pending Orders</Typography>
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
      
      <Grid container spacing={3}>
        {orders.length === 0 ? (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography align="center" color="textSecondary">
                  No pending orders
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Card>
                <CardContent>
                  <div className="flex justify-between items-center mb-3">
                    <Typography variant="h6">
                      Order #{order.id.slice(-4)}
                    </Typography>
                    <Chip
                      icon={order.status === 'pending' ? <AccessTime /> : <Check />}
                      label={order.status.toUpperCase()}
                      color={order.status === 'pending' ? 'warning' : 'success'}
                    />
                  </div>
                  
                  <Typography color="textSecondary" gutterBottom>
                    {formatDate(order.timestamp)}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Room: {order.room_no || 'N/A'}
                  </Typography>

                  <div className="space-y-2 my-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <Typography>
                          {item.nameEn} ({item.nameTh}) x {item.quantity}
                        </Typography>
                        <Typography>
                          {formatCurrency(item.price * item.quantity)}
                        </Typography>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between items-center">
                      <Typography variant="subtitle1">Total:</Typography>
                      <Typography variant="h6">
                        {formatCurrency(order.total)}
                      </Typography>
                    </div>
                  </div>

                  {order.status === 'pending' && !(user?.role == 'order_taker') && (
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      startIcon={<Check />}
                      onClick={() => handleMarkAsCompleted(order.id)}
                      sx={{ mt: 2 }}
                    >
                      Mark as Completed
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
