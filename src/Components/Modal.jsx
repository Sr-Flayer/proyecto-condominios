import React from "react";
import { CSSTransition } from "react-transition-group";
import "../Styles/Modal.css"; 

const Modal = ({ show, onClose, message, isSuccess, children }) => {
  return (
    <CSSTransition in={show} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>{isSuccess ? "Confirmación" : "Error"}</h2>
          <p>{message}</p>
          <div className="modal-actions">
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
