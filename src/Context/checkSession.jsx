import { useNavigate } from "react-router-dom";

const checkSession = async (navigate) => {
  const permanentToken = localStorage.getItem("permanentToken");

  if (permanentToken) {
    try {
      const response = await fetch("https://api-condominios-noti.onrender.com/api/verify-permanent", {
        method: "POST",
        headers: { "Authorization": `Bearer ${permanentToken}` },
      });

      const data = await response.json();
 
      if (data.valid) {
        // Si el token es válido, redirigir al dashboard
        const rol = localStorage.getItem("rol");
        if (rol === "admin") navigate("/Dashboard");
        else if (rol === "usuario") navigate("/dashboard_usuario");
        else if (rol === "dueno") navigate("/dashboard_dueno");
      } else {
        // Si el token es inválido, limpiar localStorage y redirigir a login
        localStorage.removeItem("permanentToken");
        localStorage.removeItem("token");
        localStorage.removeItem("departamento");
        localStorage.removeItem("rol");
        navigate("/");
      }
    } catch (error) {
      console.error("Error al verificar sesión:", error);
      navigate("/");
    }
  }
};

export default checkSession;
