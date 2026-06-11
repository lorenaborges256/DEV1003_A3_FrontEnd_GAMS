import NavLinks from './NavLinks';
import styles from './Sidebar.module.scss';

function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.top}>
        <h2>GAMS</h2>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
      </div>
      <nav className={styles.nav}>
        <NavLinks onClick={onClose} />
      </nav>
    </aside>
  );
}

export default Sidebar;
