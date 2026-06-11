// 1. Import the styles object (it can be named anything, but 'styles' is standard)
import styles from './LoginPage.module.scss';

function LoginPage() {
  return (
    // 2. Use styles.className instead of a string
    <div className={styles.loginWrapper}>
      <div className={styles.card}>
        <h1>GAMS Login</h1>
        <p>Welcome back, Guild Member.</p>
      </div>
    </div>
  );
}

export default LoginPage;
