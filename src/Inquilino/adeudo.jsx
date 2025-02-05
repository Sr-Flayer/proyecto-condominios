import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationButton from '../NotificationButton';
import './tablita.css';

function adeudo() {

  const [departamento, setDepartamento] = useState("");
  
      useEffect(() => {
        const dep = localStorage.getItem("departamento");
        if (dep) {
          setDepartamento(dep);
        }
      }, []);

    return (
      <div>
<Navbar expand="lg" bg="light" variant="light">
      <Dropdown>
        <DropdownButton variant="link" id="navbar-dropdown" title="Dropdown">
          <Dropdown.Item as={Link} to="/Dashboard">Inicio</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Inquilino/adeudo">Adeudos</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Inquilino/portonesM">Mis Portones</Dropdown.Item>
        </DropdownButton>
      </Dropdown>
      <Nav className="ms-auto">
            {departamento && <NotificationButton departamento={departamento} />}
          </Nav>
    </Navbar>

<div className="main-container">
<div className="table-container">
  {/* Fila 1 */}
  <div className="table-row">
    <div className="icon-container">
      <i className="fas fa-image"></i>
    </div>
    <div className="details">
      <p>Multa No. 1</p>
      <p>Estado: <span className="status-paid">Pagado</span></p>
      <p>Motivo: jadjhajfjasjdja sfj</p>
    </div>
    <div className="actions">
      <i className="fas fa-check-circle"></i>
    </div>
  </div>

  {/* Fila 2 */}
  <div className="table-row">
    <div className="icon-container">
      <i className="fas fa-image"></i>
    </div>
    <div className="details">
      <p>Renta No. 1</p>
      <p>Estado: <span className="status-unpaid">Por pagar</span></p>
      <p>Motivo: jadjhajfjasjdja sfj</p>
    </div>
    <div className="actions">
      <i className="fas fa-money-bill-wave"></i>
    </div>
  </div>

  {/* Fila 3 */}
  <div className="table-row">
    <div className="icon-container">
      <i className="fas fa-image"></i>
    </div>
    <div className="details">
      <p>Multa No. 2</p>
      <p>Estado: <span className="status-unpaid">Por pagar</span></p>
      <p>Motivo: jadjhajfjasjdja sfj</p>
    </div>
    <div className="actions">
      <i className="fas fa-money-bill-wave"></i>
    </div>
  </div>

  {/* Botón para agregar */}
  <button className="add-button">+</button>
</div>
</div>
</div>
    );
}
export default adeudo;