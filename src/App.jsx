import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ telefono, correo, departamento }),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardar el departamento en el almacenamiento local o en el estado de la aplicación
        localStorage.setItem("departamento", data.departamento);
        navigate("/Dashboard");
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
            <label htmlFor="correo">Correo:</label>
            <input
              type="email"
              id="correo"
              className="input-field"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
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
    </div>
  );
};

export default Login;