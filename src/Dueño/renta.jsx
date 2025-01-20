import React from 'react';
import { Navbar, Nav, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Dropdown>
        <DropdownButton variant="link" id="navbar-dropdown" title="Dropdown">
          <Dropdown.Item as={Link} to="/Dashboard">Inicio</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Dueño/gestionInquilino">Gestión Inquilino</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Dueño/portones">Portones</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Dueño/renta">Renta</Dropdown.Item>
        </DropdownButton>
      </Dropdown>
    </Navbar>
  );
}

export default Dashboard;
