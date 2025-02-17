import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  Container, Box, Grid, Typography, TextField, Button, Alert, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import NotificationButton from '../NotificationButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistroUsuario() {  
      useEffect(() => {
        const dep = localStorage.getItem("departamento");
        if (dep) {
          setDepartamento(dep);
        }
      }, []);
  
  const [nombre, setNombre] = useState('');
  const [nombreError, setNombreError] = useState(false);

  const [apellido, setApellido] = useState('');
  const [apellidoError, setApellidoError] = useState(false);

  const [telefono, setTelefono] = useState('');
  const [telefonoError, setTelefonoError] = useState(false);

  const [departamento, setDepartamento] = useState('');
  const [departamentoError, setDepartamentoError] = useState(false);

  const [correo, setCorreo] = useState('');
  const [correoError, setCorreoError] = useState(false);

  const [rol, setRol] = useState('');
  const [RolError, setRolError] = useState(false);

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');

  

  // Validaciones
  const validateNombre = () => {
    setNombreError(!nombre.trim());
  };

  const validateApellido = () => {
    setApellidoError(!apellido.trim());
  };

  const validateTelefono = () => {
    setTelefonoError(!telefono.trim());
  };

  const validateDepartamento = () => {
    setDepartamentoError(!departamento.trim());
  };

  const validateCorreo = () => {
    setCorreoError(!correo.trim());
  };

  const validateRol = () => {
    setRolError(!rol.trim())
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateNombre();
    validateApellido();
    validateTelefono();
    validateDepartamento();
    validateCorreo();
    validateRol();

    // Verificar si hay errores después de las validaciones
    if (nombreError || apellidoError || telefonoError || departamentoError || correoError || RolError) {
      setMessage('Por favor, corrija los errores antes de enviar.');
      setVariant('error');
      return;
    }

    try {
      const response = await fetch('https://api-condominios-noti.onrender.com/api/insertar_usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, telefono, departamento, correo, rol }),
      });

      if (response.ok) {
        setMessage('Usuario registrado exitosamente.');
        setVariant('success');
        setNombre('');
        setApellido('');
        setTelefono('');
        setDepartamento('');
        setCorreo('');
        setRol('');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Error al registrar el usuario.');
        setVariant('error');
      }
    } catch (error) {
      console.error('Error al enviar el usuario:', error);
      setMessage('Error al registrar el usuario.');
      setVariant('error');
    }
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
          Registrar Usuario
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
                id="nombre"
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onBlur={validateNombre}
                error={nombreError}
                helperText={nombreError && 'El campo es obligatorio.'}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="apellido"
                label="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                onBlur={validateApellido}
                error={apellidoError}
                helperText={apellidoError && 'El campo es obligatorio.'}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="telefono"
                label="No. Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                onBlur={validateTelefono}
                error={telefonoError}
                helperText={telefonoError && 'El campo es obligatorio.'}
                required
              />
            </Grid>
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
                id="correo"
                label="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                onBlur={validateCorreo}
                error={correoError}
                helperText={correoError && 'El campo es obligatorio.'}
                required
              />
            </Grid>

            <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="rol-label">Rol</InputLabel>
          <Select
            labelId="rol-label"
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <MenuItem value="usuario">Usuario</MenuItem>
            <MenuItem value="admin">Admininstrador</MenuItem>
          </Select>
        </FormControl>
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
      </Box>
    </Container>
    </div>
  );
}

export default RegistroUsuario;