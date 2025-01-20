import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const Login = () => {
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
        <form>
          <div className="form-group">
            <label htmlFor="phone">No. teléfono:</label>
            <input type="text" id="phone" className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" className="input-field" />
          </div>

          <Link to="Dashboard">
          <button type="submit" className="submit-button">
            Iniciar sesión
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
