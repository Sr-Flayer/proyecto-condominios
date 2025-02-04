import React from 'react';
import { Navbar, Dropdown, DropdownButton, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NotificationButton from '../NotificationButton';

function CustomNavbar({ userDepartment }) {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">MiApp</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Dropdown className="me-auto">
            <DropdownButton variant="link" id="navbar-dropdown" title="Opciones">
              <Dropdown.Item as={Link} to="/Dueño/gestionInquilino">Dueño</Dropdown.Item>
              <Dropdown.Item as={Link} to="/Admin/registroUsuario">Administrador</Dropdown.Item>
              <Dropdown.Item as={Link} to="/Administracion/gestionVivienda">Administración</Dropdown.Item>
              <Dropdown.Item as={Link} to="/Inquilino/adeudo">Inquilino</Dropdown.Item>
            </DropdownButton>
          </Dropdown>

          <NotificationButton department={userDepartment} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
