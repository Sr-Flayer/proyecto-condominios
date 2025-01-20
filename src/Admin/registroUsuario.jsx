import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './formulario.css';

function registroUsuario() {
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
            <label>Nombre:</label>
            <input type="text" placeholder="Ingrese el nombre" />
            <label> Apellidos:</label>
            <input type="text" placeholder="Ingrese el apellido" />
            <label> No. teléfono:</label>
            <input type="text" placeholder="Ingrese No. de Teléfono" />
            <label> Rol:</label>
            <input type="text" placeholder="Ingrese el rol" />
            <label> Correo:</label>
            <input type="text" placeholder="Ingrese correo Electrónico" />
            
            <button type="submit">Agregar</button>
          </form>
        </div>
      </div>
    </div>
    );
}
export default registroUsuario;