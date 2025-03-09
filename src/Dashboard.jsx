import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationButton from './NotificationButton';
import checkSession from "./Context/checkSession.jsx";


function Dashboard() {
    const navigate = useNavigate(); 
    const [departamento, setDepartamento] = useState("");
    const [rol, setRoles] = useState("");

    useEffect(() => {
    checkSession(navigate); // Verificar sesión al cargar la página
  
        const token = localStorage.getItem("token");
        const storedDepartamento = localStorage.getItem("departamento");
        const storedRol = localStorage.getItem("rol");

        if (!token) {
            console.log("No hay token, redirigiendo a login...");
            navigate("/");  // Redirigir al login si no hay token
        } else {
            setDepartamento(storedDepartamento || "");
            setRoles(storedRol || "");
        }
    }, [navigate]);

    return (
        <>
            <Navbar expand="lg" bg="light" variant="light">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <DropdownButton variant="button" id="navbar-dropdown" title="Menú">
                            <Dropdown.Item as={Link} to="/Admin/registroUsuario">Administrador</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/Administracion/gestionVivienda">Administración</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/All_users/cambiar_contra">Cambiar Contraseña</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/All_users/recuperarContra">Recuperar Contraseña</Dropdown.Item>

                        </DropdownButton>
                    </Nav>

                    <Nav className="ms-auto">
                        {departamento && <NotificationButton departamento={departamento} />}
                        <button className="btn btn-danger ms-3" onClick={() => {
                            localStorage.clear();  // Cerrar sesión
                            navigate("/");
                        }}>
                            Cerrar sesión
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="container mt-4">
                <h1>Bienvenido al Dashboard de Administrador</h1>
            </div>
        </>
    );
}

export default Dashboard;
