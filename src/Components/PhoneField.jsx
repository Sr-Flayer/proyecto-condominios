import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneField = ({ telefono, setTelefono }) => {
  return (
    <div className="form-group">
      <label htmlFor="telefono">No. teléfono:</label>
      <PhoneInput
        country={"mx"} // País por defecto (México)
        value={telefono}
        onChange={setTelefono}
        inputStyle={{ width: '100%' }}
        enableSearch={true} // Permite buscar países por nombre o código
      />
    </div>
  );
};

export default PhoneField;
