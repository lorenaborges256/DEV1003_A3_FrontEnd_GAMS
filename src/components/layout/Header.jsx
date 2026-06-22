import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';
import api from '../../services/api';
import styles from './Header.module.scss';

function Header({ onToggleMenu }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || 'User';

  // Consolidated Logout Function
  const handleLogout = () => {
    localStorage.clear(); // Clears token, role, and name for a clean exit
    setIsProfileOpen(false);
    navigate('/login'); // Redirect to login page
  };

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/notifications');
        setNotifications(response.data);
        setUnreadCount(response.data.filter((n) => n.status === 'unread').length);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };
    fetchNotifications();
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.hamburger} onClick={onToggleMenu}>
          ☰
        </button>
        <div className={styles.brand}>
          <span className={styles.appName}>GAMS</span>
          <span className={styles.guildName}>Guild Name</span>
        </div>
      </div>

      <nav className={styles.tabletNav}>
        <NavLinks />
      </nav>

      <div className={styles.right}>
        {/* 1. BELL ICON & NOTIFICATION MENU */}
        <div className={styles.dropdownWrapper} ref={notifRef}>
          <button
            className={styles.iconButton}
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false);
            }}
          >
            <span className={styles.icon}>🔔</span>
            {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
          </button>

          {isNotifOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <h4>Notifications</h4>
              </div>
              <div className={styles.dropdownList}>
                {notifications.length === 0 ? (
                  <p className={styles.empty}>No notifications</p>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div
                      key={n._id}
                      className={`${styles.dropdownItem} ${n.status === 'unread' ? styles.unread : ''}`}
                    >
                      <p>{n.message}</p>
                    </div>
                  ))
                )}
              </div>
              <div className={styles.dropdownFooter}>
                <Link to="/notifications" onClick={() => setIsNotifOpen(false)}>
                  View all
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 2. PROFILE ICON & LOGOUT MENU */}
        <div className={styles.dropdownWrapper} ref={profileRef}>
          <button
            className={styles.iconButton}
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
            }}
          >
            <span className={styles.icon}>👤</span>
          </button>

          {isProfileOpen && (
            <div className={`${styles.dropdown} ${styles.profileDropdown}`}>
              {/* Display user name - non-clickable header */}
              <div className={styles.dropdownHeader}>
                <h4 className={styles.userNameDisplay}>{userName}</h4>
              </div>

              <div className={styles.dropdownList}>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
