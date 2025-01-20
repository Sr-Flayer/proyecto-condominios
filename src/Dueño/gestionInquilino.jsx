import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import './tablita.css';

function gestionInquilino() {
  return (
    <div>
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

<div className="table-container">
<div className="table">
  {[1, 2, 3].map((property, index) => (
    <div className="table-row" key={index}>

      <div className="details">
        <p>Nombre del inquilino</p>
        <p>Propiedad No. {property}</p>
      </div>
      <div className="multas">
        <p>Multas: 0</p>
      </div>
      <div className="action">
        <button className="edit-button">Actualizar</button>
      </div>
    </div>
  ))}
</div>
<button className="add-button">+</button>
</div>
</div>
  );
}

export default gestionInquilino;
