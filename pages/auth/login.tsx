import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router'; 
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/Auth.module.scss'; 

const Login = () => {
  const router = useRouter(); // Initialize useRouter
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with', { username, password });

    const res = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),  
    });

    if (res.ok) {
      setMessage('Login successful!');
      // Navigate to home page after successful login
      router.push('/'); // Redirect to the home page
    } else {
      const errorData = await res.json();
      setMessage(errorData.error || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login - Travato Cars</title>
      </Head>

      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Welcome Back to Travato Cars</h2>
          <Image
            src="/images/poppy.jpg" 
            alt="Login"
            width={500}
            height={300}
          />
        </section>

        <section className={styles.loginForm}>
          <h3>Login</h3>
          {message && <p className={styles.message}>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Username:</label>  
              <input 
                type="text"  
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Password:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
