import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Alert } from "@mui/material";

function RecuperarContra({ onSuccess }) {
  const [telefono, setTelefono] = useState("+52");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: telefono }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Código enviado por WhatsApp.");
        setVariant("success");
        onSuccess(data.tokenw); // Pasa el token al siguiente paso
      } else {
        setMessage(data.error || "Error al enviar el código.");
        setVariant("error");
      }
    } catch (error) {
      setMessage("Error en el servidor.");
      setVariant("error");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">Verificar Número de Teléfono</Typography>
        <Box component="form" noValidate onSubmit={handleSendCode} sx={{ mt: 3 }}>
          <TextField fullWidth label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Enviar Código</Button>
        </Box>
        {message && <Alert severity={variant} sx={{ mt: 2 }}>{message}</Alert>}
      </Box>
    </Container>
  );
}

export default RecuperarContra;
