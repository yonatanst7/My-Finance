import { useState } from 'react';

// styles
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password });
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
      <button className="btn">Login</button>
    </form>
  );
}