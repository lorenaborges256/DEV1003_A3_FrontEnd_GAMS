import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './Layout.module.scss';

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={styles.layoutContainer}>
      {/* Pass state and close function to Sidebar */}
      <Sidebar isOpen={isMenuOpen} onClose={closeMenu} />

      <div className={styles.mainContent}>
        {/* Pass toggle function to Header */}
        <Header onToggleMenu={toggleMenu} />

        <main className={styles.pageBody}>
          <Outlet />
        </main>
      </div>

      {/* Overlay to close menu when clicking outside on mobile */}
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu} />}
    </div>
  );
}

export default Layout;
