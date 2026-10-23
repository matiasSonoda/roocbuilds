import styles from './Banner.module.css';
import { Link } from 'react-router-dom';
export function Banner() {
    return (
        <section className={styles['banner-container']}>
            <div className={styles['banner-info']}>
                <h1 className={styles['banner-title']}>Share your builds</h1>
                <span className={styles['banner-description']}>Discover and share Ragnarok Origin Classic builds with the community.</span>
                <nav className={styles['banner-nav']}>
                    <Link className={styles['nav-a']} to="/">Explore Builds</Link>
                    <Link className={styles['nav-a']} to="/create">Publish Your Builds</Link>
                </nav>
            </div>
            <div className={styles['banner-ad']}>
            </div>
        </section>
    );
}