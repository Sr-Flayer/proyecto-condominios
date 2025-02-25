import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Modal from "./Components/Modal.jsx";
import checkSession from "./Context/checkSession.jsx";



const Login = () => {
  const [telefono, setTelefono] = useState("");
  const [contra, setContra] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    checkSession(navigate); // Verificar sesión al cargar la página
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowModal(true);
  };

    const handleLogin = async (remember) => {
      setShowModal(false);
      setRememberDevice(remember); // Guardar la elección del usuario

    try {//https://api-condominios-noti.onrender.com/api/login http://localhost:4000/api/login
      const response = await fetch('https://api-condominios-noti.onrender.com/api/login', {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ telefono, contra, departamento, rememberDevice: remember }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos recibidos:", data); // Verifica qué datos devuelve la API

        // Guardar datos en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("departamento", data.departamento);
        localStorage.setItem("rol", data.rol);
        console.log("Token almacenado:", data.token);
        console.log("Rol almacenado:", data.rol);

        if (data.permanentToken) {
          localStorage.setItem("permanentToken", data.permanentToken);
        }

        // Redirigir según el rol
        navigate(data.rol === "admin" ? "/Dashboard" : data.rol === "usuario" ? "/dashboard_usuario" : "/dashboard_dueno");

      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="icon-wrapper">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon-svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 18.75a8.25 8.25 0 0115 0v.75H4.5v-.75z"
              />
            </svg>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="telefono">No. teléfono:</label>
            <input
              type="text"
              id="telefono"
              className="input-field"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contra">Contraseña:</label>
            <input
              type="password"
              id="contra"
              className="input-field"
              value={contra}
              onChange={(e) => setContra(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="departamento">Departamento:</label>
            <input
              type="number"
              id="departamento"
              className="input-field"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Iniciar sesión
          </button>
        </form>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        message="¿Quieres recordar este dispositivo?"
        isSuccess={true}
      >
        <button onClick={() => handleLogin(true)}>Sí</button>
        <button onClick={() => handleLogin(false)}>No</button>
      </Modal>
    </div>
  );
};

export default Login;