import React from 'react';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link
import 'bootstrap/dist/css/bootstrap.min.css';
import './Formulario.css';

function renta() {
  return (
    <div>
      {/* Navbar */}
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

      
      <div className="container">
        <div className="form-card">
          <h3>Nombre del inquilino</h3>
          <form>
            <label>Renta del departamento:</label>
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

export default renta;
