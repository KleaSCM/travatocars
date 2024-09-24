
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Travato Cars</title>
        <meta name="description" content="Discover cars and meet car enthusiasts" />
      </Head>

      <Header />

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

      <Footer />
    </div>
  );
}
