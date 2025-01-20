import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  return (
    <Navbar expand="lg" bg="light" variant="light">
          <Dropdown>
            <DropdownButton variant="link" id="navbar-dropdown" title="Dropdown">
              <Dropdown.Item as={Link} to="/Dueño/gestionInquilino">Dueño</Dropdown.Item>
              <Dropdown.Item as={Link} to="/Admin/registroUsuario">Administrador</Dropdown.Item>
              <Dropdown.Item as={Link} to="/Administracion/gestionVivienda">Administración</Dropdown.Item>
              <Dropdown.Item as={Link} to="/Inquilino/adeudo">Inquilino</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
    </Navbar>
  );
}

export default Dashboard;
