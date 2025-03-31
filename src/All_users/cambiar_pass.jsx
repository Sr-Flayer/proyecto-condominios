import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RecuperarContra = () => {
    const { token } = useParams(); // Obtiene el token de la URL
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    // Validar token al cargar la página
    useEffect(() => {
        const validarToken = async () => {
            try {
                const response = await axios.post("http://localhost:4000/api/api/validar_token_recuperacion", { token });
                if (response.status === 200) {
                    setIsValid(true);
                }
            } catch (error) {
                setMessage("Token inválido o expirado.");
            } finally {
                setLoading(false);
            }
        };

        validarToken();
    }, [token]);

    // Manejar el cambio de contraseña
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/cambiar_contra_recuperacion", {
                token,
                nuevaContraseña: newPassword,
            });

            if (response.status === 200) {
                setMessage("Contraseña cambiada exitosamente. Redirigiendo...");
                setTimeout(() => navigate("/"), 2000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Error al cambiar contraseña.");
        }
    };

    if (loading) return <p>Verificando token...</p>;

    return (
        <div className="container">
            <h2>Recuperar Contraseña</h2>
            {message && <p>{message}</p>}
            
            {isValid ? (
                <form onSubmit={handleSubmit}>
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Cambiar Contraseña</button>
                </form>
            ) : (
                <p>El token de recuperación es inválido o ha expirado.</p>
            )}
        </div>
    );
};

export default RecuperarContra;