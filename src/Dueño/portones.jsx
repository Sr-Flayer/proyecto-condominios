import React, {useEffect, useState} from 'react';
import { Navbar, Dropdown, DropdownButton, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tablita.css';
import NotificationButton from '../NotificationButton';


function Portones() {

  const [departamento, setDepartamento] = useState("");
  const [token, setToken] = useState("");  // Estado para el token
  const [rol, setRoles] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const dep = localStorage.getItem("departamento");
    const storedToken = localStorage.getItem("token");
    const roles = localStorage.getItem("rol");
    
    if (dep) {
      setDepartamento(dep);
    }
    if (roles){
      setRoles(roles);
    }
    if (storedToken) {
      setToken(storedToken); // Guardamos el token
    } else {
      // Si no hay token, redirige al login
      console.log("No hay token, redirigiendo...");
      navigate("/");
    }
  }, [navigate]);

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
      <p>Portón No. 1</p>
      <p>Estado: <span className="status-open">Abierto</span></p>
    </div>
    <div className="actions">
      <i className="fas fa-lock-open"></i>
    </div>
  </div>

  {/* Fila 2 */}
  <div className="table-row">
    <div className="icon-container">
      <i className="fas fa-image"></i>
    </div>
    <div className="details">
      <p>Portón No. 2</p>
      <p>Estado: <span className="status-closed">Cerrado</span></p>
    </div>
    <div className="actions">
      <i className="fas fa-lock"></i>
    </div>
  </div>

  {/* Fila 3 */}
  <div className="table-row">
    <div className="icon-container">
      <i className="fas fa-image"></i>
    </div>
    <div className="details">
      <p>Portón No. 3</p>
      <p>Estado: <span className="status-closed">Cerrado</span></p>
    </div>
    <div className="actions">
      <i className="fas fa-lock"></i>
    </div>
  </div>
</div>
</div>
</div>
  );
}

export default Portones;
