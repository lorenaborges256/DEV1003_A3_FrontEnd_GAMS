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
    if (Object.keys(newErrors).length > 0) return;

    // Call the backend
    setLoading(true);
    setServerError('');
    try {
      const response = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      });
      // Store the JWT token so all future API calls are authenticated
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
      const userRole = response.data.user.role; // Get the role from the response

      if (userRole === 'admin') {
        navigate('/admin'); // Redirect admins to /admin
      } else {
        navigate('/dashboard'); // Redirect regular users to /dashboard
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      setServerError(message);
    } finally {
      setLoading(false);
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
