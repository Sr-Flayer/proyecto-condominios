import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Alert, Button } from '@mui/material';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import NotificationButton from "../NotificationButton";


const Notis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const departamento = queryParams.get('departamento');

  const [notificaciones, setNotificaciones] = useState([]);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem("token")); // Guardamos el token

  useEffect(() => {
    const fetchNotificaciones = async () => {
      if (!departamento) {
        setError('Departamento no especificado.');
        return;
      }

      if (!token) {
        console.log("No hay token, redirigiendo...");
        navigate("/"); // Redirigir al login si no hay token
        return;
      }

      try {
        const response = await fetch(`https://api-condominios-noti.onrender.com/api/notificaciones/${departamento}`);

        if (!response.ok) {
          throw new Error('Error al obtener notificaciones');
        }

        const data = await response.json();
        setNotificaciones(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al verificar notificaciones:', error);
        setError('Error al verificar notificaciones');
      }
    };

    fetchNotificaciones();
  }, [departamento, token, navigate]);

  const handleMarkAsSeen = async () => {
    if (notificaciones.length === 0 || !token) return;

    const ids = notificaciones.map((n) => n._id);

    try {
      const response = await fetch('https://api-condominios-noti.onrender.com/api/notificaciones/eliminar', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar las notificaciones');
      }

      console.log('Notificaciones eliminadas');
      setNotificaciones([]); // Vacía la lista en el frontend
    } catch (error) {
      console.error('Error al eliminar las notificaciones:', error);
      setError('Error al eliminar las notificaciones');
    }
  };

  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light">
        <Dropdown>
          <DropdownButton variant="button" id="navbar-dropdown" title="Menú">
            <Dropdown.Item as={Link} to="/Dashboard">Inicio</Dropdown.Item>
            <Dropdown.Item as={Link} to="/Admin/multas">Multa</Dropdown.Item>
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
            Notificaciones
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}

          <Button
            variant="contained"
            color="primary"
            onClick={handleMarkAsSeen}
            sx={{ mb: 2 }}
            disabled={notificaciones.length === 0}
          >
            Marcar como vistas
          </Button>

          <List>
            {notificaciones.map((notificacion) => (
              <ListItem key={notificacion._id}>
                <ListItemText
                  primary={notificacion.mensaje}
                  secondary={`Departamento: ${notificacion.departamento} - Multa: ${notificacion.multa}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </div>
  );
};

export default Notis;
