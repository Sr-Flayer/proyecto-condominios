import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationButton from './NotificationButton';

function Dashboard_dueno() {
  const [departamento, setDepartamento] = useState("");
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

  return (
    <>
      <Navbar expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <DropdownButton variant="button" id="navbar-dropdown" title="Menú">
                <Dropdown.Item as={Link} to="/dashboard_dueno">
                Inicio
                </Dropdown.Item>
              <Dropdown.Item as={Link} to="/Dueño/gestionInquilino">
                Gestión Inquilino
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/Dueño/portones">
                Portones
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/Dueño/renta">
                Renta
              </Dropdown.Item>
            </DropdownButton>
          </Nav>

          <Nav className="ms-auto">
            {departamento && <NotificationButton departamento={departamento} />}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-4">
        <h1>Bienvenido al Dashboard de Dueño</h1>
        {/* Aquí puedes usar el token o mostrar algún mensaje adicional */}
      </div>
    </>
  );
}

export default Dashboard_dueno;
