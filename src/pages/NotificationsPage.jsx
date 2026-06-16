import { useState, useEffect } from 'react';
import api from '../services/api';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get('/notifications')
      .then((response) => {
        setNotifications(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load notifications.');
        setLoading(false);
      });
  }, []);

  const handleMarkAsRead = (id) => {
    api.put(`/notifications/${id}/read`).then(() => {
      setNotifications((previous) =>
        previous.map((notification) =>
          notification._id === id ? { ...notification, status: 'read' } : notification
        )
      );
    });
  };

  const handleDelete = (id) => {
    api.delete(`/notifications/${id}`).then(() => {
      setNotifications((previous) => previous.filter((notification) => notification._id !== id));
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (notifications.length === 0) {
    return (
      <main>
        <h1>Notifications</h1>
        <p>You have no notifications.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Notifications</h1>
      <p>Notifications ({notifications.length})</p>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            <p>{notification.message}</p>
            <span>{notification.status}</span>
            {notification.status === 'unread' && (
              <button type="button" onClick={() => handleMarkAsRead(notification._id)}>
                Mark as read
              </button>
            )}
            <button type="button" onClick={() => handleDelete(notification._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default NotificationsPage;
