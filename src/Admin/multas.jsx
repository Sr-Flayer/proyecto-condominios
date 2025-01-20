import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function multas() {
    return (
      <div>

<Navbar expand="lg" bg="light" variant="light">
      <Dropdown>
        <DropdownButton variant="link" id="navbar-dropdown" title="Dropdown">
          <Dropdown.Item as={Link} to="/Dashboard">Inicio</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Admin/multas">Multas</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Admin/registroUsuario">Registrar Usuarios</Dropdown.Item>
        </DropdownButton>
      </Dropdown>
    </Navbar>

<div className="container">
<div className="form-card">
  <h3>Nombre del inquilino</h3>
  <form>
    <label>Motivo de la multa:</label>
    <input type="text" placeholder="Ingrese la renta" />
    <label>Cantidad a pagar:</label>
    <input type="text" placeholder="Ingrese la cantidad" />
    <button type="submit">Agregar</button>
  </form>
</div>
</div>
</div>


    );
}
export default multas;