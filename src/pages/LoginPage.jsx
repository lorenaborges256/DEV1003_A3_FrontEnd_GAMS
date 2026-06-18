import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import Input from '../components/forms/Input';
import styles from './LoginPage.module.scss';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // TODO: call auth API
    }
  }

  const footer = (
    <>
      Don&apos;t have an account? <Link to="/register">Create Account</Link>
    </>
  );

  return (
    <AuthCard title="Welcome Back" footerContent={footer}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password}
          required
        />
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </AuthCard>
  );
}

export default LoginPage;
