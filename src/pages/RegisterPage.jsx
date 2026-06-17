import { Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import RegisterForm from '../components/auth/RegisterForm';

function RegisterPage() {
  const footerLink = (
    <>
      Already have an account?{' '}
      <Link to="/login">Login</Link>
    </>
  );

  return (
    <AuthCard 
      title="Create Account" 
      footerContent={footerLink}
    >
      <RegisterForm />
    </AuthCard>
  );
}

export default RegisterPage;