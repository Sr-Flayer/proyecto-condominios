import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationButton from '../NotificationButton';

function agregarVivienda() {
  const [departamento, setDepartamento] = useState("");
    const [token, setToken] = useState("");  // Estado para el token
    const [rol, setRoles] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      
      const storedToken = localStorage.getItem("token");
      
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
          <Dropdown.Item as={Link} to="/Administracion/gestionVivienda">Gestion de vivienda</Dropdown.Item>
          <Dropdown.Item as={Link} to="/Administracion/agregarVivienda">Agregar Viviendas</Dropdown.Item>
        </DropdownButton>
      </Dropdown>
      <Nav className="ms-auto">
            {departamento && <NotificationButton departamento={departamento} />}
          </Nav>
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