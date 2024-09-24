
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Travato Cars</title>
        <meta name="description" content="Discover cars and meet car enthusiasts" />
      </Head>

      <header className={styles.header}>
        <h1>Travato Cars</h1>
        <nav>
          <a href="/browse-cars">Browse Cars</a>
          <a href="/car-meet">Car Meets</a>
          <a href="/auth/login">Login</a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Discover and Share Cars with Enthusiasts</h2>
          <Image
            src="/images/main-car.jpg"
            alt="Featured Car"
            width={500}
            height={300}
          />
        </section>

        <section className={styles.about}>
          <h3>About Travato Cars</h3>
          <p>
            Travato Cars is a place to meet car enthusiasts, share your rides, 
            and schedule car meets and cruises. Sign up to get started.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 Travato Cars | <a href="/privacy">Privacy Policy</a></p>
      </footer>
    </div>
  );
}
