import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import NotificationButton from "../NotificationButton";
import Modal from "../Components/Modal";

function Multas() {
  const [departamento, setDepartamento] = useState("");
    const [token, setToken] = useState("");  // Estado para el token
    const [rol, setRoles] = useState("");
      
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

  const [motivoMulta, setMotivoMulta] = useState("");
  const [multa, setMulta] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const validateInput = () => {
    return departamento.trim() && motivoMulta.trim() && parseFloat(multa) > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      setModalMessage("Por favor, corrija los errores antes de enviar.");
      setIsSuccess(false);
      setModalOpen(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://api-condominios-noti.onrender.com/api/insertar_multas",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ departamento, motivoMulta, multa }),
        }
      );

      setLoading(false);

      if (response.ok) {
        setModalMessage("Multa registrada exitosamente.");
        setIsSuccess(true);
        setDepartamento("");
        setMotivoMulta("");
        setMulta("");
      } else {
        const data = await response.json();
        setModalMessage(data.message || "Error al registrar la multa.");
        setIsSuccess(false);
      }
    } catch (error) {
      setLoading(false);
      setModalMessage("Error de conexión al registrar la multa.");
      setIsSuccess(false);
    }

    setModalOpen(true);
  };

  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light">
        <Dropdown>
          <DropdownButton variant="link" id="navbar-dropdown" title="Menú">
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
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Registrar Multa
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Departamento"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Motivo de la Multa"
                  value={motivoMulta}
                  onChange={(e) => setMotivoMulta(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Monto de la Multa"
                  type="number"
                  value={multa}
                  onChange={(e) => setMulta(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Registrar"}
            </Button>
          </Box>
        </Box>
      </Container>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)} message={modalMessage} isSuccess={isSuccess} />
    </div>
  );
}

export default Multas;
