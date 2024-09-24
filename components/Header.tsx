
import Link from 'next/link';
import styles from '../styles/Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Travato Cars</h1>
      <nav>
        <Link href="/browse-cars">Browse Cars</Link>
        <Link href="/car-meet">Car Meets</Link>
        <Link href="/auth/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
