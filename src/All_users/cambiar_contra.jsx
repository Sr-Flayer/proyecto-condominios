import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Grid, Typography, TextField, Button, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import NotificationButton from '../NotificationButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cambiar_contra() {
  const [telefono, setTelefono] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');
  const [token, setToken] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api-condominios-noti.onrender.com/api/cambiar-contra', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telefono, departamento, oldPassword, newPassword }),
      });

      if (response.ok) {
        setMessage('Contraseña actualizada exitosamente.');
        setVariant('success');
        setOpenModal(true); // Abrir el modal de confirmación
      } else {
        const data = await response.json();
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
        body: JSON.stringify({ userId: telefono }),
      });
      localStorage.removeItem("permanentToken");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión en todos los dispositivos", error);
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
          {departamento && <NotificationButton departamento={departamento} />}
        </Nav>
      </Navbar>

      <Container component="main" maxWidth="sm">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Cambiar Contraseña
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="password" label="Contraseña Actual" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="password" label="Nueva Contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Cambiar Contraseña
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
