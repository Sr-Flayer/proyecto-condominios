import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNotifications } from './hooks/useNotifications';
import { useNavigate } from 'react-router-dom';

function NotificationButton({ departamento }) {
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const { notifications } = useNotifications(departamento);
  const navigate = useNavigate();

  useEffect(() => {
    setHasNewNotifications(notifications.length > 0);
  }, [notifications]);

  const handleClick = () => {
    setHasNewNotifications(false);
    navigate(`/Admin/notis?departamento=${departamento}`);
  };

  return (
    <Button
      variant={hasNewNotifications ? 'danger' : 'secondary'}
      onClick={handleClick}
      style={{
        transition: 'background-color 0.3s ease',
        fontWeight: hasNewNotifications ? 'bold' : 'normal',
      }}
    >
      {hasNewNotifications ? '🔴 Nueva Notificación' : 'No hay notificaciones'}
    </Button>
  );
}

export default NotificationButton;
