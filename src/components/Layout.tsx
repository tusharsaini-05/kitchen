import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Switch,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Restaurant,
  Receipt,
  People,
  RestaurantMenu,
  Logout,
  ListAlt,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../hooks/useAuth';
import logo1 from  '../data/logo1.png';


const drawerWidth = 240;

const Layout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard', roles: ['admin', 'order_taker', 'order_receiver'] },
    { text: 'Orders', icon: <Receipt />, path: '/orders', roles: ['admin', 'order_taker'] },
    { text: 'Order Receiver', icon: <Restaurant />, path: '/order-receiver', roles: ['admin', 'order_receiver','order_taker'] },
    { text: 'Order Management', icon: <ListAlt />, path: '/order-management', roles: ['admin'] },
    { text: 'Menu Management', icon: <RestaurantMenu />, path: '/menu', roles: ['admin'] },
    { text: 'User Management', icon: <People />, path: '/users', roles: ['admin'] },
    { text: 'Hotel Management', icon: <People />, path: '/hotel-management', roles: ['admin'] },
].filter(item => item.roles.includes(user?.role || ''));
 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const drawer = (
    <div>
     <Toolbar>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <img 
      src={logo1} // Replace with your logo's path
      alt="Logo" 
      style={{ width: '40px', height: '40px', marginRight: '8px' }} 
    />
    <Typography variant="h6" noWrap component="div">
      Nexus Overall
    </Typography>
  </Box>
</Toolbar>

      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: '8px',
              marginBottom: '8px',
              '&.Mui-selected': {
                backgroundColor: '#004d73',
                color: '#ffffff',
                '& .MuiListItemIcon-root': {
                  color: '#ffffff',
                },
              },
              '&:hover': {
                backgroundColor: '#004d73',
                color: '#ffffff',
                '& .MuiListItemIcon-root': {
                  color: '#ffffff',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: darkMode ? '#212121' : '#004d73',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              Kitchen Order Management System
            </Typography>
            <IconButton
              color="inherit"
              onClick={toggleDarkMode}
              sx={{ mr: 2 }}
            >
              {darkMode ? '🌙' : '🌞'}
            </IconButton>
            <Typography
              variant="body1"
              sx={{
                mr: 2,
                color: 'rgba(255, 255, 255, 0.8)',
                fontStyle: 'italic',
              }}
            >
              {user?.name}
            </Typography>
            <Button
              color="inherit"
              onClick={handleSignOut}
              startIcon={<Logout />}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: darkMode ? '#333' : '#f4f4f4',
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: darkMode ? '#333' : '#f4f4f4',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: darkMode ? '#121212' : '#eef7f9',
            minHeight: '100vh',
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
