import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../forms/Input';
import Button from '../forms/Button';
import api from '../../services/api';
import styles from './RegisterForm.module.scss';

function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Call the backend
    setLoading(true);
    setServerError('');
    try {
      const response = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      // Store the JWT token returned on registration
      localStorage.setItem('token', response.data.token);
      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      // The backend will return a message like "Email already registered"
      const message =
        error.response?.data?.message || 'Registration failed. Please try again.';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <Input
        label="Name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        error={errors.name}
        required
      />
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
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        error={errors.confirmPassword}
        required
      />
      {serverError && <p className={styles.serverError}>{serverError}</p>}
      <Button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
}

export default RegisterForm;