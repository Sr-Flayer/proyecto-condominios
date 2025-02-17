import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import './tablita.css';
import NotificationButton from '../NotificationButton';


function gestionInquilino() {

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
