import React from "react";
import { CSSTransition } from "react-transition-group";
import "../Styles/Modal.css"; // Asegúrate de agregar estilos para la animación

const Modal = ({ show, onClose, message, isSuccess }) => {
  return (
    <CSSTransition in={show} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>{isSuccess ? "Éxito" : "Error"}</h2>
          <p>{message}</p>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
