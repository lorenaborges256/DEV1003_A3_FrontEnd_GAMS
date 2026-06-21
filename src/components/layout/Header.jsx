import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import api from '../../services/api';
import styles from './Header.module.scss';

function Header({ onToggleMenu }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const dropdownRef = useRef(null);

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/notifications');
        const data = response.data;
        setNotifications(data);
        const unread = data.filter(n => n.status === 'unread').length;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Failed to fetch notifications for header', error);
      }
    };

    fetchNotifications();
  }, []);

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

      {/* Navigation - Only visible on Tablet */}
      <nav className={styles.tabletNav}>
        <NavLinks />
      </nav>

      <div className={styles.right}>
        {/* Notifications Bell Container */}
        <div className={styles.notificationWrapper} ref={dropdownRef}>
          <button 
            className={styles.bellButton} 
            onClick={toggleDropdown}
            aria-label="Notifications"
          >
            <span className={styles.icon}>🔔</span>
            {unreadCount > 0 && (
              <span className={styles.badge}>{unreadCount}</span>
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <h4>Notifications</h4>
              </div>
              
              <div className={styles.dropdownList}>
                {notifications.length === 0 ? (
                  <p className={styles.empty}>No notifications</p>
                ) : (
                  notifications.slice(0, 5).map(notification => (
                    <div 
                      key={notification._id} 
                      className={`${styles.dropdownItem} ${notification.status === 'unread' ? styles.unread : ''}`}
                    >
                      <p>{notification.message}</p>
                    </div>
                  ))
                )}
              </div>
              
              <div className={styles.dropdownFooter}>
                <Link to="/notifications" onClick={() => setIsDropdownOpen(false)}>
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <span className={styles.icon}>👤</span>
      </div>
    </header>
  );
}

export default Header;
