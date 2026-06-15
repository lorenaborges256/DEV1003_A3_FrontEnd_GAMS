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
    </main>
  );
}

export default NotificationsPage;
