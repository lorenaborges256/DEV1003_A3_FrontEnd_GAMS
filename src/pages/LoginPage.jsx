import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import api from '../services/api';
import styles from './LoginPage.module.scss';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Client-side validation
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

      // 1. Store the JWT token so all future API calls are authenticated
      localStorage.setItem('token', response.data.token);
      
      // 2. Store the user role for Sidebar/Navigation control
      localStorage.setItem('userRole', response.data.user.role);
      
      // 3. Store the user name for the Header Profile dropdown
      localStorage.setItem('userName', response.data.user.name); // <--- ADDED THIS LINE

      const userRole = response.data.user.role; 
        
      // 4. Redirect based on role
      if (userRole === 'admin') {
        navigate('/admin'); // Redirect admins to /admin
      } else {
        navigate('/dashboard'); // Redirect regular users to /dashboard
      }
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed. Please try again.';
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
      <form onSubmit={handleSubmit} noValidate>
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
        {serverError && <p className={styles.serverError}>{serverError}</p>}
        <Button type="submit" disabled={loading} className={styles.loginButton}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </AuthCard>
  );
}

export default LoginPage;