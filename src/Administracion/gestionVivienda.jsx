import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Dropdown, DropdownButton, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tabla.css';
import NotificationButton from '../NotificationButton';

function GestionVivienda() {

  const [departamento, setDepartamento] = useState("");
      
          useEffect(() => {
            const dep = localStorage.getItem("departamento");
            if (dep) {
              setDepartamento(dep);
            }
          }, []);

  return (
    <div>
      {/* Navbar con Dropdown */}
      <Navbar expand="lg" bg="light" variant="light">
        <Dropdown>
          <DropdownButton variant="link" id="navbar-dropdown" title="Dropdown">
            <Dropdown.Item as={Link} to="/Dashboard">Inicio</Dropdown.Item>
            <Dropdown.Item as={Link} to="/Administracion/gestionVivienda">Gestión de vivienda</Dropdown.Item>
            <Dropdown.Item as={Link} to="/Administracion/agregarVivienda">Agregar Viviendas</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
        <Nav className="ms-auto">
            {departamento && <NotificationButton departamento={departamento} />}
          </Nav>
      </Navbar>

      {/* Contenido principal */}
      <main className="main-content">
        <h1>Gestión de viviendas</h1>
        <div className="table-container">
          {/* Fila 1 */}
          <div className="table-row">
            <div className="icon-container">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="details">
              <p>Torre No. 1</p>
              <p>Coto: fulano</p>
            </div>
            <div className="porton">Portón: 1</div>
            <div className="actions">
              <Link to="/Administracion/editarVivienda/TorreNo1" className="edit-button">
                <i className="fas fa-edit"></i> Editar
              </Link>
            </div>
          </div>

          {/* Fila 2 */}
          <div className="table-row">
            <div className="icon-container">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="details">
              <p>Departamento No. 1</p>
              <p>Coto: tijunica</p>
            </div>
            <div className="porton">Portón: 10</div>
            <div className="actions">
              <Link to="/Administracion/editarVivienda/DepartamentoNo1" className="edit-button">
                <i className="fas fa-edit"></i> Editar
              </Link>
            </div>
          </div>

          {/* Fila 3 */}
          <div className="table-row">
            <div className="icon-container">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="details">
              <p>Propiedad No. 1</p>
              <p>Coto: 5 de mayo</p>
            </div>
            <div className="porton">Portón: 4</div>
            <div className="actions">
              <Link to="/Administracion/editarVivienda/PropiedadNo1" className="edit-button">
                <i className="fas fa-edit"></i> Editar
              </Link>
            </div>
          </div>

          {/* Botón para agregar */}
          <button className="add-button">+</button>
        </div>
      </main>
    </div>
  );
}

export default GestionVivienda;
