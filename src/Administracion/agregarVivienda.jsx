import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function agregarVivienda() {
    return (

<Navbar expand="lg" bg="light" variant="light">
      <Dropdown>
        <DropdownButton variant="link" id="navbar-dropdown" title="Dropdown">
          <Dropdown.Item as={Link} to="/Dashboard">Inicio</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Administracion/gestionVivienda">Gestion de vivienda</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Administracion/agregarVivienda">Agregar Viviendas</Dropdown.Item>
        </DropdownButton>
      </Dropdown>
    </Navbar>
    );
}
export default agregarVivienda;