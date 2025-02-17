import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Alert, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Notis = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const departamento = queryParams.get('departamento');

  const [notificaciones, setNotificaciones] = useState([]);
  const [error, setError] = useState('');
    const [token, setToken] = useState("");  // Estado para el token
    const [rol, setRoles] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      const dep = localStorage.getItem("departamento");
      const storedToken = localStorage.getItem("token");
      const roles = localStorage.getItem("rol");
      
      if (dep) {
        setDepartamento(dep);
      }
      if (roles){
        setRoles(roles);
      }
      if (storedToken) {
        setToken(storedToken); // Guardamos el token
      } else {
        // Si no hay token, redirige al login
        console.log("No hay token, redirigiendo...");
        navigate("/");
      }
    }, [navigate]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        if (!departamento) {
          throw new Error('Departamento no especificado.');
        }

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
  }, [departamento]);

  const handleMarkAsSeen = async () => {
    if (notificaciones.length === 0) return;

    const ids = notificaciones.map((n) => n._id);

    try {
      const response = await fetch('https://api-condominios-noti.onrender.com/api/notificaciones/eliminar', {
        method: 'DELETE',
        headers: {
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
  );
};

export default Notis;

