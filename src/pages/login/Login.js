import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';

// styles
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Password:</span>
        <input 
          type="password" 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
      </label>
      <button className='btn' disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
      {error && <p className={styles.error}>{error}</p>}
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </form>
  );
}