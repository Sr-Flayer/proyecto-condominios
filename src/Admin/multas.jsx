import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function multas() {
    return (

<Navbar expand="lg" bg="light" variant="light">
      <Dropdown>
        <DropdownButton variant="link" id="navbar-dropdown" title="Dropdown">
          <Dropdown.Item as={Link} to="/Dashboard">Inicio</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Admin/multas">Multas</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Admin/registroUsuario">Registrar Usuarios</Dropdown.Item>
        </DropdownButton>
      </Dropdown>
    </Navbar>
    );
}
export default multas;