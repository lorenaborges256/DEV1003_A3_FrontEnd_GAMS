import { NavLink } from 'react-router-dom';
import styles from './NavLinks.module.scss';

function NavLinks({ onClick }) {
// Get the role from localStorage
  const role = localStorage.getItem('userRole');

  // Define links for regular users
  const userLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/items', label: 'Items', icon: '⚔️' },
    { path: '/contracts', label: 'Contracts', icon: '📜' },
    { path: '/watchlist', label: 'Watchlist', icon: '👁️' },
  ];

  // Define links for admins
  const adminLinks = [
    { path: '/admin', label: 'Admin Panel', icon: '🛡️' },
    { path: '/admin/items', label: 'Manage Items', icon: '📦' },
    { path: '/admin/contracts', label: 'Manage Contracts', icon: '📝' },
    { path: '/admin/users', label: 'Manage Users', icon: '👥' },
  ];

  // Choose which set of links to show
  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <ul className={styles.navLinks}>
      {links.map((link) => (
        <li key={link.path} className={styles.navItem}>
          <NavLink
            to={link.path}
            onClick={onClick}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <span className={styles.icon}>{link.icon}</span>
            <span className={styles.label}>{link.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
