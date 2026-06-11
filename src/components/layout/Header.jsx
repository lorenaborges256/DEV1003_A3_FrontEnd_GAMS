import NavLinks from './NavLinks';
import styles from './Header.module.scss';

function Header({ onToggleMenu }) {
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
        <span className={styles.icon}>🔔</span>
        <span className={styles.icon}>👤</span>
      </div>
    </header>
  );
}

export default Header;
