import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { hotelAtomName } from "../atoms/atom";
import { debounce } from "lodash";
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
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  Restaurant,
  Receipt,
  People,
  RestaurantMenu,
  Logout,
  ListAlt,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../hooks/useAuth";
import logo1 from "../data/logo1.png";
import { Hotel } from "../types";
import { hotelService } from "../services/hotel/hotelService";

const drawerWidth = 240;

// Custom hook to update the Recoil atom
const useUpdateHotelAtom = () => {
  const setMyAtom = useSetRecoilState(hotelAtomName);
  return (value: string) => {
    setMyAtom(value);
  };
};

const Layout: React.FC = () => {
  const [hotelss, setHotels] = useState<Hotel[] | null>();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedHotel, setSelectedHotel] = useState("all");

  const updateHotelAtom = useUpdateHotelAtom(); // Use the custom hook

  const fetchHotels = async () => {
    const hotels = await hotelService.getHotels();
    setHotels(hotels);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard", roles: ["admin"] },
    { text: "Orders", icon: <Receipt />, path: "/orders", roles: ["admin", "order_taker"] },
    { text: "Order Receiver", icon: <Restaurant />, path: "/order-receiver", roles: ["admin", "order_receiver", "order_taker"] },
    { text: "Order Management", icon: <ListAlt />, path: "/order-management", roles: ["admin"] },
    { text: "Menu Management", icon: <RestaurantMenu />, path: "/menu", roles: ["admin"] },
    { text: "User Management", icon: <People />, path: "/users", roles: ["admin"] },
    { text: "Hotel Management", icon: <People />, path: "/hotel-management", roles: ["admin"] },
  ].filter((item) => item.roles.includes(user?.role || ""));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleSearch = debounce((term) => {
    console.log("Heading towards :", term); // Simulate API call
  }, 500);
  const handleSignOut = async () => {
    await signOut();
    handleSearch('login')
    navigate("/login");
  };

  const drawer = (
    <div>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo1 || "/placeholder.svg"}
            alt="Logo"
            style={{ width: "40px", height: "40px", marginRight: "8px" }}
          />
          <Typography variant="h6" noWrap>
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
              borderRadius: "8px",
              marginBottom: "8px",
              "&.Mui-selected": {
                backgroundColor: "#004d73",
                color: "#ffffff",
                "& .MuiListItemIcon-root": { color: "#ffffff" },
              },
              "&:hover": {
                backgroundColor: "#004d73",
                color: "#ffffff",
                "& .MuiListItemIcon-root": { color: "#ffffff" },
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: darkMode ? "#212121" : "#004d73",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#ffffff",
              }}
            >
              Kitchen Order Management System
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setDarkMode(!darkMode)}
              sx={{
                mr: 2,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              {darkMode ? "🌞" : "🌙"}
            </IconButton>
            {user?.role === "admin" ? (
              <FormControl sx={{ minWidth: 160, mr: 2 }}>
              <Select
                value={selectedHotel}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedHotel(value);
                  updateHotelAtom(value); // Updates the Recoil atom
                }}
                displayEmpty
                sx={{
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  "& .MuiSelect-icon": { color: "white" },
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: darkMode ? "#424242" : "#fff",
                      color: darkMode ? "white" : "black",
                      borderRadius: "8px",
                      "& .MuiMenuItem-root": {
                        fontSize: "0.9rem",
                        padding: "8px 16px",
                        "&:hover": {
                          backgroundColor: darkMode ? "#616161" : "#f5f5f5",
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="all">
                  <Typography fontWeight="bold" fontSize="0.9rem">
                    All Hotels
                  </Typography>
                </MenuItem>
                {hotelss?.map((hotel) => (
                  <MenuItem key={hotel.id} value={hotel.hotel_name}>
                    <Typography fontWeight="bold" fontSize="0.9rem">
                      {hotel.hotel_name}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            ) : (
              <Typography
                variant="body1"
                sx={{
                  mr: 2,
                  color: "rgba(255, 255, 255, 0.8)",
                  fontStyle: "italic",
                }}
              >
                {user?.hotel}
              </Typography>
            )}
            <Button
              color="inherit"
              onClick={handleSignOut}
              startIcon={<Logout />}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: darkMode ? "#333" : "#f4f4f4",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: darkMode ? "#333" : "#f4f4f4",
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
            backgroundColor: darkMode ? "#121212" : "#eef7f9",
            minHeight: "100vh",
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
