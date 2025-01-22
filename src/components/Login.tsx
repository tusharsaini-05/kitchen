import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';

import logo1 from '../data/logo1.png';
// Define LoginFormProps interface
interface LoginFormProps {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

// Separate LoginForm Component
const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <TextField
      margin="normal"
      required
      fullWidth
      label="Email Address"
      autoComplete="email"
      autoFocus
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      label="Password"
      type="password"
      autoComplete="current-password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Sign In
    </Button>
  </form>
);

// Main Login Component
export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <img src={logo1} alt="Logo" style={{ width: '40px', height: '40px', marginRight: '8px' }} />
            <Typography component="h1" variant="h5">
              Nexus Overall
            </Typography>
          </Box>
          <Typography component="h2" variant="h6" sx={{ mb: 3 }}>
            Kitchen Order Management System
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        </Paper>
      </Box>
    </Container>
  );
};
