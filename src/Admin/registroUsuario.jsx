import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Box, Grid, Typography, TextField, Button, Alert, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import NotificationButton from '../NotificationButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistroUsuario() {  
  
  const [nombre, setNombre] = useState('');
  const [nombreError, setNombreError] = useState(false);

  const [apellido, setApellido] = useState('');
  const [apellidoError, setApellidoError] = useState(false);

  const [telefono, setTelefono] = useState('');
  const [telefonoError, setTelefonoError] = useState(false);

  const [departamento, setDepartamento] = useState('');
  const [departamentoError, setDepartamentoError] = useState(false);

  const [contra, setContra] = useState('');
  const [contraError, setContraError] = useState(false);

  const [rol, setRol] = useState('');
  const [RolError, setRolError] = useState(false);

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');

  const [token, setToken] = useState("");  // Estado para el token
        const navigate = useNavigate();
      
        useEffect(() => {
          const dep = localStorage.getItem("departamento");
          const storedToken = localStorage.getItem("token");
          const roles = localStorage.getItem("rol");
          
          if (storedToken) {
            setToken(storedToken); // Guardamos el token
          } else {
            // Si no hay token, redirige al login
            console.log("No hay token, redirigiendo...");
            navigate("/");
          }
        }, [navigate]);
  

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

  const validateContra = () => {
    setContraError(!contra.trim());
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
    validateContra();
    validateRol();

    // Verificar si hay errores después de las validaciones
    if (nombreError || apellidoError || telefonoError || departamentoError || contraError || RolError) {
      setMessage('Por favor, corrija los errores antes de enviar.');
      setVariant('error');
      return;
    }

    try {
      const response = await fetch('https://api-condominios-noti.onrender.com/api/insertar_usuario', {
        method: 'POST',
        headers: {'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, telefono, departamento, contra, rol }),
      });

      if (response.ok) {
        setMessage('Usuario registrado exitosamente.');
        setVariant('success');
        setNombre('');
        setApellido('');
        setTelefono('');
        setDepartamento('');
        setContra('');
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
                id="contra"
                type= "password"
                label="Contraseña"
                value={contra}
                onChange={(e) => setContra(e.target.value)}
                onBlur={validateContra}
                error={contraError}
                helperText={contraError && 'El campo es obligatorio.'}
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
            <MenuItem value="dueno">Dueño</MenuItem>
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