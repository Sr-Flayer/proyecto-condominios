 import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import Ginquilino from './Dueño/gestionInquilino';
import Portones from './Dueño/portones';
import Renta from './Dueño/renta';
import Multas from './Admin/multas';
import Notis from './Admin/notis';
import Rusuario from './Admin/registroUsuario';
import Avivienda from './Administracion/agregarVivienda';
import Gvivienda from './Administracion/gestionVivienda';
import Adeudo from './Inquilino/adeudo';
import PortonesM from './Inquilino/portonesM';
import Dashboardu from './dashboard_usuario';
import Cambiar_contra from './All_users/cambiar_contra';
import RecuperarContra from './All_users/recuperarContra';
import './index.css';
import Dashboard_dueno from './dashboard_dueno';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/dashboard_usuario" element={<Dashboardu />} />
        <Route path="/dashboard_dueno" element={<Dashboard_dueno />} />
        <Route path="/Dueño/gestionInquilino" element={<Ginquilino />} />
        <Route path="/Dueño/portones" element={<Portones />} />
        <Route path="/Dueño/renta" element={<Renta />} />
        <Route path="/Admin/multas" element={<Multas />} />
        <Route path="/Admin/notis" element={<Notis />} />
        <Route path="/Admin/registroUsuario" element={<Rusuario />} />
        <Route path="/Administracion/agregarVivienda" element={<Avivienda />} />
        <Route path="/Administracion/gestionVivienda" element={<Gvivienda />} />
        <Route path="/Inquilino/adeudo" element={<Adeudo />} />
        <Route path="/Inquilino/portonesM" element={<PortonesM/>} />
        <Route path="/notificaciones/:departamento" element={<Notis />} />
        <Route path="/All_users/cambiar_contra" element={<Cambiar_contra />} />
        <Route path="/All_users/recuperarContra" element={<RecuperarContra />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
