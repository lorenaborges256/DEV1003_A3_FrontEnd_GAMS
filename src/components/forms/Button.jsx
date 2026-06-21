import styles from './Button.module.scss';

function Button({ children, type = 'button', onClick, disabled = false, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export default Button;