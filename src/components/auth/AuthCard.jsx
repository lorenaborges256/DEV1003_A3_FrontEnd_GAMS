import styles from './AuthCard.module.scss';
import gamsLogo from '../../assets/images/login/gams-logo.svg';

/**
 * AuthCard - Shared split-screen layout shell for auth pages.
 *
 * @param {React.ReactNode} children     - The form content rendered in the right panel.
 * @param {string}          title        - The heading displayed above the form (e.g. "Welcome Back").
 * @param {React.ReactNode} footerContent - The footer link row (e.g. "Don't have an account? Create Account").
 */
function AuthCard({ children, title, footerContent }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* ── Left panel: branding ── */}
        <aside className={styles.branding} aria-label="Application branding">
          <img src={gamsLogo} alt="GAMS logo" className={styles.logo} />
          <p className={styles.appName}>GAMS</p>
          <p className={styles.tagline}>
            Guild Availability Management System
        </p>
        </aside>

        {/* ── Right panel: form area ── */}
        <section className={styles.formArea}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {children}
          {footerContent && <p className={styles.footer}>{footerContent}</p>}
        </section>
      </div>
    </div>
  );
}

export default AuthCard;
