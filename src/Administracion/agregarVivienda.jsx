import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function agregarVivienda() {
    return (
      <div> 

<Navbar expand="lg" bg="light" variant="light">
      <Dropdown>
        <DropdownButton variant="link" id="navbar-dropdown" title="Dropdown">
          <Dropdown.Item as={Link} to="/Dashboard">Inicio</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Administracion/gestionVivienda">Gestion de vivienda</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Administracion/agregarVivienda">Agregar Viviendas</Dropdown.Item>
        </DropdownButton>
      </Dropdown>
    </Navbar>
    <div className="container">
    <div className="form-card">
      <h3>Agregar vivienda</h3>
      <form>
        <label>Tipo de vivienda:</label>
        <input type="text" placeholder="Ej. Departamento" />
        <label> Coto:</label>
        <input type="text" placeholder="Ingrese el nombre del coto" />
        <label> Portón:</label>
        <input type="text" placeholder="Ingrese No. del portón" />
        <label> Notas:</label>
        <input type="text" placeholder="Ej. Descarapelada" />
        <label> Renta mensual:</label>
        <input type="text" placeholder="Precio de la renta" />
        
        <button type="submit">Agregar</button>
      </form>
    </div>
  </div>
</div>
    );
}
export default agregarVivienda;