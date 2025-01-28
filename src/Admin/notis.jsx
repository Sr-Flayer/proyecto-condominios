import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

const Notis = () => {
  const { departamento } = useParams();
  const [notificaciones, setNotificaciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/notificaciones/${departamento}`);
        if (!response.ok) {
          throw new Error('Error al obtener notificaciones');
        }
        const data = await response.json();
        setNotificaciones(data);
      } catch (error) {
        console.error('Error al verificar notificaciones:', error);
        setError('Error al verificar notificaciones');
      }
    };

    fetchNotificaciones(); // Fetch notifications on component mount

    const intervalId = setInterval(fetchNotificaciones, 5000); // Fetch notifications every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [departamento]);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Notificaciones
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <List>
          {notificaciones.map((notificacion) => (
            <ListItem key={notificacion._id}>
              <ListItemText primary={notificacion.mensaje} secondary={new Date(notificacion.fecha).toLocaleString()} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Notis;