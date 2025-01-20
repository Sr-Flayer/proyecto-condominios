import React from 'react';
import { Navbar, Nav, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  return (
    <Navbar expand="lg" bg="light" variant="light">
          <Dropdown>
            <DropdownButton variant="link" id="navbar-dropdown" title="Dropdown">
              <Dropdown.Item href="#">Dueño</Dropdown.Item>
              <Dropdown.Item href="#">Administrador</Dropdown.Item>
              <Dropdown.Item href="#">Administración</Dropdown.Item>
              <Dropdown.Item href="#">Inquilino</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
    </Navbar>
  );
}

export default Dashboard;
