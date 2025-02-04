import { useState, useEffect } from 'react';
import axios from 'axios';

export function useNotifications(departamento) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!departamento) return; // Evita errores si no hay departamento

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/notificaciones/${departamento}`);
        setNotifications(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      }
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 5000);

    return () => clearInterval(intervalId);
  }, [departamento]);

  return { notifications };
}
