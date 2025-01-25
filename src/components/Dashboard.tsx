 // import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
// } from '@mui/material';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from 'recharts';
// import { format } from 'date-fns';
// import { DashboardStats } from '../types';
// import { statsService } from '../services/stats/statsService';
// import LoadingSpinner from './common/LoadingSpinner';
// import { ErrorMessage } from './common/ErrorMessage';
// import { formatCurrency } from '../utils/date/dateHelpers';
// import { useRecoilValue } from 'recoil';
// import { hotelAtomName } from '../atoms/atom';

// export const Dashboard: React.FC = () => {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
//   const hotelId = useRecoilValue(hotelAtomName);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const [year, month] = selectedMonth.split('-');
//         const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
//         const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59); // Full last day

//         const data = await statsService.getStats(startDate, endDate, hotelId);
//         setStats(data);
//         setError(null);
//       } catch (err: any) {
//         setError(err.message || 'Failed to load dashboard statistics');
//         console.error('Error loading stats:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [selectedMonth, hotelId]); // Dependencies ensure re-fetch on change of selectedMonth or hotelId

//   if (loading) return <LoadingSpinner />;
//   if (error) return <ErrorMessage message={error} />;
//   if (!stats) return null;

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Dashboard
//         </Typography>
//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel>Month</InputLabel>
//           <Select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             label="Month"
//           >
//             {Array.from({ length: 12 }, (_, i) => {
//               const date = new Date(2025, i, 1);
//               return (
//                 <MenuItem key={i} value={format(date, 'yyyy-MM')}>
//                   {format(date, 'MMMM yyyy')}
//                 </MenuItem>
//               );
//             })}
//           </Select>
//         </FormControl>
//       </Box>

//       <Grid container spacing={4}>
//         <Grid item xs={12} md={4}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Total Orders
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {stats.totalOrders}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Total Revenue
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {formatCurrency(stats.totalRevenue)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Average Order Value
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {formatCurrency(stats.averageOrderValue)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Orders by Category
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart
//                   data={stats.ordersByCategory}
//                   margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="category" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#1976d2" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Daily Revenue
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart
//                   data={stats.revenueByDay}
//                   margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };


import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { format } from 'date-fns';
import { DashboardStats } from '../types';
import { statsService } from '../services/stats/statsService';
import LoadingSpinner from './common/LoadingSpinner';
import { ErrorMessage } from './common/ErrorMessage';
import { formatCurrency } from '../utils/date/dateHelpers';
import { useRecoilValue } from 'recoil';
import { hotelAtomName } from '../atoms/atom';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const hotelId = useRecoilValue(hotelAtomName);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [year, month] = selectedMonth.split('-');
        const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59); // Full last day

        const data = await statsService.getStats(startDate, endDate, hotelId);
        setStats(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard statistics');
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [selectedMonth, hotelId]); // Dependencies ensure re-fetch on change of selectedMonth or hotelId

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!stats) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
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
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Orders
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Revenue
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {formatCurrency(stats.totalRevenue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Average Order Value
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {formatCurrency(stats.averageOrderValue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Orders by Category
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={stats.ordersByCategory}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily Revenue
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={stats.revenueByDay}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

