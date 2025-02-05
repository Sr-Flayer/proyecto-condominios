import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import NotificationButton from '../NotificationButton';


function Multas() {

  const [departamento, setDepartamento] = useState('');
  useEffect(() => {
          const dep = localStorage.getItem("departamento");
          if (dep) {
            setDepartamento(dep);
          }
        }, []);
  const [departamentoError, setDepartamentoError] = useState(false);

  const [motivoMulta, setMotivoMulta] = useState('');
  const [motivoMultaError, setMotivoMultaError] = useState(false);

  const [multa, setMulta] = useState('');
  const [multaError, setMultaError] = useState(false);

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');

  const [lastDepartamento, setLastDepartamento] = useState('');

  const navigate = useNavigate();

  // Validaciones
  const validateDepartamento = () => {
    if (!departamento.trim()) {
      setDepartamentoError(true);
    } else {
      setDepartamentoError(false);
    }
  };

  const validateMotivoMulta = () => {
    if (!motivoMulta.trim()) {
      setMotivoMultaError(true);
    } else {
      setMotivoMultaError(false);
    }
  };

  const validateMulta = () => {
    const isValid = parseFloat(multa) > 0;
    setMultaError(!isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateDepartamento();
    validateMotivoMulta();
    validateMulta();

    if (departamentoError || motivoMultaError || multaError) {
      setMessage('Por favor, corrija los errores antes de enviar.');
      setVariant('error');
      return;
    }

    try {
      const response = await fetch('https://api-condominios-noti.onrender.com/api/insertar_multas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departamento, motivoMulta, multa }),
      });

      if (response.ok) {
        setMessage('Multa registrada exitosamente.');
        setVariant('success');
        setLastDepartamento(departamento);
        setDepartamento('');
        setMotivoMulta('');
        setMulta('');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Error al registrar la multa.');
        setVariant('error');
      }
    } catch (error) {
      console.error('Error al enviar la multa:', error);
      setMessage('Error al registrar la multa.');
      setVariant('error');
    }
  };

  const handleViewNotifications = () => {
    navigate(`/notificaciones/${lastDepartamento}`);
  };

  return (

    <div>
    <Navbar expand="lg" bg="light" variant="light">
      <Dropdown>
        <DropdownButton variant="link" id="navbar-dropdown" title="Dropdown">
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
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Registrar Multa
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="departamento"
                label="Departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                onBlur={validateDepartamento}
                error={departamentoError}
                helperText={departamentoError && 'El campo es obligatorio.'}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="motivoMulta"
                label="Motivo de la Multa"
                value={motivoMulta}
                onChange={(e) => setMotivoMulta(e.target.value)}
                onBlur={validateMotivoMulta}
                error={motivoMultaError}
                helperText={motivoMultaError && 'El campo es obligatorio.'}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="multa"
                label="Monto de la Multa"
                type="number"
                value={multa}
                onChange={(e) => setMulta(e.target.value)}
                onBlur={validateMulta}
                error={multaError}
                helperText={multaError && 'El monto debe ser mayor a 0.'}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
        </Box>
        {message && (
          <Alert severity={variant} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
        {lastDepartamento && (
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleViewNotifications}
          >
            Ver Notificaciones para {lastDepartamento}
          </Button>
        )}
      </Box>
    </Container>
    </div>
  );
}

export default Multas;