import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationButton from './NotificationButton';

  function Dashboard() {
    const [departamento, setDepartamento] = useState("");
    const [token, setToken] = useState("");  // Estado para el token
    const [rol, setRoles] = useState("");

    useEffect(() => {
      console.log("Token en localStorage:", localStorage.getItem("token"));
      console.log("Departamento en localStorage:", localStorage.getItem("departamento"));
      console.log("Rol en localStorage:", localStorage.getItem("rol"));
  }, []);

  return (
    <>
      <Navbar expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <DropdownButton variant="button" id="navbar-dropdown" title="Menú">
              <Dropdown.Item as={Link} to="/Dueño/gestionInquilino">
                Dueño
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/Admin/registroUsuario">
                Administrador
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/Administracion/gestionVivienda">
                Administración
              </Dropdown.Item>
            </DropdownButton>
          </Nav>

          <Nav className="ms-auto">
            {departamento && <NotificationButton departamento={departamento} />}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-4">
        <h1>Bienvenido al Dashboard de Administrador</h1>
      </div>
    </>
  );
}

export default Dashboard;
