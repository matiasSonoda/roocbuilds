import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles['header-container']}>
      <h1 className={styles['header-title']}>Fansite of Ragnarok Origin Classic Builds</h1>
      <nav className={styles['header-nav']}>
        <Link className={styles['header-link']} to="/">Explore Builds</Link>
        <Link className={styles['header-link']} to="/create">Publish Your Builds</Link>
      </nav>
    </header>
  );
}