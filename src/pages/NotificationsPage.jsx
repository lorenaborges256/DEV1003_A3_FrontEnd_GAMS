import { useState, useEffect } from 'react';
import api from '../services/api';
import styles from './NotificationsPage.module.scss';
import Button from '../components/forms/Button';

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
      <main className={styles.page}>
        <h1 className={styles.pageTitle}>Notifications</h1>
        <p className={styles.empty}>You have no notifications.</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>Notifications</h1>
      <p className={styles.count}>Notifications ({notifications.length})</p>
      <ul className={styles.list}>
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className={`${styles.item} ${notification.status === 'unread' ? styles.itemUnread : ''}`}
          >
            <div>
              <p className={styles.message}>{notification.message}</p>
              <span className={styles.status}>{notification.status}</span>
            </div>
            <div className={styles.actions}>
              {notification.status === 'unread' && (
                <Button type="button" onClick={() => handleMarkAsRead(notification._id)}>
                  Mark as read
                </Button>
              )}
              <Button type="button" onClick={() => handleDelete(notification._id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default NotificationsPage;
