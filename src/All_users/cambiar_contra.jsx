import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import NotificationButton from '../NotificationButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cambiar_contra() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');
  const [token, setToken] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      setVariant('error');
      return;
    }

    try {
      const response = await fetch('https://api-condominios-noti.onrender.com/api/cambiar-contra', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Se eliminó la coma y ACCESS_TOKEN no declarado
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Contraseña actualizada exitosamente.');
        setVariant('success');
        setOpenModal(true); // Abrir el modal de confirmación
      } else {
        setMessage(data.message || 'Error al actualizar la contraseña.');
        setVariant('error');
      }
    } catch (error) {
      setMessage('Error en el servidor.');
      setVariant('error');
    }
  };

  const handleLogoutAll = async () => {
    try {
      await fetch('https://api-condominios-noti.onrender.com/api/logout-all-devices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: token }), // Se cambió telefono a token
      });
      localStorage.removeItem('permanentToken');
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión en todos los dispositivos', error);
    }
  };

  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light">
        <Dropdown>
          <DropdownButton variant="link" id="navbar-dropdown" title="Menú">
            <Dropdown.Item as={Link} to="/Dashboard">Inicio</Dropdown.Item>
            <Dropdown.Item as={Link} to="/Admin/multas">Multas</Dropdown.Item>
            <Dropdown.Item as={Link} to="/Admin/registroUsuario">Registrar Usuarios</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
        <Nav className="ms-auto">
          {typeof departamento !== 'undefined' && <NotificationButton departamento={departamento} />}
        </Nav>
      </Navbar>

      <Container component="main" maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">Cambiar Contraseña</Typography>
          <Box component="form" noValidate onSubmit={handleChangePassword} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              type="password"
              label="Nueva Contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              fullWidth
              type="password"
              label="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{ mt: 2 }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Actualizar Contraseña
            </Button>
          </Box>
          {message && <Alert severity={variant} sx={{ mt: 2 }}>{message}</Alert>}
        </Box>
      </Container>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>¿Cerrar sesión en todos los dispositivos?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Has cambiado tu contraseña. ¿Quieres cerrar sesión en todos los dispositivos?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">No</Button>
          <Button onClick={handleLogoutAll} color="secondary">Sí</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Cambiar_contra;